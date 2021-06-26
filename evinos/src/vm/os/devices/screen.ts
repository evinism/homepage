import { ScreenCommand } from "../../../shared/screenTypes";
import { Device, ReadCB, WriteCB } from "../constants";
import Pipe from "../../../shared/pipe";
import { Err } from "../constants";

class Screen implements Device {
  outpipe: Pipe<ScreenCommand>;

  constructor(outpipe: Pipe<ScreenCommand>) {
    this.outpipe = outpipe;
  }

  read(cb: ReadCB) {
    cb(Err.NONE, "");
  }

  write(data: string, cb: WriteCB) {
    if (data === "\b") {
      this.outpipe.fire({
        type: "removeCommand",
        amount: 1,
      });
    } else if (data === "\u0004") {
      this.outpipe.fire({
        type: "offCommand",
      });
    } else {
      this.outpipe.fire({
        type: "appendCommand",
        data,
      });
    }
    cb(Err.NONE);
  }

  writeToScreen(screenCommand: ScreenCommand) {
    this.outpipe.fire(screenCommand);
  }

  ioctl(command: ScreenCommand, cb: (err: Err) => void) {
    if (command.type === "colorCommand"){
      this.outpipe.fire({
        type: "colorCommand",
        color: "placeholder",
      });
    }
    cb(Err.NONE);
  }
}

export default Screen;
