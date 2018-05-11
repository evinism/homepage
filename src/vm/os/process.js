import { ProcStatus } from './constants';
import runInSandbox from './sandbox';
import syscalls from './syscalls';

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
  constructor(owner, pid, os, source){
    this.owner = owner;
    this.pid = pid;
    this.source = source;
    this.os = os;
    this.status = ProcStatus.PENDING;
  }

  start(){
    const syscalls = configSyscalls(this.os, this);
    this.status = ProcStatus.RUNNING;
    runInSandbox(this.source, syscalls);
  }
}

export default Process;