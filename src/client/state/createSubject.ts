import { Observer, Observable } from '../domain/Observable';

import { info } from '../helpers/logger';

function createSubject<T>(defaultState: T, subjectName?: string): Observable<T> {
  let currentState: T = { ...defaultState };
  const listeners: { [name: string]: Observer<T> } = {};

  return {
    attach(name, newListener): void {
      info(`Attaching "${name}" to ${subjectName || 'subject'}`);

      listeners[name] = newListener;

      newListener.update(currentState);
    },
    detach(name): void {
      info(`Detaching "${name}" from ${subjectName || 'subject'}`);

      delete listeners[name];
    },
    setState(newState: T): T {
      currentState = newState;

      Object.entries(listeners)
        .forEach(([, listener]: [string, Observer<T>]) => {
          listener.update(currentState);
        });

      return currentState;
    },
    getState(): T {
      return currentState;
    },
  };
}

export default createSubject;
