import Folder from './folder';
import { TextFile, DeviceFile } from './file';
import { FolderFile } from './constants';

const noop = () => {};

const makeFS = (entry) => {
  if (entry._isFile) {
    return new TextFile({
      owner: entry.owner,
      permissions: entry.perm,
      content: entry.content,
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

  newFile(newFile, pathStr){
    const path = toPath(pathStr);
    const { folderPath, fileName } = splitPath(path);
    const folder = traversePath(folderPath, this.root);

    if (!(folder instanceof Folder)) {
      throw('lol that aint a folderpath');
    }

    if (folder[fileName]) {
      throw('lol that file exists');
    }

    folder.children[fileName] = newFile;
  }

  writeToFile(cb, contents, pathStr){
    const file = this.getFile(pathStr);
    if (file instanceof Folder) { // TODO: move to typeof guard.
      throw('lol u cant write to a folder');
    }
    file.write(contents, noop);
    cb();
  }

  readFromFile(cb, pathStr) {
    const file = this.getFile(pathStr);
    if (file instanceof Folder) {
      throw('lol u cant read from a folder');
    }
    file.read(cb);
  }

  // TODO: pass back error codes instead
  pathExists(cb, pathStr) {
    try {
      const file = this.getFile(pathStr);
      cb(true);
    } catch (err) {
      cb(false);
    }
  }

  readDirContents(cb, pathStr) {
    const folder = this.getFile(pathStr);
    if (!folder instanceof Folder) {
      throw('lol that a folder');
    }
    cb(Object.keys(folder.children).join('\n'));
  }

  mountDevice(device, pathStr){
    this.newFile(new DeviceFile(device), pathStr);
  }
}

export default FileSystem;