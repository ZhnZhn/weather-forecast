import offsetNone from "./offset/none";
import orderNone from "./order/none";
import {
  isFn,
  isUndef,
  arrayFrom,
  crArrayFrom,
  crFnConstant
} from './helperFns';

function stackValue(d, key) {
  return d[key];
}

function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}

export default function() {
  let keys = crFnConstant([])
  , order = orderNone
  , offset = offsetNone
  , value = stackValue;

  function stack(data) {
    let sz = arrayFrom(keys.apply(this, arguments), stackSeries)
    , i, n = sz.length, j = -1
    , oz;

    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }

    for (i = 0, oz = crArrayFrom(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = _ => isUndef(_)
   ? keys
   : (keys = isFn(_) ? _ : crFnConstant(arrayFrom(_)), stack);

  stack.value = _ => isUndef(_)
   ? value
   : (value = isFn(_) ? _ : crFnConstant(+_), stack);

  stack.order = _ => isUndef(_)
   ? order
   : (order = _ == null ? orderNone : isFn(_) ? _ : crFnConstant(arrayFrom(_)), stack);

  stack.offset = _ => isUndef(_)
   ? offset
   : (offset = _ == null ? offsetNone : _, stack);

  return stack;
}
