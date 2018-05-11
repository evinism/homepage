
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
    let line = '';

    syscalls.fwrite({
      content: 'sh v0.1\\n$ ',
      path: '/dev/screen',
    });
    const readPrint = () => {
      syscalls.fread(
        '/dev/keyboard',
        content => {
          if (content === 'Enter') {
            syscalls.fwrite({
              content: '\\n$ ',
              path: '/dev/screen',
            });
            syscalls.exec(line);
          } else {
            line += content;
            syscalls.fwrite({
              content,
              path: '/dev/screen',
            });
            readPrint();
          }

        }
      );
    };
    readPrint();
  `,
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
    }},
    users: { owner: 0, perm: 644, children: {
      root: { owner: 0, perm: 644, children: {
        helloWorld,
      }}
    }}
  }
};


export default fs;