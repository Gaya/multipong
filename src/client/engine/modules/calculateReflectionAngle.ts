import { Line } from '../../domain/Coordinate';
import toFixed from './toFixed';

export function toDegrees(degrees: number): number {
  if (degrees < 0) {
    return toDegrees(360 + degrees);
  }

  if (degrees > 360) {
    return toDegrees(degrees % 360);
  }

  return degrees || 0;
}

export function calcAngleDegrees([start, end]: Line): number {
  const y = (end.y - start.y) * -1;
  const x = end.x - start.x;

  return toDegrees(Math.atan2(y, x) * (180 / Math.PI));
}

function calculateReflectionAngle(movementLine: Line, collisionLine: Line): number {
  const movementLineAngle = calcAngleDegrees(movementLine);
  const collisionLineAngle = calcAngleDegrees(collisionLine);

  const fromTop = collisionLineAngle > movementLineAngle;

  const intersectAngle = toDegrees(
    fromTop
      ? collisionLineAngle - movementLineAngle
      : movementLineAngle - collisionLineAngle,
  );

  return toDegrees(toFixed(collisionLineAngle + (fromTop ? intersectAngle : intersectAngle * -1)));
}

export default calculateReflectionAngle;
