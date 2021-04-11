import Folder from "./folder";
import { TextFile, DeviceFile } from "./file";
import { FolderFile, Err, Device } from "./constants";

export const validIdentifier = (name: string) => /^[^*/\\?"<>\|]+$/.test(name);

const noop = (...args: any[]) => {};

const makeFS = (entry) => {
  if (entry._isFile) {
    return new TextFile({
      owner: entry.owner,
      permissions: entry.perm,
      suid: entry.suid,
      data: entry.data,
    });
  } else {
    const children = Object.entries(entry.children).reduce(
      (acc, [key, value]) => Object.assign(acc, { [key]: makeFS(value) }),
      {}
    );

    return new Folder({
      owner: entry.owner,
      permissions: entry.perm,
      children,
    });
  }
};

// TODO: error handling / not allowing extraneous stuff.
const toPath = (pathStr: string) => {
  if (pathStr[0] !== "/") {
    throw "lol gimme a real path";
  }

  pathStr = pathStr.substr(1);
  const path = pathStr.split("/");
  if (path[path.length - 1] === "") {
    path.pop();
  }
  return path;
};

// TODO: error handling
// (path, origin) => file?
const traversePath = (path: string[], origin) => {
  const file = path.reduce((acc, cur) => {
    if (!acc) {
      return null;
    }
    return acc.children[cur];
  }, origin);
  if (!file) {
    return null;
  }

  return file;
};

const splitPath = (path: string[]) => {
  const folderPath = path.slice(0, -1);
  return {
    fileName: path.slice(-1)[0],
    folderPath: folderPath,
  };
};

class FileSystem {
  root: FolderFile;

  constructor(fsSnapshot) {
    this.root = makeFS(fsSnapshot);
  }

  getFolderFile(pathStr: string) {
    return traversePath(toPath(pathStr), this.root);
  }

  mountFolderFile(file: FolderFile, pathStr: string, cb = noop) {
    const path = toPath(pathStr);
    const { folderPath, fileName } = splitPath(path);

    if (!validIdentifier(fileName)) {
      cb(Err.EBADFNAME);
      return;
    }

    const folder = traversePath(folderPath, this.root);

    if (!(folder instanceof Folder)) {
      cb(Err.ENOFOLDER);
      return;
    }

    if (folder.children[fileName]) {
      cb(Err.EFILEEXISTS);
      return;
    }

    folder.children[fileName] = file;
    cb(Err.NONE);
  }

  makeDir(pathStr: string, owner: number, cb) {
    this.mountFolderFile(
      new Folder({
        owner,
        permissions: "64",
        children: [],
      }),
      pathStr,
      cb
    );
  }

  newTextFile(
    data: string,
    pathStr: string,
    owner: number,
    cb: (err: Err) => void
  ) {
    this.mountFolderFile(
      new TextFile({
        owner,
        permissions: "64",
        data,
      }),
      pathStr,
      cb
    );
  }

  removeFolder(pathStr: string, cb: (err: Err) => void) {
    const path = toPath(pathStr);
    const { folderPath, fileName: childFolderName } = splitPath(path);
    const parentFolder = traversePath(folderPath, this.root);
    if (!parentFolder) {
      cb(Err.ENOFOLDER);
      return;
    }
    const childFolder = traversePath([childFolderName], parentFolder);
    if (!childFolder) {
      cb(Err.ENOFOLDER);
      return;
    }
    if (!(childFolder instanceof Folder)) {
      cb(Err.ENOTFOLDER);
      return;
    }
    delete parentFolder.children[childFolderName];
    cb(Err.NONE);
  }

  removeFile(pathStr: string, cb: (err: Err) => void) {
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

  writeToFile(data: string, pathStr: string, cb: (err: Err) => void) {
    const file = this.getFolderFile(pathStr);
    if (file instanceof Folder) {
      // TODO: move to typeof guard.
      cb(Err.ENOTFILE);
    }
    file.write(data, noop);
    cb(Err.NONE);
  }

  readFileMetadata(pathStr: string, cb: (err: Err, data: any) => void) {
    const file = this.getFolderFile(pathStr);
    if (file === null) {
      cb(Err.ENOFILE, null);
    } else {
      cb(Err.NONE, {
        owner: file.owner,
        permissions: file.permissions,
        suid: file.suid === true,
      });
    }
  }

  readFromFile(
    pathStr: string,
    cb: (err: Err, data: string, eof: boolean) => void
  ) {
    const file = this.getFolderFile(pathStr);
    if (file === null) {
      cb(Err.ENOFILE, "", true);
    } else if (file instanceof Folder) {
      cb(Err.ENOTFILE, "", true);
    } else {
      file.read((err, data, eof) => cb(err, data, eof));
    }
  }

  // TODO: pass back error codes instead
  pathExists(pathStr: string, cb: (exists: boolean) => void) {
    const file = this.getFolderFile(pathStr);
    if (file) {
      cb(true);
    } else {
      cb(false);
    }
  }

  ensureFolder(pathStr: string, cb: (err: Err) => void) {
    const file = this.getFolderFile(pathStr);
    if (!file) {
      cb(Err.ENOFOLDER);
    } else if (!(file instanceof Folder)) {
      cb(Err.ENOTFOLDER);
    } else {
      cb(Err.NONE);
    }
  }

  readDirContents(pathStr: string, cb: (err: Err, entries: string) => void) {
    this.pathExists(pathStr, (exists) => {
      if (!exists) {
        cb(Err.ENOFILE, "");
        return;
      }
      const folder = this.getFolderFile(pathStr);
      if (!(folder instanceof Folder)) {
        cb(Err.ENOTFOLDER, "");
      } else {
        cb(Err.NONE, Object.keys(folder.children).join("\n"));
      }
    });
  }

  mountDevice(device: Device, pathStr: string) {
    this.mountFolderFile(new DeviceFile(device), pathStr);
  }
}

export default FileSystem;
