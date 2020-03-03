import { GameState } from '../domain/GameState';
import { Observable } from '../domain/Observable';

import { info } from '../helpers/logger';

import createGameTicker from './createGameTicker';

import createTimeHandler from './handlers/TimeHandler';
import createPlayerHandler from './handlers/PlayerHandler';

interface Game {
  tick: (time: number) => GameState;
}

function createGame(gameStateSubject: Observable<GameState>): Game {
  info('Setting up game');

  const ticker = createGameTicker(gameStateSubject);

  ticker.addHandler(createTimeHandler());
  ticker.addHandler(createPlayerHandler());

  return {
    tick: ticker.gameTick,
  };
}

export default createGame;
