import { range as sequence } from './d3Array';
import { initRange } from './init';
import ordinal from './ordinal';
import { isUndef } from './helperFns';

const mathFloor = Math.floor
, mathRound = Math.round
, mathMin = Math.min
, mathMax = Math.max;

export function scaleBand(...args) {
  let scale = ordinal().unknown(undefined)
  , domain = scale.domain
  , ordinalRange = scale.range
  , r0 = 0
  , r1 = 1
  , step
  , bandwidth
  , round = false
  , paddingInner = 0
  , paddingOuter = 0
  , align = 0.5;

  delete scale.unknown;

  function rescale() {
    let n = domain().length
    , reverse = r1 < r0
    , start = reverse ? r1 : r0
    , stop = reverse ? r0 : r1;
    step = (stop - start) / mathMax(1, n - paddingInner + paddingOuter * 2);
    if (round) step = mathFloor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) {
      start = mathRound(start)
      bandwidth = mathRound(bandwidth)
    }
    let values = sequence(n).map(i => start + step * i);
    return ordinalRange(
      reverse ? values.reverse() : values
    );
  }

  scale.domain = _ => isUndef(_)
   ? domain()
   : (domain(_), rescale());

  scale.range = _ => isUndef(_)
   ? [r0, r1]
   : ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale());

  scale.rangeRound = (_) => {
    [r0, r1] = _;
    r0 = +r0;
    r1 = +r1;
    round = true;
    return rescale();
  };

  scale.bandwidth = () => bandwidth;
  scale.step = () => step;

  scale.round = _ => isUndef(_)
   ? round
   : (round = !!_, rescale());

  scale.padding = _ => isUndef(_)
   ? paddingInner
   : (paddingInner = mathMin(1, paddingOuter = +_), rescale());

  scale.paddingInner = _ => isUndef(_)
   ? paddingInner
   : (paddingInner = mathMin(1, _), rescale());

  scale.paddingOuter = _ => isUndef(_)
   ? paddingOuter
   : (paddingOuter = +_, rescale())

  scale.align = _ => isUndef(_)
   ? align
   : (align = mathMax(0, mathMin(1, _)), rescale());

  scale.copy = () => scaleBand(domain(), [r0, r1])
    .round(round)
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter)
    .align(align);

  return initRange.apply(rescale(), args);
}

function pointish(scale) {
  const copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

export function scalePoint(...args) {
  return pointish(scaleBand.apply(null, args).paddingInner(1));
}
