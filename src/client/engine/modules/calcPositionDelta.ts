import { Coordinate } from '../../domain/Coordinate';

import toFixed from './toFixed';

export function distanceByTime(timePassed: number, speed: number): number {
  return ((timePassed / 20) * speed);
}

function coordinatesBasedAngle(angle: number, a: number, b: number): Coordinate {
  const axis = Math.ceil((angle + 1) / 90) % 4;

  switch (axis) {
    case 0:
      return {
        x: a,
        y: b * -1 || 0,
      };
    case 3:
      return {
        x: b * -1 || 0,
        y: a * -1 || 0,
      };
    case 2:
      return {
        x: a * -1 || 0,
        y: b,
      };
    case 1:
    default:
      return {
        x: b,
        y: a,
      };
  }
}

function calcPositionDelta(c: number, angle: number): Coordinate {
  const calcAngle = angle % 90;
  const a = c * Math.sin(calcAngle * (Math.PI / 180));
  const b = Math.sqrt(c ** 2 - a ** 2);

  const delta = coordinatesBasedAngle(angle, a, b);

  return {
    x: toFixed(delta.x),
    y: toFixed(delta.y),
  };
}

export default calcPositionDelta;
