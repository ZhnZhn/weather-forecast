"use strict";

exports.__esModule = true;
exports.uniqueId = exports.mathSign = exports.mathAbs = exports.isPositiveNumber = exports.isPercent = exports.isNumOrStr = exports.interpolateNumber = exports.hasDuplicate = exports.getPercentValue = exports.getInterpolatedNumber = exports.getAnyElementOfObject = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
exports.isNumber = _isTypeFn.isNumber;
exports.isPositiveNumber = _isTypeFn.isPositiveNumber;
exports.isNumOrStr = _isTypeFn.isNumOrStr;
const _getObjectKeys = Object.keys;
const mathAbs = exports.mathAbs = Math.abs;
const mathSign = value => value === 0 ? 0 : value > 0 ? 1 : -1;
exports.mathSign = mathSign;
const isPercent = value => (0, _isTypeFn.isStr)(value) && value.indexOf('%') === value.length - 1;
exports.isPercent = isPercent;
let idCounter = 0;
const uniqueId = prefix => {
  const id = ++idCounter;
  return `${prefix || ''}${id}`;
};

/**
 * Get percent value of a total value
 * @param {number|string} percent A percent
 * @param {number} totalValue     Total value
 * @param {number} defaultValue   The value returned when percent is undefined or invalid
 * @param {boolean} validate      If set to be true, the result will be validated
 * @return {number} value
 */
exports.uniqueId = uniqueId;
const getPercentValue = function (percent, totalValue, defaultValue, validate) {
  if (defaultValue === void 0) {
    defaultValue = 0;
  }
  if (validate === void 0) {
    validate = !1;
  }
  if (!(0, _isTypeFn.isNumber)(percent) && !(0, _isTypeFn.isStr)(percent)) {
    return defaultValue;
  }
  const value = isPercent(percent) ? totalValue * parseFloat(percent.slice(0, percent.indexOf('%'))) / 100 : +percent;
  return (0, _isTypeFn.isNaN)(value) ? defaultValue : validate && value > totalValue ? totalValue : value;
};
exports.getPercentValue = getPercentValue;
const getAnyElementOfObject = obj => {
  if (!(0, _isTypeFn.isObj)(obj)) {
    return null;
  }
  const keys = _getObjectKeys(obj);
  return keys.length ? obj[keys[0]] : null;
};
exports.getAnyElementOfObject = getAnyElementOfObject;
const hasDuplicate = arr => {
  if (!(0, _isTypeFn.isArr)(arr)) {
    return !1;
  }
  const cache = Object.create(null);
  for (let token of arr) {
    if (cache[token]) {
      return !0;
    } else {
      cache[token] = !0;
    }
  }
  return !1;
};
exports.hasDuplicate = hasDuplicate;
const interpolateNumber = (numberA, numberB) => (0, _isTypeFn.isNumber)(numberA) && (0, _isTypeFn.isNumber)(numberB) ? t => numberA + t * (numberB - numberA) : () => numberB;
exports.interpolateNumber = interpolateNumber;
const getInterpolatedNumber = (fromNumber, toNumber, t) => (0, _isTypeFn.isNumber)(fromNumber) && (0, _isTypeFn.isNumber)(toNumber) ? interpolateNumber(fromNumber, toNumber)(t) : toNumber;
exports.getInterpolatedNumber = getInterpolatedNumber;
//# sourceMappingURL=DataUtils.js.map