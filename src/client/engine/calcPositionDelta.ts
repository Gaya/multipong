interface Coordinate {
  x: number;
  y: number;
}

function calcPositionDelta(timePassed: number, speed: number, angle: number): Coordinate {
  /*
          C
      b   a
  A   c   B

  a:	5
  b: 10
  c: 8.66
  Angle A (α):	30
  Angle B (β):	90
  Angle C (γ):	60



 */

  const distanceTraveled = ((timePassed / 15) * speed);
  const calcAngle = angle % 90;

  return {
    x: 0,
    y: 0,
  };
}

export default calcPositionDelta;