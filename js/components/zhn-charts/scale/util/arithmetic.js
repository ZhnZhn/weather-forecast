"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.rangeStep = exports.getDigitCount = exports.getByPow10 = void 0;
var _decimal = _interopRequireDefault(require("decimal.js-light"));
/**
 *
 * [0.1, 1), 0
 * [0.01, 0.1), -1
 * [0.001, 0.01), -2
 *
 * @param  {Number} value
 * @return {Integer}
 */
var _mathAbs = Math.abs,
  _mathLog = Math.log,
  _mathFloor = Math.floor,
  _mathPow = Math.pow,
  LOG_10 = _mathLog(10);
var getDigitCount = function getDigitCount(value) {
  return value === 0 ? 1 : _mathFloor(_mathLog(_mathAbs(value)) / LOG_10) + 1;
};

/**
 *
 * @param  {Decimal} start
 * @param  {Decimal} end
 * @param  {Decimal} step
 * @return {Array}
 */
exports.getDigitCount = getDigitCount;
var rangeStep = function rangeStep(start, end, step) {
  var result = [];
  var num = new _decimal["default"](start),
    i = 0;
  // magic number to prevent infinite loop
  while (num.lt(end) && i < 100000) {
    result.push(num.toNumber());
    num = num.add(step);
    i++;
  }
  return result;
};

//new Decimal(10).pow(digitCount)
/**
 *
 * @param  {number} n
 * @return {number}
 */
exports.rangeStep = rangeStep;
var getByPow10 = function getByPow10(n) {
  if (n >= 0) return _mathPow(10, n);
  var _absN = _mathAbs(n);
  var str = '0.';
  for (var i = 1; i < _absN; i++) {
    str = str + '0';
  }
  str = str + '1';
  return (0, _decimal["default"])(str).toNumber();
};
exports.getByPow10 = getByPow10;
//# sourceMappingURL=arithmetic.js.map