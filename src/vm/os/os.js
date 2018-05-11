import Filesystem from './fs';
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
  }
};

export default OS;