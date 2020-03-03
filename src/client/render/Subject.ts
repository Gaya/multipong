import { RenderListener, RenderSubject } from '../domain/RenderObservable';
import { GameState } from '../domain/GameState';

import { info } from '../helpers/logger';

const defaultState = {
  started: false,
};

function createRenderSubject(): RenderSubject {
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
    setState(newState): GameState {
      this.currentState = newState;

      Object.entries(this.listeners)
        .forEach(([, listener]: [string, RenderListener]) => {
          listener.update(newState);
        });

      return newState;
    },
  };
}

export default createRenderSubject;
