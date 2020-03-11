import { Line } from '../src/client/domain/Coordinate';

import calculateReflectionAngle, {
  calcAngleDegrees,
  toDegrees,
} from '../src/client/engine/modules/calculateReflectionAngle';

describe('toDegrees', () => {
  it('Leaves regular degrees intact', () => {
    expect(toDegrees(200)).toEqual(200);
  });

  it('Convert negative degrees', () => {
    expect(toDegrees(-45)).toEqual(315);
    expect(toDegrees(-450)).toEqual(270);
  });

  it('Convert too high degrees', () => {
    expect(toDegrees(450)).toEqual(90);
    expect(toDegrees(810)).toEqual(90);
  });
});

describe('calcAngleDegrees', () => {
  it('Calculates angle of flat line from left to right', () => {
    const line: Line = [{ x: -3, y: 3 }, { x: 3, y: 3 }];
    expect(calcAngleDegrees(line)).toEqual(0);
  });

  it('Calculates angle of line from bottom to top right', () => {
    const line: Line = [{ x: 3, y: -3 }, { x: 7, y: 1 }];
    expect(calcAngleDegrees(line)).toEqual(45);
  });

  it('Calculates angle of line from bottom to top', () => {
    const line: Line = [{ x: 3, y: -3 }, { x: 3, y: 1 }];
    expect(calcAngleDegrees(line)).toEqual(90);
  });

  it('Calculates angle of line from bottom to top left', () => {
    const line: Line = [{ x: 3, y: -3 }, { x: -3, y: 3 }];
    expect(calcAngleDegrees(line)).toEqual(135);
  });

  it('Calculates angle of flat line from right to left', () => {
    const line: Line = [{ x: 3, y: 3 }, { x: -3, y: 3 }];
    expect(calcAngleDegrees(line)).toEqual(180);
  });

  it('Calculates angle of flat line from top to bottom left', () => {
    const line: Line = [{ x: -3, y: 3 }, { x: -5, y: 1 }];
    expect(calcAngleDegrees(line)).toEqual(225);
  });

  it('Calculates angle of flat line from top to bottom', () => {
    const line: Line = [{ x: 3, y: 3 }, { x: 3, y: 1 }];
    expect(calcAngleDegrees(line)).toEqual(270);
  });

  it('Calculates angle of flat line from top to bottom right', () => {
    const line: Line = [{ x: 3, y: 3 }, { x: 5, y: 1 }];
    expect(calcAngleDegrees(line)).toEqual(315);
  });
});

describe('calculateReflectionAngle', () => {
  it('Should correctly calculate a slight angle', () => {
    const movementLine: Line = [{ x: 0, y: 4 }, { x: 10, y: 4 }];
    const collisionLine: Line = [{ x: 0, y: 0 }, { x: 10, y: 3.64 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(40);
  });

  it('Should correctly calculate a straight angle', () => {
    const movementLine: Line = [{ x: -3, y: 2 }, { x: 3, y: 2 }];
    const collisionLine: Line = [{ x: -10, y: -10 }, { x: 10, y: 10 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(90);
  });

  it('Should correctly calculate a straight angle from the other side', () => {
    const movementLine: Line = [{ x: 3, y: 2 }, { x: -3, y: 2 }];
    const collisionLine: Line = [{ x: -10, y: -10 }, { x: 10, y: 10 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(270);
  });

  it('Should correctly calculate a straight angle on a flat surface', () => {
    const movementLine: Line = [{ x: -3, y: 3 }, { x: 3, y: -3 }];
    const collisionLine: Line = [{ x: -5, y: 0 }, { x: 5, y: 0 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(45);
  });

  it('Should correctly calculate a straight angle on a flat surface movement from other side', () => {
    const movementLine: Line = [{ x: 3, y: 3 }, { x: -3, y: -3 }];
    const collisionLine: Line = [{ x: -5, y: 0 }, { x: 5, y: 0 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(135);
  });

  it('Should correctly calculate a straight angle on a flat surface is flipped', () => {
    const movementLine: Line = [{ x: -3, y: 3 }, { x: 3, y: -3 }];
    const collisionLine: Line = [{ x: 5, y: 0 }, { x: -5, y: 0 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(45);
  });

  it('Should correctly calculate a straight angle on a flat surface is flipped movement from other side', () => {
    const movementLine: Line = [{ x: 3, y: 3 }, { x: -3, y: -3 }];
    const collisionLine: Line = [{ x: 5, y: 0 }, { x: -5, y: 0 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(135);
  });

  it('Should correctly calculate a slight angle on both lines', () => {
    const movementLine: Line = [{ x: 0, y: 2 }, { x: 10, y: 5.638 }];
    const collisionLine: Line = [{ x: 0, y: 0 }, { x: 10, y: 8.39 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(60);
  });

  it('Should correctly calculate a straight angle on a vertical flat surface', () => {
    const movementLine: Line = [{ x: 3, y: -3 }, { x: -3, y: 3 }];
    const collisionLine: Line = [{ x: 0, y: -10 }, { x: 0, y: 10 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(45);
  });
});
