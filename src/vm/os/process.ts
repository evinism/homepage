import { ProcStatus, FolderFile } from './constants';
import OS from './os';
import User from './user';
import runInSandbox from './sandbox';
import syscalls from './syscalls';

const configSyscalls = process => {
  const ensureRunning = cb => (...args) => {
    if (process.status === ProcStatus.RUNNING && cb) {
      cb(...args);
    }
  };

  return Object
    .keys(syscalls)
    .map(key => ({
        key, 
        cb: (arg, cb) => syscalls[key](arg, process, ensureRunning(cb)),
    })).reduce(
      (acc, {key, cb}) => Object.assign(acc, { [key]: cb }),
      {}
    );
};

class Process {
  os : OS;
  source : string;
  status : ProcStatus;
  onTerminate : any;
  user : User;
  cwd : string;
  env : object;
  args : Array<string>;
  fds : Array<FolderFile>; // Should be actual files.

  constructor(
    user : User,
    os : OS,
    source : string,
    onTerminate,
    env : object,
    cwd : string,
    args : Array<string>,
  ) {
    this.fds = [
      os.filesystem.getFile('/dev/keyboard'), //stdin
      os.filesystem.getFile('/dev/screen'), //stdout
      os.filesystem.getFile('/dev/screen'), //stderr
    ];
    this.source = source;
    this.os = os;
    this.status = ProcStatus.PENDING;
    this.onTerminate = onTerminate;
    this.env = env;
    this.user = user;
    this.cwd = cwd;
    this.args = args;
  }

  start(){
    const syscalls = configSyscalls(this);
    this.status = ProcStatus.RUNNING;
    runInSandbox(this.source, syscalls, this.args, this.env);
  }

  terminate (exitCode) {
    this.status = ProcStatus.STOPPED;
    this.onTerminate(exitCode);
  }
}

export default Process;