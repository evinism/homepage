
/* shape is: 
  file:
  {
    _isFile: true
    owner:
    permissions:
    contents:
  }

  folder:
  {
    owner:
    permissions:
    children: {
      fileName: file
    }
  }
*/

const sh = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    const stdout = content => syscalls.write({
      content,
      fd: 1,
    });

    if (env.motd) {
      stdout('\\n === Message of the Day === \\n');
      stdout(env.motd);
    }

    const prompt = () => {
      let line = '';

      stdout('\\n$ ');

      const readPrint = () => {
        syscalls.fread(
          '/dev/keyboard',
          (content, eof) => {
            if (eof) {
              syscalls.terminate(0);
              return;
            }
            // TODO: Replace this with proper error codes for FS.
            if (content === '\\n') {
              stdout(content);
              const args = line.split(' ');
              syscalls.pathExists(
                args[0],
                exists => {
                  if (exists) {
                    syscalls.exec({
                      path: args[0],
                      args,
                    }, prompt);
                  } else {
                    stdout('command ' + args[0] + ' could not be found!');
                    prompt();
                  }
                }
              );
            } else if (content === '\\b') {
              if (line.length > 0) {
                line = line.substr(0, line.length - 1);
                stdout('\b');
              }
              readPrint();
            } else {
              stdout(content);
              line += content;
              readPrint();
            }
          }
        );
      };
      readPrint();
    }
    prompt();
  `,
};

const ls = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    syscalls.partyHard();
    const dir = args[1] || '/';
    syscalls.dread(dir, content => {
      syscalls.write({
        fd: 1,
        content,
      }, () => {
        syscalls.terminate(0);
      });
    });
  `
};

const cat = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    const target = args[1] || '/bin/sh';
    syscalls.fread(
      target,
      content => {
        syscalls.write({
          fd: 1,
          content,
        });
        syscalls.terminate(0);
      }
    );
  `,
};



const helloWorld = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: 'Hello, world!',
};

const fs = { name: 'root', owner: 0, perm: '644',
  children: {
    dev: { owner: 0, perm: '644', children: {} },
    bin: { owner: 0, perm: '644', children: {
      sh,
      cat,
      ls,
    }},
    users: { owner: 0, perm: 644, children: {
      root: { owner: 0, perm: 644, children: {
        helloWorld,
      }}
    }}
  }
};


export default fs;