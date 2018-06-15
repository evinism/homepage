export interface SetEchoCommand {
  type: 'setEchoCommand',
  data: boolean,
}

export type MetaCommand = SetEchoCommand;
