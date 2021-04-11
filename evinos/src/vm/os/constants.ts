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

export interface Permissable {
  permissions: string;
  owner: number;
}

export interface Device {
  read: any;
  write: any; // TODO: Fix this stuff.
  ioctl: any;
}

type ReadCB = (data: string, eof: boolean) => void;
type WriteCB = () => void;

export interface ReadWritable {
  read(cb: ReadCB): void;
  write(data: string, cb: WriteCB): void;
}

export type FolderFile = Permissable;
export type File = FolderFile & ReadWritable;
