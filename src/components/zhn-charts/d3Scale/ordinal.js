import { InternMap } from './InternMap';
import { initRange } from './init';
import { isUndef } from './helperFns';

const arrayFrom = Array.from
, implicit = Symbol("implicit");

export default function ordinal(...args) {
  let index = new InternMap()
  , domain = []
  , range = []
  , unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (isUndef(i)) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (isUndef(_)) return domain.slice();
    domain = [];
    index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = _ => isUndef(_)
   ? range.slice()
   : (range = arrayFrom(_), scale);

  scale.unknown = (..._args) => _args.length
   ? (unknown = args[0], scale)
   : unknown;

  scale.copy = () => ordinal(domain, range)
    .unknown(unknown);

  initRange.apply(scale, args);

  return scale;
}
