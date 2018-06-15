import { MetaCommand } from '../../../shared/metaTypes';
import { Device } from '../constants';
import { Err } from '../constants';
import Keyboard from './keyboard';
import Screen from './screen';

const NOOP = () => {};

class Tty implements Device {
  keyboard : Keyboard;
  screen : Screen;

  isPassthrough : boolean = false;
  line : string = '';

  constructor(keyboard, screen){
    this.keyboard = keyboard;
    this.screen = screen;
  }

  read(cb) {
    // So, here's the deal...
    // I want to be able to have the input echo and not actually submit 
    // until enter's pressed, but I also want tab completion and history
    // Solution: Fancy programs, such as the shell, can use a passthrough
    // to make it so 1: the shell doesn't echo, and 2: the shell has full
    // access to the keyboard and such, but only when it wants to.
    // This should always be off while switching programs, as a general rule.
    if (!this.isPassthrough) {
      const prompt = () => this.keyboard.read((data, eof) => {
        if (eof) {
          cb('', true);
          this.line = '';
          return;
        } else if (data === '\n') {
          cb(this.line + data, false);
          this.write(data, NOOP);
          this.line = '';
        } else if (data === '\b') {
          if (this.line.length > 0) {
            this.line = this.line.substr(0, this.line.length - 1);
            this.write(data, NOOP);
          }
          prompt();
        } else {
          this.line = this.line + data;
          this.write(data, NOOP);
          prompt();
        }
      });
      prompt();
    } else {
      return this.keyboard.read(cb);
    }
  }

  write(data : string, cb) {
    return this.screen.write(data, cb);
  }

  ioctl (cmd : MetaCommand, cb) {
    switch(cmd.type) {
      case 'setPassthroughCommand': {
        this.isPassthrough = cmd.data
      }
    }
    cb(Err.NONE);
  }
}

export default Tty;