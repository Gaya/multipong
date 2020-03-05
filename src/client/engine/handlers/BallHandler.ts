import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

import { info } from '../../helpers/logger';

function randomId(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

type startingDegrees = 30 | 45 | 60 | 120 | 135 | 150 | 210 | 225 | 240 | 300 | 315 | 330;

function randomDeg(): startingDegrees {
  const degrees: startingDegrees[] = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];
  return degrees[Math.round(Math.random() * degrees.length)];
}

function createBallHandler(): GameTickHandler {
  return function ballHandler(state: GameState, time: number): GameState {
    if (state.started && state.balls.length === 0) {
      info('Create ball');

      return {
        ...state,
        started: true,
        balls: [
          {
            angle: randomDeg(),
            id: randomId(),
            speed: 0,
            x: 50,
            y: 50,
          },
        ],
      };
    }
    return { ...state, time };
  };
}

export default createBallHandler;
