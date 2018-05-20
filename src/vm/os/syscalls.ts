import { ProcStatus } from './constants';

const syscalls = {
  partyHard: (arg, process, cb) => {
    console.log('wooo!!!'); cb();
  },
  log: (arg, process, cb) => {
    console.log('arg');
    cb();
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
      arg.path,
      cb
    );
  },
  fread: (arg, process, cb) => {
    // todo: read with permissions.
    process.os.filesystem.readFromFile(arg, cb);
  },
  exec: ({ path, args }, process, cb) => {
    // once again, with permissions
    process.os.execProcess(cb, path, args);
  },
  dread: (arg, process, cb) => {
    process.os.filesystem.readDirContents(arg, cb);
  },
  pathExists: (arg, process, cb) => {
    process.os.filesystem.pathExists(arg, cb);
  },
  terminate: (arg, process, cb) => {
    process.terminate();
  }
}

export default syscalls;