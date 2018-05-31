import { Device, FolderFile, ReadWritable } from './constants';
import { Err } from './constants';

/* 
  interface file extends permissable 
  read: ((contents, eof) => ()) => ()
  write: (contents, bool => ()) => ()

  interface folder extends permissable
*/

export class TextFile implements FolderFile, ReadWritable {
  owner : number;
  permissions : string;
  suid : boolean;
  content : string;

  constructor(init){
    const {
      owner,
      permissions,
      content,
      suid,
    } = init;

    this.owner = owner;
    this.permissions = permissions;
    this.content = content;
    this.suid = suid;
  }

  read(cb) {
    cb(this.content, true, Err.NONE);
  }

  write(content, cb) {
    this.content = content;
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

  write(content, cb) {
    this.device.write(content, cb);
  }
}

export default TextFile;
