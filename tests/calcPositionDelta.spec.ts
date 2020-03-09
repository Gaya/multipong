import calcPositionDelta, { distanceByTime } from '../src/client/engine/calcPositionDelta';

describe('calcPositionDelta', () => {
  it('Calculates delta correctly at 30 degrees', () => {
    expect(calcPositionDelta(10, 30))
      .toEqual({ x: 8.66, y: 5 });
  });

  it('Calculates delta correctly at 120 degrees', () => {
    expect(calcPositionDelta(10, 120))
      .toEqual({ x: -5, y: 8.66 });
  });

  it('Calculates delta correctly at 210 degrees', () => {
    expect(calcPositionDelta(10, 210))
      .toEqual({ x: -8.66, y: -5 });
  });

  it('Calculates delta correctly at 300 degrees', () => {
    expect(calcPositionDelta(10, 300))
      .toEqual({ x: 5, y: -8.66 });
  });

  it('Calculates delta correctly at 390 degrees', () => {
    expect(calcPositionDelta(10, 390))
      .toEqual({ x: 8.66, y: 5 });
  });

  it('Calculates delta correctly at 90 degrees', () => {
    expect(calcPositionDelta(10, 90))
      .toEqual({ x: 0, y: 10 });
  });

  it('Calculates delta correctly at 270 degrees', () => {
    expect(calcPositionDelta(10, 270))
      .toEqual({ x: 0, y: -10 });
  });
});

describe('distanceByTime', () => {
  it('Calculates correct distance for 20ms at speed 1', () => {
    expect(distanceByTime(20, 1)).toEqual(1);
  });

  it('Calculates correct distance for 200ms at speed 1', () => {
    expect(distanceByTime(200, 1)).toEqual(10);
  });

  it('Calculates correct distance for 200ms at speed 3', () => {
    expect(distanceByTime(200, 3)).toEqual(30);
  });
});
