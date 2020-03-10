import { Line } from '../../domain/Coordinate';
import toFixed from './toFixed';

function calcAngleDegrees(y: number, x: number): number {
  return Math.atan2(y, x) * (180 / Math.PI);
}

function toDegrees(degrees: number): number {
  if (degrees < 0) {
    return toDegrees(360 + degrees);
  }

  if (degrees > 360) {
    return toDegrees(360 - degrees);
  }

  return degrees;
}

function calculateReflectionAngle(movementLine: Line, collisionLine: Line): number {
  const movementLineAngle = toDegrees(calcAngleDegrees(
    movementLine[1].y - movementLine[0].y,
    movementLine[1].x - movementLine[0].x,
  ));

  const collisionLineAngle = toDegrees(calcAngleDegrees(
    collisionLine[1].y - collisionLine[0].y,
    collisionLine[1].x - collisionLine[0].x,
  )) % 180;

  const intersectAngle = toDegrees(collisionLineAngle - movementLineAngle);

  return toDegrees(toFixed(collisionLineAngle + intersectAngle));
}

export default calculateReflectionAngle;
