
/* shape is: 
  file:
  {
    _isFile: true
    owner:
    permissions: '75'// Two octets bc no groups.
    suid?: bool,
    contents:
  }

  folder:
  {
    owner:
    permissions: //
    children: {
      fileName: file
    }
  }
*/

const sh = {
  _isFile: true,
  owner: 0,
  permissions: '75',
  content: `
    syscalls.open({ path: '/lib/std' }, fd => { syscalls.read({fd}, (stdlib, err) => {
      const { stdout, stdin, shellExec } = eval(stdlib);

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
                shellExec(line, prompt);
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
    })});`,
};

const ls = {
  _isFile: true,
  owner: 0,
  permissions: '75',
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
  permissions: '75',
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
  permissions: '75',
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
  permissions: '75',
  content: `
    const targets = args.slice(1);
    let remainingFiles;
    if(targets.length > 0) {
      remainingFiles = targets.length;
      targets.forEach(openAndCat);
    } else {
      remainingFiles = 1;
      catfd(0);
    }

    function openAndCat(path){
      syscalls.open({path, perms: 'r' }, (fd, err) => {
        if (err) {
          syscalls.write({
            fd: 1,
            content: 'An error occurred in opening the file\\n'
          });
          syscalls.terminate(err);
          return;
        } else {
          catfd(fd);
        }
      });
    }

    function catfd(fd){
      const readNext = () => {
        syscalls.read(
          { fd },
          (content, eof, err) => {
            syscalls.write({
              fd: 1,
              content,
            });
            if (err) {
              syscalls.write({
                fd: 1,
                content: 'An error occurred in reading from the file'
              });
              syscalls.terminate(err);
              return;
            }
            if (eof) {
              finishAFile();
            } else {
              readNext();
            }
          }
        );
      };
      readNext();
    }

    function finishAFile(){
      remainingFiles--;
      if(remainingFiles === 0) {
        syscalls.terminate(0);
      }
    }
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

    // md5
    const md5Exp = {};
    !function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(md5Exp);

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

    const shellExec = (line, shellCb) => {
      const args = line.trim().split(' ');
      if(!args[0]) {
        shellCb();
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
              }, shellCb);
            } else {
              syscalls.pathExists(
                env.path + args[0],
                exists => {
                  if (exists) {
                    syscalls.exec({
                      path: env.path + args[0],
                      args,
                    }, shellCb);
                  } else {
                    stdout('command ' + args[0] + ' could not be found!\\n');
                    shellCb();
                  }
                }
              );
            }
          }
        );
      } else {
        builtins[args[0]](args, prompt);
      }
    }

    // eval export
    ({
      stdout,
      stdin,
      shellExec,
      md5: md5Exp.md5,
    });
  `,
}

const su = {
  _isFile: true,
  owner: 0,
  permissions: '75',
  suid: true,
  content: `
    const require = syscalls.fread('/lib/std', stdlib => {
      const { stdout, stdin, md5 } = eval(stdlib);
      const defaultShell = '/bin/sh';
      const checkPassword = success => {
        stdout('Password for root?');
        let typedPassword = '';
        const nextChar = () => {
          stdin((nextStr, eof) => {
            if(nextStr !== '\\n') {
              typedPassword = typedPassword + nextStr;
              nextChar();
            } else {
              confirmPWCorrect();
            }
          });
        }
        nextChar();
        const confirmPWCorrect = () => {
          syscalls.getudata(null, ({ password: hashed }) => {
            if (md5(typedPassword) === hashed) {
              stdout('\\n');
              success();
            } else {
              stdout('\\nIncorrect password for root\\n');
              syscalls.terminate(1);
            }
          });
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

const sudo = {
  _isFile: true, 
  owner: 0,
  permissions: '75',
  suid: true,
  content: `
  const require = syscalls.fread('/lib/std', stdlib => {
    const { stdout, stdin, md5, shellExec } = eval(stdlib);
    const defaultShell = '/bin/sh';
    const checkPassword = success => {
      stdout('Password for root?');
      let typedPassword = '';
      const nextChar = () => {
        stdin((nextStr, eof) => {
          if(nextStr !== '\\n') {
            typedPassword = typedPassword + nextStr;
            nextChar();
          } else {
            confirmPWCorrect();
          }
        });
      }
      nextChar();
      const confirmPWCorrect = () => {
        syscalls.getudata(null, ({ password: hashed }) => {
          if (md5(typedPassword) === hashed) {
            stdout('\\n');
            success();
          } else {
            stdout('\\nIncorrect password for root\\n');
            syscalls.terminate(0);
          }
        });
      };
    };
    checkPassword(() => {
      shellExec(args.slice(1).join(' '), () => syscalls.terminate(0))
    });
  });
  `
}

const whoami = {
  _isFile: true,
  owner: 0,
  permissions: '75',
  content: `
    syscalls.getudata(null, ({name}, err) => {
      syscalls.write({
        fd: 1,
        content: name + '\\n'
      }, () => {
        syscalls.terminate(0);
      })
    });
  `
}

const touch = {
  _isFile: true,
  owner: 0,
  permissions: '75',
  content: `
    if (args.length < 1) {
      const helpStr = 'Usage: touch [name1] [name2]\\n';
      syscalls.write({fd: 0, content: helpstr})
    }
    syscalls.open({ path: args[1], perms: 'cw' }, (_, err) => {
      if (err) {
        syscalls.write({fd:0, content: 'An error occurred\\n'})
        syscalls.terminate(1);
      } else {
        syscalls.terminate(0);
      }
    });
  `
}

const write = {
  _isFile: true,
  owner: 0,
  permissions: '75',
  content: `
  syscalls.fread('/lib/std', stdlib => {
    const {stdin, stdout} = eval(stdlib);

    if(args.length !== 2) {
      stdout('Usage: write [file]\\nWrites a file, listens until EOF\\n');
      syscalls.terminate(0);
      return;
    }
    const path = args[1];
    let text = '';

    // Copied from 
    const readPrint = () => {
      stdin((content, eof) => {
          if (eof) {
            writeTextToFile();
          } else if (content === '\\b') {
            if (text.length > 0) {
              text = text.substr(0, text.length - 1);
              stdout('\b');
            }
            readPrint();
          } else {
            stdout(content);
            text += content;
            readPrint();
          }
        }
      );
    };
    readPrint();

    const writeTextToFile = () => {
      syscalls.open({ path, perms: 'wc' }, (fd, err) => {
        if (!err) {
          syscalls.write({
            fd,
            content: text,
          }, err => {
            if (err) {
              stdout('An error occurred in writing the file\\n');
            }
            syscalls.terminate(err);
          });
        } else {
          stdout('An error occurred in opening the file\\n');
          syscalls.terminate(err);
        }
      });
    }
  });
  `
};

/// === actual info below!! ===
const getBday = () => {
  var birthday = new Date("1993-8-11");
  var today = new Date();
  var years = today.getFullYear() - birthday.getFullYear();

  birthday.setFullYear(today.getFullYear());
  if (today < birthday) {
      years--;
  }
  return years;
}

const about_me = {
  _isFile: true,
  owner: 1,
  permissions: '64',
  content: 
`| Hi! My name is Evin Sellin! I'm a ${getBday()} year old dork who
| spends a lot of time making computers do dumb things.
| Most of my experience is in webdev, but I'm interested
| in many aspects of computing, such as machine learning,
| functional programming, theory of computation, and web
| performance!
|
| Feel free to email me at evinism@gmail.com or tweet at
| my handle, @evinism.
`,
};

const about_this_interface = {
  _isFile: true,
  owner: 1,
  permissions: '64',
  content:
`| lol this thing isn't posix compliant but i sure wish it was.
| Source code is hosted at https://github.com/evinism/homepage
| This interface was inspired by https://github.com/rhelmot/linjus
| To get an idea of what it consists of, try executing cat /bin/sh
| or cat /dev/keyboard
`
}

const links = {
  _isFile: true,
  owner: 1,
  permissions: '64',
  content: 
`| Github: https://github.com/evinism
| Medium: https://medium.com/@evinsellin/
| Twitter: https://twitter.com/evinism
| LinkedIn: https://www.linkedin.com/in/evin-sellin-80143392/
`
}

const projects = {
  _isFile: true,
  owner: 1,
  permissions: '64',
  content:
`| ========================
| === Projects To Date ===
| ========================
|
| --- Webapps ---
| Lambda Explorer
|  Lambda Explorer is a tutorial/REPL for the lambda calculus
|  with a pretty clean interface. Like all things, it could
|  use a little work, but is otherwise pretty interesting.
|  Link: https://lambda-explorer.net/
|
| quick-pad
|  Quick-pad is an authless collaborative notepad that makes
|  creating new notes and sharing them extremely quickly.
|  Link: https://www.quick-pad.org/
|
| --- Articles ---
| What exactly is Turing Completeness?
|  A quick introduction to computation, giving us the tools to 
|  tackling the question "Is this programming language Turing 
|  Complete" beyond simply SPACE(N) completeness.
|  Link: https://medium.com/@evinsellin/what-exactly-is-turing-completeness-a08cc36b26e2
|
| Teaching Monads Slightly Differently
|  A description of problems I see with teaching monads (outside
|  of statically typed functional languages) and an explanation
|  using a different style 
|  Link: https://medium.com/@evinsellin/teaching-monads-slightly-differently-2af62c4af8ce
| 
| --- Talk(s) ---
| The Hows and Whys of Frontend Web Performance
|  Descriptive Blurb: We focus heavily on the performance of
|  our apps from a backend perspective, but we often overlook
|  the massive impact that frontend load performance tuning has 
|  on a user's experience. In this talk, we'll go through what 
|  "performance" even means from a frontend perspective and how
|  to use the tools at our disposal to make our webapps feel fast.
|  Given at the Santa Barbara JS meetup in May 2018
`
};

const passwd = {
  _isFile: true,
  owner: 0,
  permissions: '64',
  content:
`root:0684fd858f99d05b74f80f0b21f4db29:0
web:5f4dcc3b5aa765d61d8327deb882cf99:1
`,
}

const fs = { name: 'root', owner: 0, perm: '75',
  children: {
    bin: { owner: 0, perm: '75', children: {
      sh,
      cat,
      ls,
      pwd,
      rm,
      su,
      sudo,
      touch,
      whoami,
      write,
    }},
    dev: { owner: 0, perm: '75', children: {} },
    etc: { owner: 0, perm: '75', children: {
      passwd,
    }},
    lib: { owner: 0, perm: '75', children: {
      std,
    }},
    users: { owner: 0, perm: '75', children: {
      web: { owner: 1, perm: '75', children: {
        about_me,
        about_this_interface,
        links,
        projects,
      }}
    }}
  }
};


export default fs;