"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _decimalLightConfig = require("./decimalLightConfig");
var _decimalLightFn = require("./decimalLightFn");
var _parseDecimal = _interopRequireDefault(require("./parseDecimal"));
var _add = _interopRequireDefault(require("./add"));
var _subtract = _interopRequireDefault(require("./subtract"));
var _mul = _interopRequireDefault(require("./mul"));
var _divide = _interopRequireDefault(require("./divide"));
var _cmp = _interopRequireDefault(require("./cmp"));
var _toString = _interopRequireDefault(require("./toString"));
var P = {};
function Decimal(value) {
  var x = this;
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
    value = value.d;
    x.d = value ? value.slice() : value;
    return;
  }
  if (typeof value === 'number') {
    // Reject Infinity/NaN
    if (value * 0 !== 0) {
      throw Error(_decimalLightConfig.invalidArgument + value);
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
    return (0, _parseDecimal["default"])(x, value.toString());
  } else if (typeof value !== 'string') {
    throw Error(_decimalLightConfig.invalidArgument + value);
  }
  // Minus sign
  if (value.charCodeAt(0) === 45) {
    value = value.slice(1);
    x.s = -1;
  } else {
    x.s = 1;
  }
  if (_decimalLightConfig.isDecimal.test(value)) (0, _parseDecimal["default"])(x, value);else throw Error(_decimalLightConfig.invalidArgument + value);
}
Decimal.precision = 20;
// The exponent value at and beneath which `toString` returns exponential notation
// 0 to -MAX_E
Decimal.toExpNeg = -7;
// The exponent value at and above which `toString` returns exponential notation
// 0 to MAX_E
Decimal.toExpPos = 21;
P.toString = P.valueOf = function () {
  var x = this,
    e = (0, _decimalLightFn.getBase10Exponent)(x),
    Ctor = x.constructor;
  return (0, _toString["default"])(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
};
P.toNumber = function () {
  return +this;
};
P.add = function (y) {
  var x = this;
  y = new x.constructor(y);
  return x.s == y.s ? (0, _add["default"])(x, y) : (0, _subtract["default"])(x, (y.s = -y.s, y));
};
P.sub = function (y) {
  var x = this;
  y = new x.constructor(y);
  return x.s == y.s ? (0, _subtract["default"])(x, y) : (0, _add["default"])(x, (y.s = -y.s, y));
};
P.cmp = _cmp["default"];
P.lt = function (y) {
  return this.cmp(y) < 0;
};
P.lte = function (y) {
  return this.cmp(y) < 1;
};
P.mul = _mul["default"];
P.div = function (y) {
  return (0, _divide["default"])(this, new this.constructor(y));
};
P.mod = function (y) {
  var q,
    x = this,
    Ctor = x.constructor,
    pr = Ctor.precision;
  y = new Ctor(y);

  // x % 0 = NaN
  if (!y.s) throw Error(_decimalLightConfig.decimalError + 'NaN');

  // Return x if x is 0.
  if (!x.s) return (0, _decimalLightFn.round)(new Ctor(x), pr);

  // Prevent rounding of intermediate calculations.
  (0, _decimalLightConfig.setExternal)(false);
  //q = divide(x, y, 0, 1).times(y);
  q = (0, _divide["default"])(x, y, 0, 1).mul(y);
  (0, _decimalLightConfig.setExternal)(true);

  //return x.minus(q);
  return x.sub(q);
};
P.isint = function () {
  return this.e > this.d.length - 2;
};
Decimal.prototype = P;
var _default = Decimal;
exports["default"] = _default;
//# sourceMappingURL=decimalLight.js.map