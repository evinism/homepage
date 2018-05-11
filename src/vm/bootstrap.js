// fs
import initialFilesystem from './initial/filesystem';

// devices
import Keyboard from './os/devices/keyboard';
import Screen from './os/devices/screen';

// actual os
import OS from './os';

// pipes are just fifos.
const bootstrap = ({keyboardPipe, screenPipe}) => {
  const os = new OS();
  os.initFS(initialFilesystem);
  os.filesystem.mountDevice(new Keyboard(keyboardPipe), '/dev/keyboard');
  os.filesystem.mountDevice(new Screen(screenPipe), '/dev/screen');

  os.filesystem.writeToFile('lol writing to a device', '/dev/screen');

  window.os = os;
  return os;
};

export default bootstrap;