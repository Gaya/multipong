import calcPositionDelta from '../src/client/engine/calcPositionDelta';

describe('calcPositionDelta', () => {
  it('Calculates delta correctly at 30 degrees', () => {
    expect(calcPositionDelta(15, 10, 30))
      .toEqual({ x: 8.660254037844387, y: 4.999999999999999 });
  });

  it('Calculates delta correctly at 120 degrees', () => {
    expect(calcPositionDelta(15, 10, 120))
      .toEqual({ x: -4.999999999999999, y: 8.660254037844387 });
  });

  it('Calculates delta correctly at 210 degrees', () => {
    expect(calcPositionDelta(15, 10, 210))
      .toEqual({ x: -8.660254037844387, y: -4.999999999999999 });
  });

  it('Calculates delta correctly at 300 degrees', () => {
    expect(calcPositionDelta(15, 10, 300))
      .toEqual({ x: 8.660254037844387, y: 4.999999999999999 });
  });

  it('Calculates delta correctly at 390 degrees', () => {
    expect(calcPositionDelta(15, 10, 390))
      .toEqual({ x: 8.660254037844387, y: 4.999999999999999 });
  });

  it('Calculates delta correctly at 90 degrees', () => {
    expect(calcPositionDelta(15, 10, 90))
      .toEqual({ x: 0, y: 10 });
  });
});
