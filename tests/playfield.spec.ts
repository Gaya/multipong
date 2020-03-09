import playfieldPointsByPlayers, { playfieldSVGCoordinates } from '../src/client/engine/modules/playfield';

describe('playfieldPointsByPlayers', () => {
  it('Calculates correctly up to 4 players', () => {
    const expectedPoints = [
      {
        x: 14.64,
        y: 85.36,
      },
      {
        x: 85.36,
        y: 85.36,
      },
      {
        x: 85.36,
        y: 14.64,
      },
      {
        x: 14.64,
        y: 14.64,
      },
    ];

    expect(playfieldPointsByPlayers(1)).toEqual(expectedPoints);
    expect(playfieldPointsByPlayers(2)).toEqual(expectedPoints);
    expect(playfieldPointsByPlayers(3)).toEqual(expectedPoints);
    expect(playfieldPointsByPlayers(4)).toEqual(expectedPoints);
  });

  it('Calculates correctly for 5 players', () => {
    const expectedPoints = [
      {
        x: 9.55,
        y: 79.39,
      },
      {
        x: 65.45,
        y: 97.55,
      },
      {
        x: 100,
        y: 50,
      },
      {
        x: 65.45,
        y: 2.45,
      },
      {
        x: 9.55,
        y: 20.61,
      },
    ];

    expect(playfieldPointsByPlayers(5)).toEqual(expectedPoints);
  });
});

describe('playfieldSVGCoordinates', () => {
  it('Converts playfield points to SVG path', () => {
    const points = '14.64,85.36 85.36,85.36 85.36,14.64 14.64,14.64 14.64,85.36';

    expect(playfieldSVGCoordinates(1)).toEqual(points);
  });
});
