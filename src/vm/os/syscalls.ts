import * as yup from 'yup';
import { ProcStatus, Err } from './constants';
import { getAbsolutePathStr } from './util';
import Folder from './folder';

// The last thing to a cb should always be an error code
const syscalls = {
  partyHard: (arg, process, cb) => {
    console.log('wooo!!!'); cb(Err.NONE);
  },
  log: (arg, process, cb) => {
    console.log(arg);
    cb(Err.NONE);
  },
  write: (arg, process, cb) => {
    const { data, fd } = arg;
    //TODO PERMS check. Probs do in the FS, not here.
    if (process.fds[fd]) {
      process.fds[fd].write(data, cb);
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
    // TODO: Promisify stuff in fs, ugh...
    const absPath = getAbsolutePathStr(path, process.cwd);
    const newFD = process.fds.length;
    let file = process.os.filesystem.getFolderFile(absPath);
    // todo: move this logic to be in fs
    if (!file && perms.indexOf('c') >= 0) {
      process.os.filesystem.newTextFile('', absPath, process.user.id, err => {
        if (!err) {
          file = process.os.filesystem.getFolderFile(absPath);
          process.fds[newFD] = file;
          cb(newFD, Err.NONE);
        } else {
          cb(0, err);
        }
      });
    } else if(!file) {
      cb(0, Err.ENOFILE);
    } else if (file instanceof Folder) {
      cb(0, Err.ENOTFILE);
    } else {
      process.fds[newFD] = file;
      cb(newFD, Err.NONE);
    }
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
      arg.data,
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
  mkDir: (arg, process, cb) => {
    process.os.filesystem.makeDir(
      getAbsolutePathStr(arg, process.cwd),
      process.user.id,
      cb
    );
  },
  rmDir: (arg, process, cb) => {
    process.os.filesystem.removeFolder(
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
  terminate: (arg, process, _) => {
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
    } else {
      alert('a winner is you');
      cb(Err.NONE);
    }
  },
}

// if the schema exists in the syscall schema, it'll be
// considered a precondition for the arg that should be checked.
// obvs we can't do this through typechecking.
export const syscallSchemas = {
  write: yup.object().shape({
    data: yup.string().required(),
    fd: yup.number().positive().required(),
  }),
  read: yup.object().shape({
    fd: yup.number().positive().required(), // lol at inconsistency
  }),
  open: yup.object().shape({
    path: yup.string().required(),
    perms: yup.string().matches(/^c?r?a?w?$/), // CRAW!!!
  }),
  close: yup.number().positive(),
  fwrite: yup.object().shape({
    data: yup.string().required(),
    path: yup.string().required(),
  }),
  fread: yup.string().required(),
  rmFile: yup.string().required(),
  execProcess: yup.object().shape({
    path: yup.string().required(),
    args: yup.array().of(yup.string())
  }),
};

export default syscalls;