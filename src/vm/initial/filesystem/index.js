
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
    const require = syscalls.fread('/lib/std', stdlib => {
      const { stdout, stdin } = eval(stdlib);

      const builtins = {
        cd: (args, cb) => {
          syscalls.setcwd(
            args[1] || '/',
            (err) => {
              if (err) {
                stdout('An error occurred');
              }
              cb();
            }
          );
        },
      };

      if (env.motd) {
        stdout(env.motd);
      }

      const prompt = () => {
        let line = '';
  
        stdout('$ ');
  
        const readPrint = () => {
          stdin((content, eof) => {
              if (eof) {
                syscalls.terminate(0);
                return;
              }
              // TODO: Replace this with proper error codes for FS.
              if (content === '\\n') {
                stdout(content);
                const args = line.trim().split(' ');
                if (!builtins[args[0]]) {
                  syscalls.pathExists(
                    args[0],
                    exists => {
                      if (exists) {
                        syscalls.exec({
                          path: args[0],
                          args,
                        }, prompt);
                      } else {
                        syscalls.pathExists(
                          env.path + args[0],
                          exists => {
                            if (exists) {
                              syscalls.exec({
                                path: env.path + args[0],
                                args,
                              }, prompt);
                            } else {
                              stdout('command ' + args[0] + ' could not be found!');
                              prompt();
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  builtins[args[0]](args, prompt);
                }
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
    });
  `,
};

const ls = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    const dir = args[1] || '.';
    syscalls.dread(dir, content => {
      syscalls.write({
        fd: 1,
        content: content + '\\n',
      }, () => {
        syscalls.terminate(0);
      });
    });
  `
};

const pwd = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    // eww on this null thing
    syscalls.getcwd(null, (cwd, err) => {
      syscalls.write({
        fd: 1,
        content: cwd
      });
      syscalls.terminate(0);
    })
  `
}

const dicktown = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    syscalls.write({
      fd: 1,
      content: "d i c k t o w n that's right it's dicktown"
    });
    syscalls.terminate(0);
  `
}

const cat = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    const target = args[1] || '/bin/sh';
    const readNext = () => {
      syscalls.fread(
        target,
        (content, eof, err) => {
          syscalls.write({
            fd: 1,
            content,
          });
          if (err) {
            syscalls.write({
              fd: 1,
              content: 'An error occurred'
            })
          }
          if (eof) {
            syscalls.write({
              fd: 1,
              content: '\\n'
            })
            syscalls.terminate(0);
          } else {
            readNext();
          }
        }
      );
    };
    readNext();
  `,
};

const std = {
  _isFile: true,
  owner: 0,
  permissions: '644',
  content: `
    const stdout = content => syscalls.write({
      content,
      fd: 1,
    });

    const stdin = cb => syscalls.read(
      {fd: 0},
      cb
    );

    // eval export
    ({
      stdout,
      stdin,
    });
  `,
}



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
      pwd,
      dicktown,
    }},
    lib: { owner: 0, perm: '644', children: {
      std,
    }},
    users: { owner: 0, perm: 644, children: {
      root: { owner: 0, perm: 644, children: {
        helloWorld,
      }}
    }}
  }
};


export default fs;