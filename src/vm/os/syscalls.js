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
    process.os.execProcess(arg);
  }
}

export default syscalls;