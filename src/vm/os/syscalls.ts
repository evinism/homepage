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
    process.fds[fd].write(content, cb);
  },
  read: (arg, process, cb) => {
    const { content, fd } = arg;
    process.fds[fd].read(cb);
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
  getuname: (arg, process, cb) => {
    cb(process.user.name, Err.NONE);
  },
}

export default syscalls;