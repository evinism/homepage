import { ScreenCommand } from "../../../shared/screenTypes";
import { Device, ReadCB, WriteCB } from "../constants";
import Pipe from "../../../shared/pipe";
import { Err } from "../constants";
import { BrowserCommand } from "../../../shared/browserTypes";

class Browser implements Device {
  outpipe: Pipe<BrowserCommand>;

  constructor(outpipe: Pipe<BrowserCommand>) {
    this.outpipe = outpipe;
  }

  read(cb: ReadCB) {
    cb(Err.NONE, "");
  }

  write(data: string, cb: WriteCB) {
    if (data === "auth:login") {
      this.outpipe.fire({
        type: "authCommand",
        subcommand: "login",
      });
    } else if (data === "auth:logout") {
      this.outpipe.fire({
        type: "authCommand",
        subcommand: "logout",
      });
    }
    cb(Err.NONE);
  }

  ioctl(_: unknown, cb: (err: Err) => void) {
    cb(Err.NONE);
  }
}

export default Browser;
