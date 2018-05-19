export enum Status {
  HALTED,
  RUNNING,
  FINISHED,
};

export enum ProcStatus {
  PENDING,
  RUNNING,
  STOPPED,
};

export enum Err {
  NO_SUCH_FILE,
};

export interface Permissable {
  permissions: string,
  owner: number,
};

export interface Device {
  read: any,
  write: any, // TODO: Fix this stuff.
};

type ReadCB = (string, boolean) => void;
type WriteCB = (boolean) => void;

export interface ReadWritable {
  read: (ReadCB) => void,
  write: (string, WriteCB) => void,
}

export type FolderFile = Permissable;
