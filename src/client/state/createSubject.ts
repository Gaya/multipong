import { Observer, Observable } from '../domain/Observable';

import { info } from '../helpers/logger';

function createSubject<T>(defaultState: T): Observable<T> {
  return {
    currentState: { ...defaultState },
    listeners: {},
    attach(name, newListener): void {
      info(`Attaching "${name}"`);

      this.listeners[name] = newListener;
      newListener.update(this.currentState);
    },
    detach(name): void {
      info(`Detaching "${name}"`);

      delete this.listeners[name];
    },
    setState(newState): T {
      this.currentState = newState;

      Object.entries(this.listeners)
        .forEach(([, listener]: [string, Observer<T>]) => {
          listener.update(newState);
        });

      return newState;
    },
  };
}

export default createSubject;
