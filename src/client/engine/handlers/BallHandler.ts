import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

import { info } from '../../helpers/logger';
import { Ball } from '../../domain/Ball';
import calcPositionDelta, { distanceByTime } from '../modules/calcPositionDelta';
import playfieldPointsByPlayers from '../modules/playfield';
import intersect from '../modules/intersect';
import { Coordinate, Line } from '../../domain/Coordinate';

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
  let currentPlayers = 0;
  let playField = playfieldPointsByPlayers(currentPlayers);

  return function ballHandler(state: GameState, time: number, prevTime: number): GameState {
    if (currentPlayers !== state.enemies.length + 1) {
      currentPlayers = state.enemies.length + 1;
      playField = playfieldPointsByPlayers(currentPlayers);
    }

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

        const movementLine: Line = [{ x: b.x, y: b.y }, { x: newX, y: newY }];

        for (let side = 0; side < playField.length; side += 1) {
          const endPoint = side + 1 === playField.length ? 0 : side + 1;
          const start = playField[side];
          const end = playField[endPoint];
          const sideLine: Line = [start, end];

          if (intersect(movementLine, sideLine)) {
            debugger;
          }
        }

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
