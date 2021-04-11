export interface SetPassthroughCommand {
  type: 'setPassthroughCommand',
  data: boolean,
}

export interface SetEchoCommand {
  type: 'setEchoCommand',
  data: boolean,
}

export type MetaCommand = SetPassthroughCommand | SetEchoCommand;
