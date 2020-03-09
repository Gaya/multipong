import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

import { info } from '../../helpers/logger';
import { Ball } from '../../domain/Ball';
import calcPositionDelta, { distanceByTime } from '../modules/calcPositionDelta';

function randomId(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

type startingDegrees = 30 | 45 | 60 | 120 | 135 | 150 | 210 | 225 | 240 | 300 | 315 | 330;

function randomDeg(): startingDegrees {
  const degrees: startingDegrees[] = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330];
  return degrees[Math.floor(Math.random() * degrees.length)];
}

function createBallHandler(): GameTickHandler {
  return function ballHandler(state: GameState, time: number, prevTime: number): GameState {
    if (state.started && state.balls.length === 0) {
      info('Create ball');

      return {
        ...state,
        balls: [
          {
            angle: randomDeg(),
            id: randomId(),
            speed: 1,
            x: 50,
            y: 50,
          },
        ],
      };
    }

    if (state.balls.length > 0) {
      const balls: Ball[] = state.balls.map((b) => {
        const { x, y } = calcPositionDelta(distanceByTime(time - prevTime, b.speed), b.angle);
        const newX = b.x + x;
        const newY = b.y - y;

        // @todo check for collision

        return {
          ...b,
          x: newX,
          y: newY,
        };
      });

      return {
        ...state,
        balls,
      };
    }

    return { ...state };
  };
}

export default createBallHandler;
