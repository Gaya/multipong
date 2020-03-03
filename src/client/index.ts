import { GameState } from './domain/GameState';

import initializeRendering from './render/initializeRendering';
import createSubject from './state/createSubject';

const gameStateSubject = createSubject<GameState>({
  started: false,
  time: 0,
});

initializeRendering(gameStateSubject);

function tick(time: number): void {
  gameStateSubject.setState({
    started: true,
    time,
  });

  window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);
