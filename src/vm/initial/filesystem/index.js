
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
    const write = content => syscalls.write({
      content,
      fd: 1,
    });

    const prompt = () => {
      let line = '';

      write('\\n$ ');

      const readPrint = () => {
        syscalls.fread(
          '/dev/keyboard',
          (content, eof) => {
            write(content);
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
            } else if (content === '\\b' && line.length > 0) {
              line = line.substr(0, -1);
              syscalls.write({
                content: '\b',
                fd: 1,
              });
              readPrint();
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
      '/bin/bash',
      content => {
        syscalls.write({
          fd: 1,
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