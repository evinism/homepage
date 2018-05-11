import Folder from './folder';
import { TextFile, DeviceFile } from './file';

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
const traversePath = (folderPath, origin) => folderPath.reduce(
  (acc, cur) => (acc.children[cur]),
  origin,
);

const splitPath = (path) => {
  const folderPath = path.slice(0, -1);
  return {
    fileName: path.slice(-1)[0],
    folderPath: folderPath,
  }
};

class FileSystem {
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

  writeToFile(contents, pathStr){
    const file = this.getFile(pathStr);
    if (file instanceof Folder) {
      throw('lol u cant write to a file');
    }
    file.write(contents, noop);
  }

  mountDevice(device, pathStr){
    this.newFile(new DeviceFile(device), pathStr);
  }
}

export default FileSystem;