(function(){
  function only(definedItems){
    return new Proxy({}, {
      has: (_, prop) => { return !definedItems.includes(prop) },
      get: (_, prop) => { 
        if (prop !== Symbol.unscopables) {
          return undefined;
        }
      },
      set: (_, prop) => { throw('setting undefined variable ' + prop.toString()); },
    });
  }

  window.runInSandbox = function(source, syscalls, args, env) {
    const closure = [
      'source',
      'syscalls',
      'eval',
      'args',
      'env',
      Symbol.unscopables,
       // for userspace MD5, grumble...
       // at this rate i might just make a crypto syscall.
      'encodeURIComponent',
      'unescape',
      'String',
    ];

    with(only(closure)) {(function(){
        eval(source);
    })();}
  };
})();