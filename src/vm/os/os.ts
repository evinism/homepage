import Filesystem from './fs';
import Process from './process';
import User from './user';
import { Status } from './constants';
import FileSystem from './fs';

const motd = `
---------
Evin Sellin's homepage
Try poking around the filesystem!

WARNING: This is very much still a work in progress.
---------
`

const NOOP = () => {};

// TODO: There's probably a better place for this
function makeUserFromEntry(userStr){
  const params = userStr.split(':');
  if(params.length < 3) {
    return;
  }
  const [name, password, id] = params;
  return new User(name, password, parseInt(id, 10));
}

class OS {
  status : Status = Status.HALTED;
  processes : Array<Process> = [];
  users : Array<User> = [];
  cwd = '/';
  filesystem : FileSystem = undefined;

  env = {
    path: '/bin/',
    motd,
  };

  version(){
    return '0.0.1';
  }

  initFS(fs){
    this.filesystem = new Filesystem(fs);
  }

  initUsers(cb){
    this.filesystem.readFromFile(
      '/etc/passwd',
      passwd => {
        this.users = 
          passwd.split('\n').map(makeUserFromEntry);
        cb();
      }
    );
  };

  // Should probs move this to other things here.
  execProcess(pathStr, args, wd, user, onTerminate) {
    this.filesystem.readFileMetadata(pathStr, ({suid, owner}) => {
      this.filesystem.readFromFile(
        pathStr,
        (content) => {
          let activeUser = user;
          if (suid) {
            activeUser = this.users.find(
              user => user.id === owner
            );
            if(!activeUser) {
              console.log('aaaa noa ctive user');
              activeUser = user;
            }
          }
          const proc = new Process(
            activeUser,
            this,
            content,
            onTerminate,
            this.env,
            wd,
            args || [],
          );
          proc.start();
        }
      );
    })

  }

  systemShutdown(){
    this.filesystem.writeToFile('\nGoodbye!', '/dev/screen', NOOP);
    this.status = Status.FINISHED;
  }

  start () {
    // TODO: This start function should be the one initializing the FS
    // Not the bootstrapper
    this.initUsers(() =>{
      const webUser = this.users.find(user => user.id === 1);
      this.status = Status.RUNNING;
      this.execProcess(
        '/bin/sh',
        [],
        '/users/web/',
        webUser,
        () => this.systemShutdown()
      );
    });
  }
};

export default OS;