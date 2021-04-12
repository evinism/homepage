import { Device, File, ReadCB, WriteCB } from "./constants";
import { Err } from "./constants";

export class TextFile implements File {
  owner: number;
  permissions: string;
  suid: boolean;
  data: string;

  constructor(init) {
    const { owner, permissions, data, suid } = init;

    this.owner = owner;
    this.permissions = permissions;
    this.data = data;
    this.suid = suid;
  }

  read(cb: ReadCB) {
    cb(Err.NONE, this.data, true);
  }

  write(data: string, cb: WriteCB) {
    this.data = data;
    cb(Err.NONE);
  }
}

export class DeviceFile implements File {
  device: Device;
  owner: number;
  permissions: string; // perms-style string again.
  suid: boolean;

  constructor(device: Device) {
    this.device = device;
    this.owner = 0;
    this.permissions = "64";
    this.suid = false;
  }

  read(cb: ReadCB) {
    this.device.read((err: Err, data: string, eof: boolean) =>
      cb(err, data, eof)
    );
  }

  write(data, cb: WriteCB) {
    this.device.write(data, cb);
  }
}

export default TextFile;
