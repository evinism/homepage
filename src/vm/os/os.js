import Filesystem from './fs';
import Pipe from '../../shared/pipe';
import { Status } from './constants';


class OS {
  status = Status.HALTED;

  version(){
    return '0.0.1';
  }

  initFS(fs){
    this.filesystem = new Filesystem(fs);
  }

  start () {
    this.status = Status.RUNNING;
    this.filesystem.writeToFile('lol writing to a device\n', '/dev/screen');

    // basic cat program, but in OS land
    const ioPipe = new Pipe();
    ioPipe.subscribe((contents, finished) => {
      this.filesystem.writeToFile(contents, '/dev/screen');
      if (finished) {
        return;
      }
      this.filesystem.readFromFile(
        (contents, finished) => ioPipe.fire(contents, finished),
        '/dev/keyboard'
      );
    })
    ioPipe.fire('', false);
  }
};

export default OS;