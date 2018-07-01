import { Device, FolderFile, ReadWritable } from './constants';
import { Err } from './constants';

/* 
  interface file extends permissable 
  read: ((data, eof) => ()) => ()
  write: (data, bool => ()) => ()

  interface folder extends permissable
*/

export class TextFile implements FolderFile, ReadWritable {
  owner : number;
  permissions : string;
  suid : boolean;
  data : string;

  constructor(init){
    const {
      owner,
      permissions,
      data,
      suid,
    } = init;

    this.owner = owner;
    this.permissions = permissions;
    this.data = data;
    this.suid = suid;
  }

  read(cb) {
    cb(Err.NONE, this.data, true);
  }

  write(data, cb) {
    this.data = data;
    cb(Err.NONE);
  }
}

export class DeviceFile implements FolderFile, ReadWritable {
  device : Device;
  owner : number;
  permissions : string; // perms-style string again.
  suid : boolean;

  constructor(device){
    this.device = device;
    this.owner = 0;
    this.permissions = "644";
    this.suid = false;
  }

  read(cb) {
    this.device.read(cb);
  }

  write(data, cb) {
    this.device.write(data, cb);
  }
}

export default TextFile;
