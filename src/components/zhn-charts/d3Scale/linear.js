import { ticks, tickIncrement } from './d3Array';
import { continuous, copy } from './continuous';
import { initRange } from './init';
import tickFormat from './tickFormat';

const mathFloor = Math.floor
, mathCeil = Math.ceil;

function linearish(scale) {
  let domain = scale.domain;

  scale.ticks = (count) => {
    let d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = (count, specifier) => {
    let d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = (count) => {
    if (count == null) count = 10;

    let d = domain()
    , i0 = 0
    , i1 = d.length - 1
    , start = d[i0]
    , stop = d[i1]
    , prestep
    , step
    , maxIter = 10;

    if (stop < start) {
      step = start
      start = stop
      stop = step
      step = i0
      i0 = i1
      i1 = step
    }

    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start
        d[i1] = stop
        return domain(d);
      } else if (step > 0) {
        start = mathFloor(start / step) * step;
        stop = mathCeil(stop / step) * step;
      } else if (step < 0) {
        start = mathCeil(start * step) / step;
        stop = mathFloor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

export function scaleLinear(...args) {
  let scale = continuous();

  scale.copy = () => copy(scale, scaleLinear());
  initRange.apply(scale, args);

  return linearish(scale);
}
