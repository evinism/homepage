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
  execProcess(pathStr, args, wd, onTerminate) {
    this.filesystem.readFromFile(
      pathStr,
      content => {
        const proc = new Process(
          0,
          this,
          content,
          onTerminate,
          this.env,
          wd,
          args || [],
        );
        proc.start();
        console.log(proc);
      }
    );
  }

  systemShutdown(){
    this.filesystem.writeToFile('\nGoodbye!', '/dev/screen', NOOP);
    this.status = Status.FINISHED;
  }

  start () {
    this.status = Status.RUNNING;
    this.execProcess('/bin/sh', [], '/', () => this.systemShutdown());
  }
};

export default OS;