import intersect from '../src/client/engine/modules/intersect';

describe('intersect', () => {
  it('Returns intersection of lines', () => {
    expect(
      intersect(
        [{ x: 0, y: 2 }, { x: 2, y: 0 }],
        [{ x: 0, y: 0 }, { x: 2, y: 2 }],
      ),
    ).toEqual({ x: 1, y: 1 });
  });

  it('Returns false on parallel lines', () => {
    expect(
      intersect(
        [{ x: 0, y: 0 }, { x: 2, y: 2 }],
        [{ x: 2, y: 0 }, { x: 4, y: 2 }],
      ),
    ).toEqual(false);
  });

  it('Returns false when a line has no length', () => {
    expect(
      intersect(
        [{ x: 0, y: 0 }, { x: 2, y: 2 }],
        [{ x: 0, y: 0 }, { x: 0, y: 0 }],
      ),
    ).toEqual(false);
  });
});
