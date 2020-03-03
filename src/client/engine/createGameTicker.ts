import { Observable } from '../domain/Observable';
import { GameState } from '../domain/GameState';
import { GameTickHandler } from '../domain/GameTickHandler';

import { info } from '../helpers/logger';

interface GameTicker {
  gameTick: (time: number) => GameState;
  addHandler: (handler: GameTickHandler) => void;
}

function createGameTicker(gameStateSubject: Observable<GameState>): GameTicker {
  let prevTime = 0;
  const handlers: GameTickHandler[] = [];

  return {
    addHandler(handler: GameTickHandler): void {
      info(`Add tick handler ${handler.name}`);

      handlers.push(handler);
    },
    gameTick(time: number): GameState {
      const state = gameStateSubject.getState();

      const newState = handlers
        .reduce((accState, handler) => handler(accState, time, prevTime), state);

      prevTime = time;

      return { ...newState };
    },
  };
}

export default createGameTicker;
