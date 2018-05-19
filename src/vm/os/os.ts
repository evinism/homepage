import Filesystem from './fs';
import Process from './process';
import { Status } from './constants';
import FileSystem from './fs';

const NOOP = () => {};

class OS {
  status : Status = Status.HALTED;
  processes : Array<Process> = [];
  cwd = '/';
  filesystem : FileSystem = undefined;
  env = {
    path: '/bin/',
    motd: 'Welcome to the personal website of Evin Sellin.\nTry poking around the filesystem for more info! \n',
  };

  version(){
    return '0.0.1';
  }

  initFS(fs){
    this.filesystem = new Filesystem(fs);
  }

  // Should probs move this to other things here.
  execProcess(onTerminate, pathStr, args) {
    this.filesystem.readFromFile(content => {
      const proc = new Process(
        0,
        this,
        content,
        onTerminate,
        this.env,
        args || [],
      );
      proc.start();
    }, pathStr);
  }

  systemShutdown(){
    this.filesystem.writeToFile(NOOP, '\nGoodbye!', '/dev/screen');
    this.status = Status.FINISHED;
  }

  start () {
    this.status = Status.RUNNING;
    this.filesystem.writeToFile(NOOP, '\nEvinOS v0.01\n', '/dev/screen');
    this.execProcess(() => this.systemShutdown(), '/bin/sh');
  }
};

export default OS;