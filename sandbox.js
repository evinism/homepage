(function(){
  function only(definedItems){
    return new Proxy({}, {
      has: (_, prop) => { return !definedItems.includes(prop) },
      get: (_, prop) => { 
        if (prop !== Symbol.unscopables) {
          throw('referencing undefined variable ' + prop.toString());
        }
      },
      set: (_, prop) => { throw('referencing undefined variable' + prop.toString()); },
    });
  }

  window.runInSandbox = function(source, syscalls, args, env) {
    with(only(['source', 'syscalls', 'eval', 'args', 'env', Symbol.unscopables])) {
      eval(source);
    }
  };
})();