export interface SetEchoCommand {
  type: 'setPassthroughCommand',
  data: boolean,
}

export type MetaCommand = SetEchoCommand;
