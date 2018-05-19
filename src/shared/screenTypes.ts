export interface AppendCommand {
  type: 'appendCommand',
  content: string
}

export interface RemoveCommand {
  type: 'removeCommand',
  amount: number,
}

export interface ClearCommand {
  type: 'clearCommand',
}

export type ScreenCommand = AppendCommand | RemoveCommand | ClearCommand;
