import Pipe from '../../../shared/pipe';
import { Device } from '../constants';
import { Err } from '../constants';

class Keyboard implements Device {
  pending : Array<(string, boolean) => void>;

  constructor(keypressPipe, keydownPipe) {
    keypressPipe.subscribe(native => this.preprocessKeypress(native));
    keydownPipe.subscribe(native => this.preprocessKeydown(native));
    this.pending = [];
  }

  // Weird hacky parallel streams here:
  preprocessKeypress(native) {
    const keyCode = native.which || native.keyCode;
    let toSend;
    let eof = false;
    switch(keyCode){
      case 13:
        toSend = "\n";
        break;
      default: 
        toSend = String.fromCharCode(native.which || native.keyCode);
    }
    if(toSend) {
      this.callPending(toSend, eof);
    }
  };

  // Ewww.
  preprocessKeydown(native) {
    const keyCode = native.which || native.keyCode;
    let toSend;
    let eof = false;
    switch(keyCode){
      case 8:
        toSend = "\b";
        break;
      case 68:
        if (native.metaKey) {
          native.preventDefault();
          toSend = '\n';
          eof = true;
        }
        break;
      default:
        break;
    }
    if(toSend) {
      this.callPending(toSend, eof);
    }
  }

  callPending(str, finished){
    const toCall = this.pending;
    this.pending = [];
    toCall.forEach(pend => pend(str, finished));
  }

  read (cb) {
    this.pending.push(cb);
  }

  write (content, cb) {
    cb(Err.EUNWRITABLE);
  }
};

export default Keyboard;