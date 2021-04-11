import * as yup from "yup";
import { ProcStatus, Err } from "./constants";
import { getAbsolutePathStr } from "./util";
import Folder from "./folder";
import { DeviceFile } from "./file";
import win from "./homepage-secret/win";
import Process from "./process";

// The last thing to a cb should always be an error code
const syscalls = {
  log: (arg: string, process: Process, cb) => {
    console.log(arg);
    cb(Err.NONE);
  },
  write: (arg: any, process: Process, cb) => {
    const { data, fd } = arg;
    //TODO PERMS check. Probs do in the FS, not here.
    if (process.fds[fd]) {
      process.fds[fd].write(data, cb);
    } else {
      cb(Err.EBADFD);
    }
  },
  read: (arg: any, process: Process, cb) => {
    const { fd } = arg;
    if (process.fds[fd]) {
      process.fds[fd].read(cb);
    } else {
      cb(Err.EBADFD, "", true);
    }
  },
  open: (arg: any, process: Process, cb) => {
    const { path, perms } = arg;
    // TODO: perms on this call
    // TODO: Promisify stuff in fs, ugh...
    const absPath = getAbsolutePathStr(path, process.cwd);
    const newFD = process.fds.length;
    let file = process.os.filesystem!.getFolderFile(absPath);
    // todo: move this logic to be in fs
    if (!file && perms.indexOf("c") >= 0) {
      process.os.filesystem!.newTextFile(
        "",
        absPath,
        process.user.id,
        (err) => {
          if (!err) {
            file = process.os.filesystem!.getFolderFile(absPath);
            process.fds[newFD] = file;
            cb(Err.NONE, newFD);
          } else {
            cb(err, 0);
          }
        }
      );
    } else if (!file) {
      cb(Err.ENOFILE, 0);
    } else if (file instanceof Folder) {
      cb(Err.ENOTFILE, 0);
    } else {
      process.fds[newFD] = file;
      cb(Err.NONE, newFD);
    }
  },
  close: (arg: any, process: Process, cb) => {
    const fd = arg;
    if (process.fds[fd]) {
      delete process.fds[fd];
      cb(Err.NONE);
    } else {
      cb(Err.EBADFD);
    }
  },
  fwrite: (arg: any, process: Process, cb) => {
    // todo: write with permissions.
    process.os.filesystem!.writeToFile(
      arg.data,
      getAbsolutePathStr(arg.path, process.cwd),
      cb
    );
  },
  fread: (arg: any, process: Process, cb) => {
    // todo: read with permissions.
    process.os.filesystem!.readFromFile(
      getAbsolutePathStr(arg, process.cwd),
      cb
    );
  },
  rmFile: (arg: any, process: Process, cb) => {
    process.os.filesystem!.removeFile(getAbsolutePathStr(arg, process.cwd), cb);
  },
  mkDir: (arg: any, process: Process, cb) => {
    process.os.filesystem!.makeDir(
      getAbsolutePathStr(arg, process.cwd),
      process.user.id,
      cb
    );
  },
  rmDir: (arg: any, process: Process, cb) => {
    process.os.filesystem!.removeFolder(
      getAbsolutePathStr(arg, process.cwd),
      cb
    );
  },
  // spins up a new process
  exec: ({ path, args }, process: Process, cb) => {
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
  dread: (arg: any, process: Process, cb) => {
    process.os.filesystem!.readDirContents(
      getAbsolutePathStr(arg, process.cwd),
      cb
    );
  },
  // tells whether or not the path exists
  pathExists: (arg: any, process: Process, cb) => {
    process.os.filesystem!.pathExists(
      getAbsolutePathStr(arg, process.cwd),
      (exists) => cb(Err.NONE, exists) // Shim because fs.exists doesn't follow weird convention.
    );
  },
  // tells the kernel to terminate the process.
  terminate: (arg: any, process: Process, _) => {
    process.terminate(0);
  },
  // gets the current working directory of the process
  getcwd: (arg: any, process: Process, cb) => {
    cb(Err.NONE, process.cwd);
  },
  // sets the current working directory of the process
  setcwd: (arg: any, process: Process, cb) => {
    arg = arg.trim();
    // cwd should always have trailing slash.
    if (arg[arg.length - 1] !== "/") {
      arg = arg + "/";
    }

    const wd = getAbsolutePathStr(arg, process.cwd);

    process.os.filesystem!.ensureFolder(wd, (err) => {
      if (!err) {
        process.cwd = wd;
        cb(Err.NONE);
      } else {
        cb(err);
      }
    });
  },
  getudata: (arg: any, process: Process, cb) => {
    const { name, id, password } = process.user;
    cb(Err.NONE, { name, id, password });
  },
  ioctl: (arg: any, process: Process, cb) => {
    const { fd, cmd } = arg;
    if (!process.fds[fd]) {
      cb(Err.EBADFD);
      return;
    }
    const dev = process.fds[fd];
    if (!(dev instanceof DeviceFile)) {
      // todo: figure out how to not have this be terrible
      cb(Err.ENOTDEVICE);
      return;
    }
    dev.device.ioctl(cmd, cb);
  },
  win: (arg: any, process: Process, cb) => {
    if (process.user.id !== 0) {
      cb(Err.EPERM);
    } else {
      win(process);
      cb(Err.NONE);
    }
  },
};

yup.addMethod(
  yup.string,
  "requiredWithEmpty",
  function (msg = "$path must be defined") {
    return this.test(
      "requiredWithEmpty",
      msg,
      (value) => typeof value === "string"
    );
  }
);

// if the schema exists in the syscall schema, it'll be
// considered a precondition for the arg that should be checked.
// obvs we can't do this through typechecking.
export const syscallSchemas = {
  write: yup.object().shape({
    data: yup.string(),
    fd: yup.number().positive().required(),
  }),
  read: yup.object().shape({
    fd: yup.number().integer().moreThan(-1).required(), // lol at inconsistency
  }),
  open: yup.object().shape({
    path: yup.string().required(),
    perms: yup.string().matches(/^c?r?a?w?$/), // CRAW!!!
  }),
  close: yup.number().positive(),
  fwrite: yup.object().shape({
    data: yup.string(),
    path: yup.string().required(),
  }),
  fread: yup.string().required(),
  rmFile: yup.string().required(),
  execProcess: yup.object().shape({
    path: yup.string().required(),
    args: yup.array().of(yup.string()),
  }),
  ioctl: yup.object().shape({
    fd: yup.number().positive().required(),
    cmd: yup.object().required(),
  }),
};

export default syscalls;
