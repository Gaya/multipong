export interface Observer<T> {
  update: (newState: T) => void;
}

export interface Observable<T> {
  currentState: T;
  listeners: { [name: string]: Observer<T> };
  setState: (newState: T) => T;
  attach: (name: string, listener: Observer<T>) => void;
  detach: (name: string) => void;
}
