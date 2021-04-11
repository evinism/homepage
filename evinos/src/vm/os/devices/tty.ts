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
  echoDisabled : boolean = true;
  line : string = '';

  constructor(keyboard, screen){
    this.keyboard = keyboard;
    this.screen = screen;
  }

  read(cb) {
    const writeIfEcho = data => {
      if (!this.echoDisabled) {
        this.write(data, NOOP);
      }
    }

    // So, here's the deal...
    // I want to be able to have the input echo and not actually submit 
    // until enter's pressed, but I also want tab completion and history
    // Solution: Fancy programs, such as the shell, can use a passthrough
    // to make it so the shell has full access to the keyboard and such,
    // but only when it wants to. This should always be off while switching 
    // programs, as a general rule.
    if (!this.isPassthrough) {
      const prompt = () => this.keyboard.read((data, eof) => {
        if (eof) {
          cb('', true);
          this.line = '';
          return;
        } else if (data === '\n') {
          cb(this.line + data, false);
          writeIfEcho(data);
          this.line = '';
        } else if (data === '\b') {
          if (this.line.length > 0) {
            this.line = this.line.substr(0, this.line.length - 1);
            writeIfEcho(data);
          }
          prompt();
        } else {
          this.line = this.line + data;
          writeIfEcho(data);
          prompt();
        }
      });
      prompt();
    } else {
      return this.keyboard.read((data, eof) => {
        writeIfEcho(data);
        cb(data, eof);
      });
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
      case 'setEchoCommand': {
        this.echoDisabled = cmd.data
      }
    }
    cb(Err.NONE);
  }
}

export default Tty;