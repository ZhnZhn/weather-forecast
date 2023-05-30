"use strict";

exports.__esModule = true;
exports.getBase10Exponent = getBase10Exponent;
exports.getRoundDecimal = void 0;
exports.round = round;
var _decimalLightConfig = require("./decimalLightConfig");
function getBase10Exponent(x) {
  var e = x.e * _decimalLightConfig.LOG_BASE,
    w = x.d[0];

  // Add the number of digits of the first word of the digits array.
  for (; w >= 10; w /= 10) e++;
  return e;
}
function round(x, sd, rm) {
  var i,
    j,
    k,
    n,
    rd,
    doRound,
    w,
    xdi,
    xd = x.d;

  // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
  // w: the word of xd which contains the rounding digit, a base 1e7 number.
  // xdi: the index of w within xd.
  // n: the number of digits of w.
  // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
  // they had leading zeros)
  // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

  // Get the length of the first word of the digits array xd.
  for (n = 1, k = xd[0]; k >= 10; k /= 10) n++;
  i = sd - n;

  // Is the rounding digit in the first word of xd?
  if (i < 0) {
    i += _decimalLightConfig.LOG_BASE;
    j = sd;
    w = xd[xdi = 0];
  } else {
    xdi = (0, _decimalLightConfig.mathCeil)((i + 1) / _decimalLightConfig.LOG_BASE);
    k = xd.length;
    if (xdi >= k) return x;
    w = k = xd[xdi];

    // Get the number of digits of w.
    for (n = 1; k >= 10; k /= 10) n++;

    // Get the index of rd within w.
    i %= _decimalLightConfig.LOG_BASE;

    // Get the index of rd within w, adjusted for leading zeros.
    // The number of leading zeros of w is given by LOG_BASE - n.
    j = i - _decimalLightConfig.LOG_BASE + n;
  }
  if (rm !== void 0) {
    k = (0, _decimalLightConfig.mathPow)(10, n - j - 1);

    // Get the rounding digit at index j of w.
    rd = w / k % 10 | 0;

    // Are there any non-zero digits after the rounding digit?
    doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k;

    // The expression `w % mathpow(10, n - j - 1)` returns all the digits of w to the right of the
    // digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression will give
    // 714.

    doRound = rm < 4 ? (rd || doRound) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 &&
    // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? j > 0 ? w / (0, _decimalLightConfig.mathPow)(10, n - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
  }
  if (sd < 1 || !xd[0]) {
    if (doRound) {
      k = getBase10Exponent(x);
      xd.length = 1;

      // Convert sd to decimal places.
      sd = sd - k - 1;

      // 1, 0.1, 0.01, 0.001, 0.0001 etc.
      xd[0] = (0, _decimalLightConfig.mathPow)(10, (_decimalLightConfig.LOG_BASE - sd % _decimalLightConfig.LOG_BASE) % _decimalLightConfig.LOG_BASE);
      x.e = (0, _decimalLightConfig.mathFloor)(-sd / _decimalLightConfig.LOG_BASE) || 0;
    } else {
      xd.length = 1;

      // Zero.
      xd[0] = x.e = x.s = 0;
    }
    return x;
  }

  // Remove excess digits.
  if (i == 0) {
    xd.length = xdi;
    k = 1;
    xdi--;
  } else {
    xd.length = xdi + 1;
    k = (0, _decimalLightConfig.mathPow)(10, _decimalLightConfig.LOG_BASE - i);

    // E.g. 56700 becomes 56000 if 7 is the rounding digit.
    // j > 0 means i > number of leading zeros of w.
    xd[xdi] = j > 0 ? (w / (0, _decimalLightConfig.mathPow)(10, n - j) % (0, _decimalLightConfig.mathPow)(10, j) | 0) * k : 0;
  }
  if (doRound) {
    for (;;) {
      // Is the digit to be rounded up in the first word of xd?
      if (xdi == 0) {
        if ((xd[0] += k) == _decimalLightConfig.BASE) {
          xd[0] = 1;
          ++x.e;
        }
        break;
      } else {
        xd[xdi] += k;
        if (xd[xdi] != _decimalLightConfig.BASE) break;
        xd[xdi--] = 0;
        k = 1;
      }
    }
  }

  // Remove trailing zeros.
  for (i = xd.length; xd[--i] === 0;) xd.pop();
  if ((0, _decimalLightConfig.getExternal)() && (x.e > _decimalLightConfig.MAX_E || x.e < -_decimalLightConfig.MAX_E)) {
    throw Error(_decimalLightConfig.exponentOutOfRange + getBase10Exponent(x));
  }
  return x;
}
var getRoundDecimal = function getRoundDecimal(decimalValue, precision) {
  return (0, _decimalLightConfig.getExternal)() ? round(decimalValue, precision) : decimalValue;
};
exports.getRoundDecimal = getRoundDecimal;
//# sourceMappingURL=decimalLightFn.js.map