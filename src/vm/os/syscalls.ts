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
      cb,
      arg.content,
      arg.path
    );
  },
  fread: (arg, process, cb) => {
    // todo: read with permissions.
    process.os.filesystem.readFromFile(cb, arg);
  },
  exec: (arg, process, cb) => {
    // once again, with permissions
    process.os.execProcess(cb, arg);
  },
  dread: (arg, process, cb) => {
    process.os.filesystem.readDirContents(cb, arg);
  },
  pathExists: (arg, process, cb) => {
    process.os.filesystem.pathExists(cb, arg);
  },
  terminate: (arg, process, cb) => {
    process.terminate();
  }
}

export default syscalls;