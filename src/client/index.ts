import { GameState } from './domain/GameState';

import initialiseRendering from './render/initialiseRendering';
import createSubject from './state/createSubject';
import createGame from './engine/createGame';

const gameStateSubject = createSubject<GameState>({
  enemies: [],
  started: false,
  time: 0,
}, 'GameState');
const game = createGame(gameStateSubject);

initialiseRendering(gameStateSubject);

function tick(time: number): void {
  gameStateSubject.setState(game.tick(time));

  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
