import { MetaCommand } from '../../../shared/metaTypes';
import { Device } from '../constants';
import { Err } from '../constants';
import Keyboard from './keyboard';
import Screen from './screen';

const NOOP = () => {};

class Tty implements Device {
  keyboard : Keyboard;
  screen : Screen;
  isEchoing = false;

  constructor(keyboard, screen){
    this.keyboard = keyboard;
    this.screen = screen;
  }

  read(cb) {
    return this.keyboard.read((str, eof) => {
      if (this.isEchoing) {
        this.write(str, NOOP);
      }
      cb(str, eof);
    });
  }

  write(data : string, cb) {
    return this.screen.write(data, cb);
  }

  ioctl (cmd : MetaCommand, cb) {
    switch(cmd.type) {
      case 'setEchoCommand': {
        this.isEchoing = cmd.data
      }
    }
    cb(Err.NONE);
  }
}

export default Tty;