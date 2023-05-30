import {
  isDecimal,

  decimalError,
  invalidArgument,

  setExternal
} from './decimalLightConfig';

import {
  getBase10Exponent,
  round
} from './decimalLightFn';

import parseDecimal from './parseDecimal';
import add from './add';
import subtract from './subtract';
import mul from './mul';
import divide from './divide';
import cmp from './cmp';
import toString from './toString';

const P = {};

function Decimal(value) {
  let x = this;
  // Decimal called without new case
  if (!(x instanceof Decimal)) {
    return new Decimal(value);
  }
  // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
  // which points to Object.
  x.constructor = Decimal;
  // Duplicate.
  if (value instanceof Decimal) {
    x.s = value.s;
    x.e = value.e;
    value = value.d
    x.d = value ? value.slice() : value;
    return;
  }
  if (typeof value === 'number') {
    // Reject Infinity/NaN
    if (value * 0 !== 0) {
      throw Error(invalidArgument + value);
    }
    if (value > 0) {
      x.s = 1;
    } else if (value < 0) {
      value = -value;
      x.s = -1;
    } else {
      x.s = 0;
      x.e = 0;
      x.d = [0];
      return;
    }
    // Fast path for small integers
    if (value === ~~value && value < 1e7) {
      x.e = 0;
      x.d = [value];
      return;
    }
    return parseDecimal(x, value.toString());
  } else if (typeof value !== 'string') {
    throw Error(invalidArgument + value);
  }
  // Minus sign
  if (value.charCodeAt(0) === 45) {
    value = value.slice(1);
    x.s = -1;
  } else {
    x.s = 1;
  }
  if (isDecimal.test(value)) parseDecimal(x, value);
  else throw Error(invalidArgument + value);
}

Decimal.precision = 20;
// The exponent value at and beneath which `toString` returns exponential notation
// 0 to -MAX_E
Decimal.toExpNeg = -7;
// The exponent value at and above which `toString` returns exponential notation
// 0 to MAX_E
Decimal.toExpPos = 21;

P.toString = P.valueOf = function () {
  const x = this
  , e = getBase10Exponent(x)
  , Ctor = x.constructor;

  return toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
};
P.toNumber = function () {
  return +this;
};

P.add = function (y) {
  let x = this;
  y = new x.constructor(y);
  return x.s == y.s
    ? add(x, y)
    : subtract(x, (y.s = -y.s, y));
};

P.sub = function (y) {
  let x = this;
  y = new x.constructor(y);
  return x.s == y.s
    ? subtract(x, y)
    : add(x, (y.s = -y.s, y));
};

P.cmp = cmp;
P.lt = function (y) {
  return this.cmp(y) < 0;
};
P.lte = function (y) {
  return this.cmp(y) < 1;
};

P.mul = mul;
P.div = function (y) {
  return divide(this, new this.constructor(y));
};

P.mod = function (y) {
  let q
  , x = this
  , Ctor = x.constructor
  , pr = Ctor.precision;

  y = new Ctor(y);

  // x % 0 = NaN
  if (!y.s) throw Error(decimalError + 'NaN');

  // Return x if x is 0.
  if (!x.s) return round(new Ctor(x), pr);

  // Prevent rounding of intermediate calculations.
  setExternal(false);
  //q = divide(x, y, 0, 1).times(y);
  q = divide(x, y, 0, 1).mul(y);
  setExternal(true);

  //return x.minus(q);
  return x.sub(q);
};

P.isint = function () {
  return this.e > this.d.length - 2;
};

Decimal.prototype = P;

export default Decimal
