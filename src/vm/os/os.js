import Filesystem from './fs';
import Pipe from '../../shared/pipe';
import Process from './process';
import { Status } from './constants';

class OS {
  status = Status.HALTED;

  processes = [];
  lastPID = 0;

  version(){
    return '0.0.1';
  }

  initFS(fs){
    this.filesystem = new Filesystem(fs);
  }

  // Should probs move this to other things here.
  execProcess(pathStr) {
    this.filesystem.readFromFile(content => {
      this.lastPID++;
      const proc = new Process(0, this.lastPID, this, content);
      proc.start();
    }, pathStr);
  }

  start () {
    this.status = Status.RUNNING;
    this.filesystem.writeToFile('writing to a device\n', '/dev/screen');
    this.execProcess('/bin/sh');
  }
};

export default OS;