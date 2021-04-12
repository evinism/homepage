export enum Status {
  HALTED,
  RUNNING,
  FINISHED = 3,
}

export enum ProcStatus {
  PENDING,
  RUNNING,
  STOPPED,
}

export enum Err {
  NONE = 0,
  ENOFILE = 1,
  ENOFOLDER = 2,
  ENOTFILE = 3,
  ENOTFOLDER = 4,
  EFILEEXISTS = 5,
  EPERM = 6,
  EBADFD = 7,
  EUNWRITABLE = 8,
  EBADFNAME = 9,
  ENOTDEVICE = 10,
  EVALIDATION = 11,
}

export interface FolderFile {
  permissions: string;
  owner: number;
}

export type ReadCB = (err: Err, data: string, eof?: boolean) => void;
export type WriteCB = (err: Err) => void;

export interface ReadWritable {
  read(cb: ReadCB): void;
  write(data: string, cb: WriteCB): void;
}

export interface File extends FolderFile, ReadWritable {}

export interface Device<T = any> extends ReadWritable {
  ioctl(data: T, cb: WriteCB): void;
}
