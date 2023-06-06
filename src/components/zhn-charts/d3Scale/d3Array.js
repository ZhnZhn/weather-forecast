const ascending = (
  a,
  b
) => a == null || b == null
  ? NaN
  : a < b
    ? -1
    : a > b
      ? 1
      : a >= b
        ? 0
        : NaN;

/*
function descending(a, b) {
  return a == null || b == null
    ? NaN
    : b < a
      ? -1
      : b > a
        ? 1
        : b >= a
          ? 0
          : NaN;
}
*/

const zero = () => 0
, bisector = (f) => {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We canÔÇÖt do this
  // for a comparator (except for specific, known comparators) because we canÔÇÖt
  // tell if the comparator is symmetric, and an asymmetric comparator canÔÇÖt be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x) => ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    //compare1 = f === ascending || f === descending ? f : zero;
    compare1 = f === ascending ? f : zero;
    compare2 = f;
    delta = f;
  }

  const left = (a, x, lo = 0, hi = a.length) => {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  };

  const right = (a, x, lo = 0, hi = a.length) => {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  };

  const center = (a, x, lo = 0, hi = a.length) => {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x)
      ? i - 1
      : i;
  }

  return {
    left,
    center,
    right
  };
}

const ascendingBisect = bisector(ascending);
export const bisect = ascendingBisect.right

const mathMax = Math.max
, mathCeil = Math.ceil
, mathSqrt = Math.sqrt
, mathFloor = Math.floor
, mathPow = Math.pow
, mathLog10 = Math.log10
, mathRound = Math.round;

export function range(...args) {
  let start = +args[0]
  , stop = +args[1]
  , step = (n = args.length) < 2
    ? (stop = start, start = 0, 1)
    : n < 3
       ? 1
       : +args[2]
  , i = -1
  , n = mathMax(0, mathCeil((stop - start) / step)) | 0
  , range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

const e10 = mathSqrt(50)
, e5 = mathSqrt(10)
, e2 = mathSqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / mathMax(0, count)
  , power = mathFloor(mathLog10(step))
  , error = step / mathPow(10, power)
  , factor = error >= e10
     ? 10
     : error >= e5
        ? 5
        : error >= e2
           ? 2
           : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = mathPow(10, -power) / factor;
    i1 = mathRound(start * inc);
    i2 = mathRound(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = mathPow(10, power) * factor;
    i1 = mathRound(start / inc);
    i2 = mathRound(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

export function ticks(start, stop, count) {
  stop = +stop
  start = +start
  count = +count
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse
    ? tickSpec(stop, start, count)
    : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

export function tickIncrement(start, stop, count) {
  stop = +stop
  start = +start
  count = +count
  return tickSpec(start, stop, count)[2];
}

export function tickStep(start, stop, count) {
  stop = +stop
  start = +start
  count = +count;
  const reverse = stop < start, inc = reverse
    ? tickIncrement(stop, start, count)
    : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}
