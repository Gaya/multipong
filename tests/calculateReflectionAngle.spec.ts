import { Line } from '../src/client/domain/Coordinate';

import calculateReflectionAngle from '../src/client/engine/modules/calculateReflectionAngle';

describe('calculateReflectionAngle', () => {
  it('Should correctly calculate a slight angle', () => {
    const movementLine: Line = [{ x: 0, y: 2 }, { x: 10, y: 2 }];
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
    const movementLine: Line = [{ x: 3, y: 3 }, { x: -3, y: -3 }];
    const collisionLine: Line = [{ x: 0, y: -10 }, { x: 0, y: 10 }];

    expect(calculateReflectionAngle(movementLine, collisionLine)).toEqual(315);
  });
});
