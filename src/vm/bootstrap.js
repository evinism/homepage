// fs
import initialFilesystem from './initial/filesystem';

// devices
import Keyboard from './os/devices/keyboard';
import Screen from './os/devices/screen';

// actual os
import OS from './os';

const noop = () => {};
const sleep = amt => new Promise((res) => setTimeout(res, amt));

// really doesn't need to be async, but it makes the cool startup seq super fun.
const bootstrap = async ({keydownPipe, keypressPipe, screenPipe}) => {
  const screen = new Screen(screenPipe);
  const keyboard = new Keyboard(keypressPipe, keydownPipe);

  await startupAnim(screen);

  const os = new OS();
  os.initFS(initialFilesystem);
  os.filesystem.mountDevice(keyboard, '/dev/keyboard');
  os.filesystem.mountDevice(screen, '/dev/screen');
  os.start();

  window.os = os;
  return os;
};

// haha i'm having fun
const startupAnim = async (screen) => {
  const out = str => screen.write(str, noop);

  out('EvinVM(build 1.0) initializing');
  for(let i = 0; i < 5; i++){
    await sleep(300);
    out('.');
  }
  await sleep(100);
  out('done\n');
  out('starting OS...\n');
  await sleep(300);
}

export default bootstrap;