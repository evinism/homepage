import { ProcStatus, FolderFile, Err } from './constants';
import OS from './os';
import User from './user';
import runInSandbox from './sandbox';
import syscalls, { syscallSchemas } from './syscalls';

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
        cb: (arg, cb) => {
          let execSyscall = () => syscalls[key](arg, process, ensureRunning(cb));
          // if there's a schema for the syscall
          // check that it makes sense
          if (syscallSchemas[key]) {
            syscallSchemas[key]
              .isValid(arg)
              .then(isValid => {
                // TODO: Make this actually fail with an error.
                // we should put error in the first arg, because otherwise, this is silly.
                if (!isValid) {
                  console.error(`Schema validation failed for ${key}: ${JSON.stringify(arg)}`);
                  cb(Err.EVALIDATION);
                  return;
                }
                execSyscall();
              });
          } else {
            execSyscall();
          }
        },
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
      os.filesystem.getFolderFile('/dev/tty'), //stdin
      os.filesystem.getFolderFile('/dev/tty'), //stdout
      os.filesystem.getFolderFile('/dev/tty'), //stderr
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