import { ProcStatus } from './constants';

const syscalls = {
  partyHard: (arg, process, cb) => {
    console.log('wooo!!!'); cb();
  },
  fwrite: (arg, process, cb) => {
    // todo: write with permissions.
    process.os.filesystem.writeToFile(arg.content, arg.path);
    cb();
  },
  fread: (arg, process, cb) => {
    // todo: read with permissions.
    process.os.filesystem.readFromFile(cb, arg);
  },
  exec: (arg, process, cb) => {
    // once again, with permissions
    process.os.execProcess(arg, cb);
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