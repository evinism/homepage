class Screen {
  constructor(outpipe) {
    this.outpipe = outpipe;
  }

  read (cb) {
    cb('', true);
  }

  write (content, cb) {
    this.outpipe.fire(content);
    cb(true);
  }
};

export default Screen;