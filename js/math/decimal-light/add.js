"use strict";

exports.__esModule = true;
exports["default"] = add;
var _decimalLightConfig = require("./decimalLightConfig");
var _decimalLightFn = require("./decimalLightFn");
function add(x, y) {
  var carry,
    d,
    e,
    i,
    k,
    len,
    xd,
    yd,
    Ctor = x.constructor,
    pr = Ctor.precision;

  // If either is zero...
  if (!x.s || !y.s) {
    // Return x if y is zero.
    // Return y if y is non-zero.
    if (!y.s) y = new Ctor(x);
    return (0, _decimalLightConfig.getExternal)() ? (0, _decimalLightFn.round)(y, pr) : y;
  }
  xd = x.d;
  yd = y.d;

  // x and y are finite, non-zero numbers with the same sign.

  k = x.e;
  e = y.e;
  xd = xd.slice();
  i = k - e;

  // If base 1e7 exponents differ...
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }

    // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
    k = (0, _decimalLightConfig.mathCeil)(pr / _decimalLightConfig.LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }

    // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
    d.reverse();
    for (; i--;) d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;

  // If yd is longer than xd, swap xd and yd so xd points to the longer array.
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }

  // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
  for (carry = 0; i;) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / _decimalLightConfig.BASE | 0;
    xd[i] %= _decimalLightConfig.BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }

  // Remove trailing zeros.
  // No need to check for zero, as +x + +y != 0 && -x + -y != 0
  for (len = xd.length; xd[--len] == 0;) xd.pop();
  y.d = xd;
  y.e = e;
  return (0, _decimalLightConfig.getExternal)() ? (0, _decimalLightFn.round)(y, pr) : y;
}
//# sourceMappingURL=add.js.map