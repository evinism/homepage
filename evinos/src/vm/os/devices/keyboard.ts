import { Device, ReadCB, WriteCB } from "../constants";
import { Err } from "../constants";

const isPrintableKey = (key) => key && key.length === 1;

class Keyboard implements Device {
  pending: Array<(err: Err, data: string, eof: boolean) => void>;

  constructor(keydownPipe) {
    keydownPipe.subscribe((event) => this.preprocessKeydown(event));
    this.pending = [];
  }

  // Ewww.
  preprocessKeydown(event) {
    const keyCode = event.which || event.keyCode;
    const key = event.key;
    let toSend: string;
    let eof = false;
    if (keyCode === 229) {
      this.handleMobileKeyboard(event);
      return;
    } else if (keyCode === 8) {
      toSend = "\b";
    } else if (keyCode === 9) {
      // Tab
      event.preventDefault();
      toSend = "\t";
    } else if (keyCode === 68 && event.ctrlKey) {
      // Ctrl-D
      event.preventDefault();
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

  handleMobileKeyboard(event) {
    // This is insane and really gross, but actually kind of works
    const listener = (event) => {
      this.callPending(event.data.toLowerCase(), false);
      event.target.removeEventListener("input", listener);
    };
    event.target.addEventListener("input", listener);
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
