import { ScreenCommand } from '../../../shared/screenTypes';
import { Device } from '../constants';
import Pipe from '../../../shared/pipe';
import { Err } from '../constants';

class Screen implements Device {
  outpipe: Pipe<ScreenCommand>;

  constructor(outpipe : Pipe<ScreenCommand>) {
    this.outpipe = outpipe;
  }

  read (cb) {
    cb('', Err.NONE);
  }

  write (content : string, cb : any) {
    if (content === '\b') {
      this.outpipe.fire({
        type: 'removeCommand',
        amount: 1,
      });
    } else {
      this.outpipe.fire({
        type: 'appendCommand',
        content,
      });
    }
    cb(Err.NONE);
  }

  writeToScreen (screenCommand : ScreenCommand) {
    this.outpipe.fire(screenCommand);
  }
};

export default Screen;