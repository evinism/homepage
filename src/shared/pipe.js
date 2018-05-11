class Pipe {
  subscribers = [];

  fire(...args) {
    this.subscribers.forEach(subscriber => {
      subscriber(...args);
    });
  }
 
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(toUnsubscribe) {
    this.subscribers = this.subscribers.filter(
      subscriber => subscriber !== toUnsubscribe
    )
  }
}

export default Pipe;
