import { Device } from './devices/types';

/* 
  interface file extends permissable 
  read: ((contents, eof) => ()) => ()
  write: (contents, bool => ()) => ()

  interface folder extends permissable
  children

  interface permissable
  permissions, owner
*/

export class TextFile {
  owner : number;
  permissions : string; // should be chmod style perms.
  content : string;

  constructor(init){
    const {
      owner,
      permissions,
      content,
    } = init;

    this.owner = owner;
    this.permissions = permissions;
    this.content = content;
  }

  read(cb) {
    cb(this.content, true);
  }

  write(content, cb) {
    this.content = content;
    cb(true);
  }
}

export class DeviceFile {
  device : Device;
  owner : number;
  permissions : string; // perms-style string again.

  constructor(device){
    this.device = device;
    this.owner = 0;
    this.permissions = "644";
  }

  read(cb) {
    this.device.read(cb);
  }

  write(content, cb) {
    this.device.write(content, cb);
  }
}

export default TextFile;
