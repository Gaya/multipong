import { GameState } from '../domain/GameState';
import { Observable } from '../domain/Observable';

import { info } from '../helpers/logger';

import createGameTicker from './createGameTicker';

import createTimeHandler from './handlers/TimeHandler';
import createPlayerHandler from './handlers/PlayerHandler';
import createInputHandler from './handlers/InputHandler';
import createBallHandler from './handlers/BallHandler';

interface Game {
  tick: (time: number) => GameState;
}

function createGame(gameStateSubject: Observable<GameState>): Game {
  info('Setting up game');

  const ticker = createGameTicker(gameStateSubject);

  ticker.addHandler(createInputHandler());
  ticker.addHandler(createTimeHandler());
  ticker.addHandler(createPlayerHandler());
  ticker.addHandler(createBallHandler());

  return {
    tick: ticker.gameTick,
  };
}

export default createGame;
