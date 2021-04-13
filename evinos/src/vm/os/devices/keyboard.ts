import { Device, ReadCB, WriteCB } from "../constants";
import { Err } from "../constants";

const isPrintableKey = (key) => key && key.length === 1;

class Keyboard implements Device {
  pending: Array<(err: Err, data: string, eof: boolean) => void>;

  constructor(keydownPipe) {
    keydownPipe.subscribe((native) => this.preprocessKeydown(native));
    this.pending = [];
  }

  // Ewww.
  preprocessKeydown(native) {
    const keyCode = native.which || native.keyCode;
    const key = native.key;
    let toSend: string;
    let eof = false;
    if (keyCode === 8) {
      toSend = "\b";
    } else if (keyCode === 9) {
      // Tab
      native.preventDefault();
      toSend = "\t";
    } else if (keyCode === 68 && native.ctrlKey) {
      // Ctrl-D
      native.preventDefault();
      toSend = "\n";
      eof = true;
    } else if (keyCode === 13) {
      // Enter
      toSend = "\n";
    } else if (isPrintableKey(key)) {
      // Everything else
      toSend = key;
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
