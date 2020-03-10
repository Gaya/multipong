import { GameTickHandler } from '../../domain/GameTickHandler';
import { GameState } from '../../domain/GameState';

import { info } from '../../helpers/logger';
import { Ball } from '../../domain/Ball';
import calcPositionDelta, { distanceByTime } from '../modules/calcPositionDelta';
import playfieldPointsByPlayers from '../modules/playfield';
import intersect from '../modules/intersect';
import { Coordinate, Line } from '../../domain/Coordinate';
import calculateReflectionAngle from '../modules/calculateReflectionAngle';

function randomId(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

type startingDegrees = 30 | 40 | 60 | 120 | 140 | 150 | 210 | 220 | 240 | 300 | 320 | 330;

function randomDeg(): startingDegrees {
  const degrees: startingDegrees[] = [30, 40, 60, 120, 140, 150, 210, 220, 240, 300, 320, 330];
  return degrees[Math.floor(Math.random() * degrees.length)];
}

function calcAngleDegrees(y: number, x: number): number {
  return Math.atan2(y, x) * (180 / Math.PI);
}

function createBallHandler(): GameTickHandler {
  const ballSize = 0.5;
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
        const distance = distanceByTime(time - prevTime, b.speed);

        const { x, y } = calcPositionDelta(distanceByTime(time - prevTime, b.speed), b.angle);

        const newX = b.x + x;
        const newY = b.y - y;

        const { x: x2, y: y2 } = calcPositionDelta(distance + ballSize, b.angle);

        const newXWithPadding = b.x + x2;
        const newYWithPadding = b.y - y2;

        const movementLine: Line = [{ x: b.x, y: b.y }, { x: newXWithPadding, y: newYWithPadding }];

        for (let side = 0; side < playField.length; side += 1) {
          const endPoint = side + 1 === playField.length ? 0 : side + 1;
          const start = playField[side];
          const end = playField[endPoint];
          const collisionLine: Line = [start, end];
          const intersection = intersect(movementLine, collisionLine);

          if (intersection) {
            const newAngle = calculateReflectionAngle(movementLine, collisionLine);

            const { x: x3, y: y3 } = calcPositionDelta(distance, newAngle);

            return {
              ...b,
              x: b.x + x3,
              y: b.y - y3,
              angle: newAngle,
            };
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
