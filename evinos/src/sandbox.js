/* Message types:
-- outgoing --
 ready
  data: null
 syscall
  data: {
    name: name of the syscall
    id: uuid //or incremented
    arg: the one singular arg
  }

-- incoming --
 script:
  data: {
    type: 'script',
    source: 'src'
    syscallNames: ['name1', 'name2', 'etc'],
    args: ['arg1', 'arg2', 'etc'],
    env: {envObj},
  }
 syscallResponse
  data: {
    id: uuid // or incremented
    args: [array, of, args],
  }
*/

const sandboxText = (iframeId) => `
<!DOCTYPE html>
<html>
  <head>
    <script>
      function runScript(source, syscalls, args, env){
        eval(source);
      };

      (function(){
        let scriptContents = null;
        let id = 30000;
        let syscalls;

        const syscallCBs = {};

        function makeSyscall(name, arg, cb){
          syscallCBs[id] = cb;
          post({type: 'syscall', name, arg, id });
          id++;
        }

        function handleSyscallResponse(id, args){
          try {
            syscallCBs[id] && syscallCBs[id](...args);
          } catch (e) {
            syscalls.write({ fd: 2, data: e.message + '\\n' });
            syscalls.terminate(1);
          }
        }

        function syscallsFromNames(syscallNames){
          return syscallNames.reduce((acc, name) => {
            acc[name] = (arg, cb) => makeSyscall(name, arg, cb)
            return acc;
          }, {});
        }

        function loadScript(source, syscallNames, args, env){
          syscalls = syscallsFromNames(syscallNames);
          try {
            runScript(source, syscalls, args, env);
          } catch (e) {
            syscalls.write({ fd: 2, data: e.message + '\\n' });
            syscalls.terminate(1);
          }
        }

        function receiveMessage(msg){
          switch(msg.type){
            case 'script':
              loadScript(msg.source, msg.syscallNames, msg.args, msg.env);
              break;
            case 'syscallResponse':
              handleSyscallResponse(msg.id, msg.args)
              break;
          }
        }

        function post(msg){
          window.parent.postMessage(JSON.stringify({ msg, iframeId: ${JSON.stringify(
            iframeId
          )}}), '*');
        }

        function listen(fn) {
          const recv = evt => fn(JSON.parse(evt.data));
          window.addEventListener("message", recv, false);
        }

        document.addEventListener('DOMContentLoaded', () => {
          listen(receiveMessage);
          post({ type: 'ready' });
        });
      })();

    </script>
  </head>
</html>
`;

let iframeId = 2000;

const dataUrl = (data) => "data:text/html;base64," + btoa(data);

class ProcessSandbox {
  constructor(source, syscalls, args, env) {
    this.source = source;
    this.syscalls = syscalls;
    this.args = args;
    this.env = env;

    // wow this is garbage.
    this.iframeId = iframeId;
    iframeId++;

    // initialization of the iframe
    const iframe = document.createElement("iframe");
    iframe.className = "process-sandbox";
    this.iframe = iframe;

    document.body.appendChild(iframe);
    iframe.sandbox = "allow-scripts";
    iframe.src = dataUrl(sandboxText(this.iframeId));
    this.listeners = [];
    this.listen(this.handleEvent.bind(this));
  }

  post(msg) {
    this.iframe.contentWindow.postMessage(JSON.stringify(msg), "*");
  }

  listen(fn) {
    const recv = (evt) => {
      if (evt.source === this.iframe.contentWindow) {
        const { msg } = JSON.parse(evt.data);
        fn(msg);
      }
    };
    window.addEventListener("message", recv, false);
    this.listeners.push(recv);
  }

  handleEvent(evt) {
    switch (evt.type) {
      case "ready":
        this.post({
          type: "script",
          source: this.source,
          syscallNames: Object.keys(this.syscalls),
          args: this.args,
          env: this.env,
        });
        break;
      case "syscall":
        this.syscalls[evt.name](evt.arg, (...args) => {
          this.post({
            type: "syscallResponse",
            id: evt.id,
            args,
          });
        });

        // special case for the terminate case... a little weird to put it here but whatevs.
        if (evt.name === "terminate") {
          this.cleanup();
        }
        break;
    }
  }

  cleanup() {
    document.body.removeChild(this.iframe);
    this.listeners.forEach((fn) => window.removeEventListener("message", fn));
    this.listeners = [];
  }
}

window.runInSandbox = function (source, syscalls, args, env) {
  new ProcessSandbox(source, syscalls, args, env);
};
