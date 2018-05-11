class Keyboard {
  constructor(inpipe) {
    inpipe.subscribe((code, ctrl) => this.preprocess(code, ctrl));
    this.pending = [];
  }

  preprocess(native) {
    const keyCode = native.which || native.keyCode;
    console.log(keyCode);
    let toSend;
    let eof = false;
    switch(keyCode){
      case 13:
        toSend = "\n";
        break;
      default: 
        toSend = String.fromCharCode(native.which || native.keyCode);
    }
    if(toSend) {
      this.callPending(toSend, eof);
    }
  };

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