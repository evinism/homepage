// devices
import Keyboard from "./os/devices/keyboard";
import Screen from "./os/devices/screen";
import Tty from "./os/devices/tty";

import DeviceType from "./vmtypes";

// actual os
import OS from "./os";
import Pipe from "../shared/pipe";
import { ScreenCommand } from "../shared/screenTypes";
import { BrowserCommand } from "../shared/browserTypes";
import Browser from "./os/devices/browser";

interface BootstrapOptions {
  keyPipe: Pipe<[string, boolean]>;
  screenPipe: Pipe<ScreenCommand>;
  browserPipe: Pipe<BrowserCommand>;
}

// really doesn't need to be async, but it makes the cool startup seq super fun.
const bootstrap = async ({ keyPipe, screenPipe, browserPipe }: BootstrapOptions) => {
  const screen = new Screen(screenPipe);
  const keyboard = new Keyboard(keyPipe);
  const tty = new Tty(keyboard, screen);
  const browser = new Browser(browserPipe);

  await startupAnim(screen);

  const os = new OS();
  os.registerDevice(keyboard, DeviceType.KEYBOARD);
  os.registerDevice(screen, DeviceType.SCREEN);
  os.registerDevice(tty, DeviceType.TTY);
  os.registerDevice(browser, DeviceType.BROWSER);
  os.start();

  (window as any).os = os;
  return os;
};

const noop = () => {};
const sleep = (amt: number) => new Promise((res) => setTimeout(res, amt));

// haha i'm having fun
const startupAnim = async (screen: Screen) => {
  const out = (str: string) => screen.write(str, noop);

  out("EvinVM(build 1.0) initializing");
  for (let i = 0; i < 3; i++) {
    await sleep(300);
    out(".");
  }
  await sleep(100);
  out("done\n");
  out("starting OS...\n");
  await sleep(300);
};

export default bootstrap;
