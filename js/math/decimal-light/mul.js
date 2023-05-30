"use strict";

exports.__esModule = true;
exports["default"] = mul;
var _decimalLightConfig = require("./decimalLightConfig");
var _decimalLightFn = require("./decimalLightFn");
function mul(y) {
  var carry,
    e,
    i,
    k,
    r,
    rL,
    t,
    xdL,
    ydL,
    x = this,
    Ctor = x.constructor,
    xd = x.d,
    yd = (y = new Ctor(y)).d;

  // Return 0 if either is 0.
  if (!x.s || !y.s) return new Ctor(0);
  y.s *= x.s;
  e = x.e + y.e;
  xdL = xd.length;
  ydL = yd.length;

  // Ensure xd points to the longer array.
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }

  // Initialise the result array with zeros.
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--;) r.push(0);

  // Multiply!
  for (i = ydL; --i >= 0;) {
    carry = 0;
    for (k = xdL + i; k > i;) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % _decimalLightConfig.BASE | 0;
      carry = t / _decimalLightConfig.BASE | 0;
    }
    r[k] = (r[k] + carry) % _decimalLightConfig.BASE | 0;
  }

  // Remove trailing zeros.
  for (; !r[--rL];) r.pop();
  if (carry) ++e;else r.shift();
  y.d = r;
  y.e = e;
  return (0, _decimalLightFn.getRoundDecimal)(y, Ctor.precision);
}
//# sourceMappingURL=mul.js.map