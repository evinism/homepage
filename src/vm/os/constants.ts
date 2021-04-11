export enum Status {
  HALTED,
  RUNNING,
  FINISHED = 3,
};

export enum ProcStatus {
  PENDING,
  RUNNING,
  STOPPED,
};

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
};

export interface Permissable {
  permissions: string,
  owner: number,
};

export interface Device {
  read: any,
  write: any, // TODO: Fix this stuff.
  ioctl: any,
};

type ReadCB = (string, boolean) => void;
type WriteCB = (boolean) => void;

export interface ReadWritable {
  read: (ReadCB) => void,
  write: (string, WriteCB) => void,
}

export type FolderFile = Permissable;
