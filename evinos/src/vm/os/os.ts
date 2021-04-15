import Filesystem from "./fs";
import Process from "./process";
import User from "./user";
import { Status, Device } from "./constants";
import FileSystem from "./fs";
import initialFilesystem from "../initial/filesystem";
import DeviceType from "../vmtypes";

const motd = `
---------
Evin Sellin's homepage
Try poking around the filesystem!

For supported commands, run "ls /bin"
---------
`;

const NOOP = () => {};

// TODO: There's probably a better place for this
function makeUserFromEntry(userStr) {
  const params = userStr.split(":");
  if (params.length < 3) {
    return;
  }
  const [name, password, id] = params;
  return new User(name, password, parseInt(id, 10));
}

class OS {
  status: Status = Status.HALTED;
  processes: Array<Process> = [];
  users: Array<User> = [];
  cwd = "/";
  filesystem: FileSystem = undefined;
  devices: Array<[Device, DeviceType]> = [];

  env = {
    path: "/bin/",
    motd,
  };

  version() {
    return "0.0.1";
  }

  initFS(fs) {
    this.filesystem = new Filesystem(fs);
  }

  getUsers(cb: (users: User[]) => unknown) {
    this.filesystem.readFromFile("/etc/passwd", (err, passwd) => {
      const users = passwd.split("\n").map(makeUserFromEntry).filter(Boolean);
      cb(users);
    });
  }

  registerDevice = (dev, deviceType) => {
    this.devices.push([dev, deviceType]);
  };

  mountDevices = () => {
    // rn just overwrite every file with latest pushed device of that type
    // hahahha i am an incredible coder
    const mapping = {
      [DeviceType.KEYBOARD]: "/dev/keyboard",
      [DeviceType.SCREEN]: "/dev/screen",
      [DeviceType.TTY]: "/dev/tty",
    };
    this.devices.forEach(([dev, deviceType]) => {
      this.filesystem.mountDevice(dev, mapping[deviceType]);
    });
  };

  // Should probs move this to other things here.
  execProcess(
    pathStr: string,
    args: string[],
    wd: string,
    user: User,
    onTerminate: (exitCode: number) => void
  ) {
    this.filesystem.readFileMetadata(pathStr, (_, { suid, owner }) => {
      this.filesystem.readFromFile(pathStr, (_, data) => {
        this.getUsers((users) => {
          let activeUser = user;
          if (suid) {
            activeUser = users.find((user) => user.id === owner);
            if (!activeUser) {
              console.log("aaaa noa ctive user");
              activeUser = user;
            }
          }
          const proc = new Process(
            activeUser,
            this,
            data,
            onTerminate,
            this.env,
            wd,
            args || []
          );
          proc.start();
        });
      });
    });
  }

  systemShutdown() {
    this.filesystem.writeToFile(
      "\nShutting down OS...\nGoodbye!\n",
      "/dev/screen",
      NOOP
    );
    this.filesystem.writeToFile("\u0004", "/dev/screen", NOOP);
    this.status = Status.FINISHED;
  }

  start() {
    // TODO: This start function should be the one initializing the FS
    // Not the bootstrapper
    this.initFS(initialFilesystem);
    this.mountDevices();
    this.getUsers((users) => {
      const webUser = users.find((user) => user.id === 1);
      this.status = Status.RUNNING;
      this.execProcess("/bin/sh", [], "/users/web/", webUser, () =>
        this.systemShutdown()
      );
    });
  }
}

export default OS;
