class Pipe<T> {
  subscribers = [];

  fire (arg : T) {
    this.subscribers.forEach(subscriber => {
      subscriber(arg);
    });
  }
 
  subscribe(subscriber : (T) => any) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(toUnsubscribe : (T) => any) {
    this.subscribers = this.subscribers.filter(
      subscriber => subscriber !== toUnsubscribe
    )
  }
}

export default Pipe;
