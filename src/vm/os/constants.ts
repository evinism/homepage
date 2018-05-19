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

export interface ReadWritable {
  read: any,
  write: any, // TODO: Fix this stuff.
};

export type Device = ReadWritable;
export type FolderFile = Permissable;
