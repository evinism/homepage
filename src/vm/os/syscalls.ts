import { ProcStatus, Err } from './constants';
import { getAbsolutePathStr } from './util';

// The last thing to a cb should always be an error code
const syscalls = {
  partyHard: (arg, process, cb) => {
    console.log('wooo!!!'); cb(Err.none);
  },
  log: (arg, process, cb) => {
    console.log(arg);
    cb(Err.NONE);
  },
  write: (arg, process, cb) => {
    const { content, fd } = arg;
    //TODO PERMS check. Probs do in the FS, not here.
    if (process.fds[fd]) {
      process.fds[fd].write(content, cb);
    } else {
      cb(Err.EBADFD);
    }
  },
  read: (arg, process, cb) => {
    const { fd } = arg;
    if (process.fds[fd]) {
      process.fds[fd].read(cb);
    } else {
      cb('', true, Err.EBADFD);
    }
  },
  open: (arg, process, cb) => {
    const { path, perms } = arg;
    // TODO: perms on this call 
    const absPath = getAbsolutePathStr(path, process.cwd);
    const newFD = process.fds.length;
    process.fds[newFD] = process.os.filesystem.getFile(absPath);
    cb(newFD, Err.NONE);
  },
  close: (arg, process, cb) => {
    const fd = arg;
    if (process.fds[fd]) {
      delete process.fds[fd];
      cb(Err.NONE);
    } else {
      cb(Err.EBADFD);
    }
  },
  fwrite: (arg, process, cb) => {
    // todo: write with permissions.
    process.os.filesystem.writeToFile(
      arg.content,
      getAbsolutePathStr(arg.path, process.cwd),
      cb
    );
  },
  fread: (arg, process, cb) => {
    // todo: read with permissions.
    process.os.filesystem.readFromFile(
      getAbsolutePathStr(arg, process.cwd),
      cb
    );
  },
  rmFile: (arg, process, cb) => {
    process.os.filesystem.removeFile(
      getAbsolutePathStr(arg, process.cwd),
      cb
    );
  },
  // spins up a new process
  exec: ({ path, args }, process, cb) => {
    // once again, with permissions
    process.os.execProcess(
      getAbsolutePathStr(path, process.cwd),
      args,
      process.cwd,
      process.user,
      cb
    );
  },
  // gets a list of everything in the folder
  dread: (arg, process, cb) => {
    process.os.filesystem.readDirContents(
      getAbsolutePathStr(arg, process.cwd),
      cb
    );
  },
  // tells whether or not the path exists
  pathExists: (arg, process, cb) => {
    process.os.filesystem.pathExists(
      getAbsolutePathStr(arg, process.cwd),
      cb
    );
  },
  // tells the kernel to terminate the process.
  terminate: (arg, process, cb) => {
    process.terminate();
  },
  // gets the current working directory of the process
  getcwd: (arg, process, cb) => {
    cb(process.cwd, Err.NONE);
  },
  // sets the current working directory of the process
  setcwd: (arg, process, cb) => {
    arg = arg.trim();
    // cwd should always have trailing slash.
    if (arg[arg.length - 1] !== '/') {
      arg = arg + '/';
    }

    const wd = getAbsolutePathStr(arg, process.cwd);

    process.os.filesystem.ensureFolder(wd, err => {
      if (!err) {
        process.cwd = wd;
        cb(Err.NONE);
      } else {
        cb(err);
      }
    });
  },
  getudata: (arg, process, cb) => {
    const { name, id, password } = process.user
    cb({ name, id, password }, Err.NONE);
  },
  win: (arg, process, cb) => {
    if(process.user.id !== 0) {
      cb(Err.EPERM)
    }
    alert('a winner is you');
    cb(Err.NONE);
  },
}

export default syscalls;