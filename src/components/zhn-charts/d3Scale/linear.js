import { ticks, tickIncrement } from './d3Array';
import { continuous, copy } from './continuous.js';
import { initRange } from './init.js';
import tickFormat from './tickFormat.js';

function linearish(scale) {
  let domain = scale.domain;

  scale.ticks = function(count) {
    let d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    let d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
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
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

export function scaleLinear() {
  let scale = continuous();

  scale.copy = function() {
    return copy(scale, scaleLinear());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}
