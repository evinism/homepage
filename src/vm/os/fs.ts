import Folder from './folder';
import { TextFile, DeviceFile } from './file';
import { FolderFile, Err } from './constants';

const noop = (...args) => {};

const makeFS = (entry) => {
  if (entry._isFile) {
    return new TextFile({
      owner: entry.owner,
      permissions: entry.perm,
      suid: entry.suid,
      data: entry.data,
    });
  } else {
    const children = Object
      .entries(entry.children)
      .reduce((acc, [key, value]) => 
        Object.assign(acc, { [key]: makeFS(value) })
      , {});

    return new Folder({
      owner: entry.owner,
      permissions: entry.perm,
      children,
    });
  }
}

// TODO: error handling / not allowing extraneous stuff.
const toPath = pathStr => {
  if(pathStr[0] !== '/') {
    throw('lol gimme a real path');
  }

  pathStr = pathStr.substr(1);
  const path = pathStr.split('/');
  if (path[path.length - 1] === '') {
    path.pop();
  }
  return path;
}

// TODO: error handling
// (path, origin) => file?
const traversePath = (path, origin) => {
  const file = path.reduce(
    (acc, cur) => {
      if (!acc) {
        return null;
      }
      return (acc.children[cur])
    },
    origin,
  );
  if (!file) {
    return null;
  }
  
  return file;
};

const splitPath = (path) => {
  const folderPath = path.slice(0, -1);
  return {
    fileName: path.slice(-1)[0],
    folderPath: folderPath,
  }
};

class FileSystem {
  root : FolderFile;

  constructor (fsSnapshot) {
    this.root = makeFS(fsSnapshot);
  }

  getFile(pathStr) {
    return traversePath(toPath(pathStr), this.root);
  }

  mountFile(file, pathStr, cb = noop){
    const path = toPath(pathStr);
    const { folderPath, fileName } = splitPath(path);
    const folder = traversePath(folderPath, this.root);

    if (!(folder instanceof Folder)) {
      cb(Err.ENOFOLDER);
      return;
    }
    
    if (folder[fileName]) {
      cb(Err.EFILEEXISTS);
      return;
    }

    folder.children[fileName] = file;
    cb(Err.NONE);
  }

  newTextFile(data, path, owner, cb){
    this.mountFile(
      new TextFile({
        // TODO: Fix this
        owner: 0,
        permissions: '64',
        data,
      }),
      path,
      cb,
    );
  }

  removeFile(pathStr, cb : (Err) => void){
    const path = toPath(pathStr);
    const { folderPath, fileName } = splitPath(path);
    const folder = traversePath(folderPath, this.root);
    if (!folder) {
      cb(Err.ENOFILE);
      return;
    }
    const file = traversePath([fileName], folder);
    if (!file) {
      cb(Err.ENOFILE);
      return;
    }
    if (file instanceof Folder) {
      cb(Err.ENOTFILE);
      return;
    }
    delete folder.children[fileName];
    cb(Err.NONE);
  }

  writeToFile(data : string, pathStr : string, cb : (Err) => void){
    const file = this.getFile(pathStr);
    if (file instanceof Folder) { // TODO: move to typeof guard.
      cb(Err.ENOTFILE);
    }
    file.write(data, noop);
    cb(Err.NONE);
  }

  readFileMetadata(pathStr: string, cb){
    const file = this.getFile(pathStr);
    if (file === null) {
      cb(null, Err.ENOFILE);
    } else {
      cb({
        owner: file.owner,
        permissions: file.permissions,
        suid: file.suid === true,
      });
    }
  };

  readFromFile(pathStr : string, cb: (string, bool, Err) => void) {
    const file = this.getFile(pathStr);
    if (file === null) {
      cb('', true, Err.ENOFILE);
    } else if (file instanceof Folder) {
      cb('', true, Err.ENOTFILE);
    } else {
      file.read((data, eof) => cb(data, eof, Err.NONE));
    }
  }

  // TODO: pass back error codes instead
  pathExists(pathStr, cb : (bool) => void) {
    const file = this.getFile(pathStr);
    if (file) {
      cb(true);
    } else {
      cb(false);
    }
  }

  ensureFolder(pathStr, cb : (Err) => void) {
    const file = this.getFile(pathStr);
    if (!file) {
      cb(Err.ENOFOLDER);
    } else if(!(file instanceof Folder)) {
      cb(Err.ENOTFOLDER);
    } else {
      cb(Err.NONE);
    }
  }

  readDirContents(pathStr, cb : (string, Err) => void) {
    this.pathExists(pathStr, (exists) => {
      if (!exists) {
        cb('', Err.ENOFILE);
        return;
      }
      const folder = this.getFile(pathStr);
      if (!(folder instanceof Folder)) {
        cb('', Err.ENOTFOLDER)
      } else {
        cb(Object.keys(folder.children).join('\n'), Err.NONE);
      }
    });

  }

  mountDevice(device, pathStr){
    this.mountFile(new DeviceFile(device), pathStr);
  }
}

export default FileSystem;