import { ProcStatus } from './constants';
import runInSandbox from './sandbox';
import syscalls from './syscalls';

// TODO: make head of line blocking for syscalls
const configSyscalls = (os, process) => {
  const ensureRunning = cb => (...args) => {
    if (process.status === ProcStatus.RUNNING && cb) {
      cb(...args);
    }
  };

  return Object
    .entries(syscalls)
    .map(([key, syscall]) =>
      [ key, (arg, cb) => syscall(arg, process, ensureRunning(cb)) ]
    ).reduce(
      (acc, [key, val]) => Object.assign(acc, { [key]: val }),
      {}
    );
};

class Process {
  constructor(owner, pid, os, source, onTerminate){
    this.owner = owner;
    this.pid = pid;
    this.source = source;
    this.os = os;
    this.status = ProcStatus.PENDING;
    this.onTerminate = onTerminate;
  }

  start(){
    const syscalls = configSyscalls(this.os, this);
    this.status = ProcStatus.RUNNING;
    runInSandbox(this.source, syscalls);
  }

  terminate (exitCode) {
    this.status = ProcStatus.STOPPED;
    this.onTerminate(exitCode);
  }
}

export default Process;