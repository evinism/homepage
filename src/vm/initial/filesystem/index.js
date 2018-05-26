
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
                stdout('An error occurred\\n');
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
                if(!args[0]) {
                  prompt();
                  return;
                }
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
                              stdout('command ' + args[0] + ' could not be found!\\n');
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
        content: cwd + '\\n'
      });
      syscalls.terminate(0);
    })
  `
}

const rm = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    if (!args[1]) {
      syscalls.write({
        fd: 1,
        content: 'usage: rm [file]\\n'
      });
      syscalls.terminate(1);
    } else {
      syscalls.rmFile(
        args[1],
        (err) => {
          if (err) {
            syscalls.write({
              fd: 1,
              content: 'An error occurred\\n',
            });
            syscalls.terminate(1);
          } else {
            syscalls.terminate(0);
          }
        }
      );
    }
  `
};

const cat = {
  _isFile: true,
  owner: 0,
  permissions: '755',
  content: `
    const target = args[1] || '/dev/keyboard';
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

const su = {
  _isFile: true,
  owner: 0,
  permissions: '644',
  suid: true,
  content: `
    const require = syscalls.fread('/lib/std', stdlib => {
      const { stdout, stdin } = eval(stdlib);
      const defaultShell = '/bin/sh';
      const checkPassword = success => {
        stdout('Password for root?');
        let passwd = '';
        const nextChar = () => {
          stdin((nextStr, eof) => {
            if(nextStr !== '\\n') {
              passwd = passwd + nextStr;
              nextChar();
            } else {
              continuation();
            }
          });
        }
        nextChar();
        const continuation = () => {
          // Todo: make this read from /etc/passwd
          if (passwd === 'catzz') {
            stdout('\\n');
            success();
          } else {
            stdout('\\nIncorrect password for root\\n');
            syscalls.terminate(0);
          }
        };
      };
      checkPassword(() => {
        syscalls.pathExists(
          defaultShell,
          exists => {
            if (exists) {
              syscalls.exec({
                path: defaultShell,
                args: [],
              }, () => syscalls.terminate(0));
            } else {
              syscalls.terminate(1);
            }
          }
        );
      });
    });
  `
}

const whoami = {
  _isFile: true,
  owner: 0,
  permissions: '644',
  content: `
    syscalls.getuname(null, (name, err) => {
      syscalls.write({
        fd: 1,
        content: name + '\\n'
      }, () => {
        syscalls.terminate(0);
      })
    });
  `
}

const about_me = {
  _isFile: true,
  owner: 1,
  permissions: '644',
  content: 
`| Hi! My name is Evin Sellin! I make computers do things.
| Most of my experience is in webdev, but I'm interested
| in many aspects of computing, such as machine learning,
| functional programming, theory of computation, and web
| performance!
|
| Feel free to email me at evinism@gmail.com or tweet at
| my handle, @evinism.`,
};

const about_this_interface = {
  _isFile: true,
  owner: 1,
  permissions: '644',
  content:
`| lol this thing isn't posix compliant but i sure wish it was.
| This interface was inspired by https://github.com/rhelmot/linjus
| To get an idea of what it consists of, try executing cat /bin/sh
| or cat /dev/keyboard`
}

const links = {
  _isFile: true,
  owner: 1,
  permissions: '644',
  content: 
`Github: https://github.com/evinism
Medium: https://medium.com/@evinsellin/
Twitter: https://twitter.com/evinism
LinkedIn: https://www.linkedin.com/in/evin-sellin-80143392/`
}


const passwd = {
  _isFile: true,
  owner: 0,
  permissions: '644',
  content:
`root:BLAH:0
web:BLAH:1`,
}

const fs = { name: 'root', owner: 0, perm: '644',
  children: {
    bin: { owner: 0, perm: '644', children: {
      sh,
      cat,
      ls,
      pwd,
      rm,
      su,
      whoami,
    }},
    dev: { owner: 0, perm: '644', children: {} },
    etc: { owner: 0, perm: '644', children: {
      passwd,
    }},
    lib: { owner: 0, perm: '644', children: {
      std,
    }},
    users: { owner: 0, perm: 644, children: {
      web: { owner: 1, perm: 644, children: {
        about_me,
        about_this_interface,
        links,
      }}
    }}
  }
};


export default fs;