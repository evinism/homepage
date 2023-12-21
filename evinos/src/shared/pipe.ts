class Pipe<T> {
  subscribers = [];

  fire (arg : T) {
    this.subscribers.forEach(subscriber => {
      subscriber(arg);
    });
  }
 
  subscribe(subscriber: (arg: T) => any) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(toUnsubscribe: (arg: T) => any) {
    this.subscribers = this.subscribers.filter(
      subscriber => subscriber !== toUnsubscribe
    )
  }
}

export default Pipe;
