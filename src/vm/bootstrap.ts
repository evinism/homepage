// devices
import Keyboard from './os/devices/keyboard';
import Screen from './os/devices/screen';
import Tty from './os/devices/tty';

import DeviceType from './vmtypes';

// actual os
import OS from './os';

// really doesn't need to be async, but it makes the cool startup seq super fun.
const bootstrap = async ({keydownPipe, keypressPipe, screenPipe}) => {
  const screen = new Screen(screenPipe);
  const keyboard = new Keyboard(keypressPipe, keydownPipe);
  const tty = new Tty(keyboard, screen);

  await startupAnim(screen);

  const os = new OS();
  os.registerDevice(keyboard, DeviceType.KEYBOARD);
  os.registerDevice(screen, DeviceType.SCREEN);
  os.registerDevice(tty, DeviceType.TTY);
  os.start();

  window.os = os;
  return os;
};

const noop = () => {};
const sleep = amt => new Promise((res) => setTimeout(res, amt));

// haha i'm having fun
const startupAnim = async (screen) => {
  const out = str => screen.write(str, noop);

  out('EvinVM(build 1.0) initializing');
  for(let i = 0; i < 3; i++){
    await sleep(300);
    out('.');
  }
  await sleep(100);
  out('done\n');
  out('starting OS...\n');
  await sleep(300);
}

export default bootstrap;