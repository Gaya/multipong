import { Observer, Observable } from '../domain/Observable';

import { info } from '../helpers/logger';

function createSubject<T>(defaultState: T): Observable<T> {
  let currentState: T = { ...defaultState };
  const listeners: { [name: string]: Observer<T> } = {};

  return {
    attach(name, newListener): void {
      info(`Attaching "${name}"`);

      listeners[name] = newListener;

      newListener.update(currentState);
    },
    detach(name): void {
      info(`Detaching "${name}"`);

      delete listeners[name];
    },
    setState(newState: T): T {
      currentState = newState;

      Object.entries(listeners)
        .forEach(([, listener]: [string, Observer<T>]) => {
          listener.update(newState);
        });

      return newState;
    },
  };
}

export default createSubject;
