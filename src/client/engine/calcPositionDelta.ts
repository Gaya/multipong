interface Coordinate {
  x: number;
  y: number;
}

function calcPositionDelta(timePassed: number, speed: number, angle: number): Coordinate {
  const calcAngle = angle % 90;
  const c = ((timePassed / 15) * speed);
  const a = c * Math.sin(calcAngle * (Math.PI / 180));
  const b = Math.sqrt(c ** 2 - a ** 2);

  const axis = Math.ceil((angle + 1) / 90) % 4;

  switch (axis) {
    case 4:
      return {
        x: a,
        y: b * -1 || 0,
      };
    case 3:
      return {
        x: b * -1 || 0,
        y: a * -1 || 0,
      };
    case 2:
      return {
        x: a * -1 || 0,
        y: b,
      };
    case 1:
    default:
      return {
        x: b,
        y: a,
      };
  }
}

export default calcPositionDelta;
