import Pipe from "../../../shared/pipe";
import { Device, ReadCB, WriteCB } from "../constants";
import { Err } from "../constants";

class Keyboard implements Device {
  pending: Array<(err: Err, data: string, eof: boolean) => void>;

  constructor(keyPipe: Pipe<[string, boolean]>) {
    keyPipe.subscribe(([data, eof]) => this.send(data, eof));
    this.pending = [];
  }

  send(data: string, eof: boolean) {
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
