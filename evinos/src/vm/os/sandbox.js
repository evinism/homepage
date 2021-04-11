const runInSandbox = (source, syscalls, args, env) => {
  if(window.runInSandbox) {
    window.runInSandbox(source, syscalls, args, env);
  } else {
    console.warn('warning: no sandbox available on global scope');
    eval(source);
  }
};

export default runInSandbox;