import Pipe from "../../../shared/pipe";
import { Device, ReadCB, WriteCB } from "../constants";
import { Err } from "../constants";

class Keyboard implements Device {
  pending: Array<(err: Err, data: string, eof: boolean) => void>;

  constructor(keypressPipe, keydownPipe) {
    keypressPipe.subscribe((native) => this.preprocessKeypress(native));
    keydownPipe.subscribe((native) => this.preprocessKeydown(native));
    this.pending = [];
  }

  // Weird hacky parallel streams here:
  preprocessKeypress(native) {
    const keyCode = native.which || native.keyCode;
    let toSend;
    let eof = false;
    switch (keyCode) {
      case 13:
        toSend = "\n";
        break;
      default:
        toSend = String.fromCharCode(native.which || native.keyCode);
    }
    if (toSend) {
      this.callPending(toSend, eof);
    }
  }

  // Ewww.
  preprocessKeydown(native) {
    const keyCode = native.which || native.keyCode;
    let toSend: string;
    let eof = false;
    switch (keyCode) {
      case 8:
        toSend = "\b";
        break;
      case 9:
        native.preventDefault();
        toSend = "\t";
        break;
      case 68:
        if (native.ctrlKey) {
          native.preventDefault();
          toSend = "\n";
          eof = true;
        }
        break;
      default:
        break;
    }
    if (toSend) {
      this.callPending(toSend, eof);
    }
  }

  callPending(data: string, eof: boolean) {
    const toCall = this.pending;
    this.pending = [];
    toCall.forEach((pend) => pend(Err.NONE, data, eof));
  }

  read(cb: ReadCB) {
    this.pending.push(cb);
  }

  write(data: string, cb: WriteCB) {
    cb(Err.EUNWRITABLE);
  }

  ioctl(_, cb) {
    cb(Err.NONE);
  }
}

export default Keyboard;
