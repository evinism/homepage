class Keyboard {
  constructor(inpipe) {
    inpipe.subscribe((str, finished) => this.callPending(str, finished));
    this.pending = [];
  }

  callPending(str, finished){
    const toCall = this.pending;
    this.pending = [];
    toCall.forEach(pend => pend(str, finished));
  }

  read (cb) {
    this.pending.push(cb);
  }

  write (content, cb) {
    cb(false);
  }
};

export default Keyboard;