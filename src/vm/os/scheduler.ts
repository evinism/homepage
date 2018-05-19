class Scheduler {
  processes = [];
  halted = false;

  runScheduled(){
    if (processes.length === 0) {
      alert('nope, done!');
      halted = true;
    }
  }
}