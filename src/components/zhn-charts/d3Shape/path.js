import { Path } from './d3Path';
import { isUndef } from './helperFns';

const mathFloor = Math.floor;

export function withPath(shape) {
  let digits = 3;

  shape.digits = function(_) {
    if (isUndef(_)) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = mathFloor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };

  return () => new Path(digits);
}
