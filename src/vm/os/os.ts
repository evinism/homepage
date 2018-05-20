import Filesystem from './fs';
import Process from './process';
import { Status } from './constants';
import FileSystem from './fs';

const motd = `
---------
Evin Sellin's homepage
Try poking around the filesystem!

WARNING: This is very much still a work in progress.
---------
`

const NOOP = () => {};

class OS {
  status : Status = Status.HALTED;
  processes : Array<Process> = [];
  cwd = '/';
  filesystem : FileSystem = undefined;
  env = {
    cwd: '/',
    path: '/bin/',
    motd,
  };

  version(){
    return '0.0.1';
  }

  initFS(fs){
    this.filesystem = new Filesystem(fs);
  }

  // Should probs move this to other things here.
  execProcess(onTerminate, pathStr, args) {
    this.filesystem.readFromFile(
      pathStr,
      content => {
        const proc = new Process(
          0,
          this,
          content,
          onTerminate,
          this.env,
          args || [],
        );
        proc.start();
      }
    );
  }

  systemShutdown(){
    this.filesystem.writeToFile('\nGoodbye!', '/dev/screen', NOOP);
    this.status = Status.FINISHED;
  }

  start () {
    this.status = Status.RUNNING;
    this.execProcess(() => this.systemShutdown(), '/bin/sh');
  }
};

export default OS;