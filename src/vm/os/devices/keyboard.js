class Keyboard {
  constructor(inpipe) {
    this.inpipe = inpipe;
  }

  read (cb) {
    this.inpipe.subscribe(cb);
  }

  write (content, cb) {
    cb(false);
  }
};

export default Keyboard;