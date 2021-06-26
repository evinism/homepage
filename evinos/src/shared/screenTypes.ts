export interface AppendCommand {
  type: 'appendCommand',
  data: string
}

export interface RemoveCommand {
  type: 'removeCommand',
  amount: number,
}

export interface ClearCommand {
  type: 'clearCommand',
}

export interface OffCommand {
  type: 'offCommand',
}

export interface ColorCommand {
  type: 'colorCommand';
  color: string;
}

export type ScreenCommand = AppendCommand | RemoveCommand | ClearCommand | OffCommand | ColorCommand;
