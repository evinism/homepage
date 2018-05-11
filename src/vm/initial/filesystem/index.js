
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
    const prompt = () => {
      let line = '';

      syscalls.fwrite({
        content: '\\n$ ',
        path: '/dev/screen',
      });

      const readPrint = () => {
        syscalls.fread(
          '/dev/keyboard',
          (content, eof) => {
            syscalls.fwrite({
              content,
              path: '/dev/screen',
            });
            if (eof) {
              syscalls.terminate(0);
              return;
            }
            // TODO: Replace this with proper error codes for FS.
            if (content === '\\n') {
              syscalls.pathExists(
                line,
                exists => {
                  if (exists) {
                    syscalls.exec(line, prompt);
                  } else {
                    syscalls.fwrite({
                      content: 'That file could not be found!',
                      path: '/dev/screen',
                    });
                    prompt();
                  }
                }
              );
            } else {
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
    syscalls.dread('/', content => {
      syscalls.fwrite({
        path: '/dev/screen',
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
    syscalls.fread(
      '/bin/cat',
      content => {
        syscalls.fwrite({
          path: '/dev/screen',
          content,
        });
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