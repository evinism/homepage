export interface AuthCommand {
  type: 'authCommand';
  subcommand: 'login' | 'logout';
}

export type BrowserCommand = AuthCommand;
