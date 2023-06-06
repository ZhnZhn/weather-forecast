import {
  interpolateValue,
  interpolateNumber,
  interpolateRound
} from '../d3Interpolate';

import { bisect } from './d3Array';
import { isUndef } from './helperFns';

const arrayFrom = Array.from
, mathMin = Math.min
, mathMax = Math.max;

let unit = [0, 1];

const constant = x => () => x
, number = x => +x
, identity = x => x
, normalize = (
  a,
  b
) => {
  b -= (a = +a)
  return b
    ? x => (x - a) / b
    : constant(isNaN(b) ? NaN : 0.5);
}
, clamper = (
  a,
  b
) => {
  const [
    _a, _b
  ] = a > b
    ? [b, a]
    : [a, b];
  return x => mathMax(_a, mathMin(_b, x));
};

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  let [d0, d1] = domain
  , [r0, r1] = range;
  if (d1 < d0) {
    d0 = normalize(d1, d0)
    r0 = interpolate(r1, r0)
  } else {
    d0 = normalize(d0, d1)
    r0 = interpolate(r0, r1)
  }
  return x => r0(d0(x));
}

function polymap(domain, range, interpolate) {
  let j = mathMin(domain.length, range.length) - 1
  , d = new Array(j)
  , r = new Array(j)
  , i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    let i = bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function transformer() {
  let domain = unit
  , range = unit
  , interpolate = interpolateValue
  , transform
  , untransform
  , unknown
  , clamp = identity
  , piecewise
  , output
  , input;

  function rescale() {
    let n = mathMin(domain.length, range.length);
    if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2
      ? polymap
      : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x)
      ? unknown
      : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = y => clamp(
    untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y))
  );

  scale.domain = _ => isUndef(_)
   ? domain.slice()
   : (domain = arrayFrom(_, number), rescale());

  scale.range = _ => isUndef(_)
   ? range.slice()
   : (range = arrayFrom(_), rescale());

  scale.rangeRound = _ => {
    range = arrayFrom(_);
    interpolate = interpolateRound;
    return rescale();
  }

  scale.clamp = _ => isUndef(_)
   ? clamp !== identity
   : (clamp = _ ? true : identity, rescale());

  scale.interpolate = _ => isUndef(_)
   ? interpolate
   : (interpolate = _, rescale());

  scale.unknown = (..._args) => _args.length
   ? (unknown = _args[0], scale)
   : unknown;

  return function(t, u) {
    transform = t
    untransform = u
    return rescale();
  };
}

export const copy = (
  source,
  target
) => target
  .domain(source.domain())
  .range(source.range())
  .interpolate(source.interpolate())
  .clamp(source.clamp())
  .unknown(source.unknown());

export function continuous() {
  return transformer()(identity, identity);
}
