import { Coordinate } from '../../domain/Coordinate';

import calcPositionDelta from './calcPositionDelta';
import toFixed from './toFixed';

function playfieldPointsByPlayers(numberOfPlayers: number): Coordinate[] {
  const r = 50;
  const sides = numberOfPlayers < 4 ? 4 : numberOfPlayers;
  const angle = 360 / sides;

  const points: Coordinate[] = [];

  for (let i = 0; i < sides; i += 1) {
    const angleSide = ((angle * i) + (angle / 2) + 180);
    const delta = calcPositionDelta(r, angleSide);

    points.push({
      x: toFixed(50 + delta.x),
      y: toFixed(50 - delta.y),
    });
  }

  return points;
}

export function playfieldSVGCoordinates(numberOfPlayers: number): string {
  const points = playfieldPointsByPlayers(numberOfPlayers);

  return [...points, points[0]].map(({ x, y }) => `${x},${y}`).join(' ');
}

export default playfieldPointsByPlayers;
