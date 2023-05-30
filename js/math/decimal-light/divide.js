"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _decimalLightConfig = require("./decimalLightConfig");
var _decimalLightFn = require("./decimalLightFn");
// Assumes non-zero x and k, and hence non-zero result
function multiplyInteger(x, k) {
  var temp,
    carry = 0,
    i = x.length;
  for (x = x.slice(); i--;) {
    temp = x[i] * k + carry;
    x[i] = temp % _decimalLightConfig.BASE | 0;
    carry = temp / _decimalLightConfig.BASE | 0;
  }
  if (carry) x.unshift(carry);
  return x;
}
function compare(a, b, aL, bL) {
  var i, r;
  if (aL != bL) {
    r = aL > bL ? 1 : -1;
  } else {
    for (i = r = 0; i < aL; i++) {
      if (a[i] != b[i]) {
        r = a[i] > b[i] ? 1 : -1;
        break;
      }
    }
  }
  return r;
}
function subtract(a, b, aL) {
  var i = 0;

  // Subtract b from a.
  for (; aL--;) {
    a[aL] -= i;
    i = a[aL] < b[aL] ? 1 : 0;
    a[aL] = i * _decimalLightConfig.BASE + a[aL] - b[aL];
  }

  // Remove leading zeros.
  for (; !a[0] && a.length > 1;) a.shift();
}
var divide = function divide(x, y, pr, dp) {
  var cmp,
    e,
    i,
    k,
    prod,
    prodL,
    q,
    qd,
    rem,
    remL,
    rem0,
    sd,
    t,
    xi,
    xL,
    yd0,
    yL,
    yz,
    Ctor = x.constructor,
    sign = x.s == y.s ? 1 : -1,
    xd = x.d,
    yd = y.d;

  // Either 0 case
  if (!x.s) return new Ctor(x);
  if (!y.s) throw Error(_decimalLightConfig.decimalError + 'Division by zero');
  e = x.e - y.e;
  yL = yd.length;
  xL = xd.length;
  q = new Ctor(sign);
  qd = q.d = [];

  // Result exponent may be one less than e
  for (i = 0; yd[i] == (xd[i] || 0);) ++i;
  if (yd[i] > (xd[i] || 0)) --e;
  if (pr == null) {
    sd = pr = Ctor.precision;
  } else if (dp) {
    sd = pr + ((0, _decimalLightFn.getBase10Exponent)(x) - (0, _decimalLightFn.getBase10Exponent)(y)) + 1;
  } else {
    sd = pr;
  }
  if (sd < 0) return new Ctor(0);

  // Convert precision in number of base 10 digits to base 1e7 digits
  sd = sd / _decimalLightConfig.LOG_BASE + 2 | 0;
  i = 0;

  // divisor < 1e7
  if (yL == 1) {
    k = 0;
    yd = yd[0];
    sd++;

    // k is the carry.
    for (; (i < xL || k) && sd--; i++) {
      t = k * _decimalLightConfig.BASE + (xd[i] || 0);
      qd[i] = t / yd | 0;
      k = t % yd | 0;
    }

    // divisor >= 1e7
  } else {
    // Normalise xd and yd so highest order digit of yd is >= BASE/2
    k = _decimalLightConfig.BASE / (yd[0] + 1) | 0;
    if (k > 1) {
      yd = multiplyInteger(yd, k);
      xd = multiplyInteger(xd, k);
      yL = yd.length;
      xL = xd.length;
    }
    xi = yL;
    rem = xd.slice(0, yL);
    remL = rem.length;

    // Add zeros to make remainder as long as divisor
    for (; remL < yL;) rem[remL++] = 0;
    yz = yd.slice();
    yz.unshift(0);
    yd0 = yd[0];
    if (yd[1] >= _decimalLightConfig.BASE / 2) ++yd0;
    do {
      k = 0;

      // Compare divisor and remainder
      cmp = compare(yd, rem, yL, remL);

      // If divisor < remainder
      if (cmp < 0) {
        // Calculate trial digit, k
        rem0 = rem[0];
        if (yL != remL) rem0 = rem0 * _decimalLightConfig.BASE + (rem[1] || 0);

        // k will be how many times the divisor goes into the current remainder
        k = rem0 / yd0 | 0;

        //  Algorithm:
        //  1. product = divisor * trial digit (k)
        //  2. if product > remainder: product -= divisor, k--
        //  3. remainder -= product
        //  4. if product was < remainder at 2:
        //    5. compare new remainder and divisor
        //    6. If remainder > divisor: remainder -= divisor, k++

        if (k > 1) {
          if (k >= _decimalLightConfig.BASE) k = _decimalLightConfig.BASE - 1;

          // product = divisor * trial digit
          prod = multiplyInteger(yd, k);
          prodL = prod.length;
          remL = rem.length;

          // Compare product and remainder
          cmp = compare(prod, rem, prodL, remL);

          // product > remainder
          if (cmp == 1) {
            k--;

            // Subtract divisor from product
            subtract(prod, yL < prodL ? yz : yd, prodL);
          }
        } else {
          // cmp is -1
          // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
          // to avoid it. If k is 1 there is a need to compare yd and rem again below
          if (k == 0) cmp = k = 1;
          prod = yd.slice();
        }
        prodL = prod.length;
        if (prodL < remL) prod.unshift(0);

        // Subtract product from remainder
        subtract(rem, prod, remL);

        // If product was < previous remainder
        if (cmp == -1) {
          remL = rem.length;

          // Compare divisor and new remainder
          cmp = compare(yd, rem, yL, remL);

          // If divisor < new remainder, subtract divisor from remainder
          if (cmp < 1) {
            k++;

            // Subtract divisor from remainder
            subtract(rem, yL < remL ? yz : yd, remL);
          }
        }
        remL = rem.length;
      } else if (cmp === 0) {
        k++;
        rem = [0];
      } // if cmp === 1, k will be 0

      // Add the next digit, k, to the result array
      qd[i++] = k;

      // Update the remainder
      if (cmp && rem[0]) {
        rem[remL++] = xd[xi] || 0;
      } else {
        rem = [xd[xi]];
        remL = 1;
      }
    } while ((xi++ < xL || rem[0] !== void 0) && sd--);
  }

  // Leading zero
  if (!qd[0]) qd.shift();
  q.e = e;
  return (0, _decimalLightFn.round)(q, dp ? pr + (0, _decimalLightFn.getBase10Exponent)(q) + 1 : pr);
};
var _default = divide;
exports["default"] = _default;
//# sourceMappingURL=divide.js.map