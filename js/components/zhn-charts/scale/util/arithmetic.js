"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.rangeStep = exports.getDigitCount = void 0;
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
exports.rangeStep = rangeStep;
//# sourceMappingURL=arithmetic.js.map