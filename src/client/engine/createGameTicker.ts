import { Observable } from '../domain/Observable';
import { GameState } from '../domain/GameState';
import { GameTickHandler } from '../domain/GameTickHandler';

import { info } from '../helpers/logger';

interface GameTicker {
  gameTick: (time: number) => GameState;
  addHandler: (handler: GameTickHandler) => void;
}

function createGameTicker(gameStateSubject: Observable<GameState>): GameTicker {
  const handlers: GameTickHandler[] = [];

  return {
    addHandler(handler: GameTickHandler): void {
      info(`Add tick handler ${handler.name}`);

      handlers.push(handler);
    },
    gameTick(time: number): GameState {
      const state = gameStateSubject.getState();

      const newState = handlers.reduce((accState, handler) => handler(time, accState), state);

      return { ...newState };
    },
  };
}

export default createGameTicker;
