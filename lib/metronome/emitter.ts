export type Listener<T> = (data: T) => void;

export class Emitter<T> {
  private listeners: Set<Listener<T>> = new Set();

  subscribe(callback: Listener<T>): void {
    this.listeners.add(callback);
  }

  unsubscribe(callback: Listener<T>): void {
    this.listeners.delete(callback);
  }

  emit(data: T): void {
    this.listeners.forEach((callback) => callback(data));
  }
}

// Convenience type alias for beat notifications
export type BeatCallback = Listener<number>;
export type BeatNotifier = Emitter<number>;
