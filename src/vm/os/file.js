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
  constructor(init){
    const {
      owner, // number
      permissions, // chmod style perms
      content, // a string
    } = init;

    this.owner = owner;
    this.permissions = permissions;
    this.content = content;
  }

  read(cb) {
    cb(content, true);
  }

  write(content, cb) {
    this.content = content;
    cb(true);
  }
}

export class DeviceFile {
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
