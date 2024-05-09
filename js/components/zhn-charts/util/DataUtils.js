"use strict";

exports.__esModule = true;
exports.uniqueId = exports.mathSign = exports.isPositiveNumber = exports.isPercent = exports.isNumber = exports.isNumOrStr = exports.interpolateNumber = exports.hasDuplicate = exports.getPercentValue = exports.getAnyElementOfObject = exports.findEntryInArray = void 0;
var _FnUtils = require("./FnUtils");
const _getObjectKeys = Object.keys;
const mathSign = value => value === 0 ? 0 : value > 0 ? 1 : -1;
exports.mathSign = mathSign;
const isPercent = value => (0, _FnUtils._isStr)(value) && value.indexOf('%') === value.length - 1;
exports.isPercent = isPercent;
const isNumber = value => (0, _FnUtils._isNumber)(value) && !(0, _FnUtils._isNaN)(value);
exports.isNumber = isNumber;
const isPositiveNumber = value => isNumber(value) && value >= 0;
exports.isPositiveNumber = isPositiveNumber;
const isNumOrStr = value => isNumber(value) || (0, _FnUtils._isStr)(value);
exports.isNumOrStr = isNumOrStr;
let idCounter = 0;
const uniqueId = prefix => {
  const id = ++idCounter;
  return "" + (prefix || '') + id;
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
    validate = false;
  }
  if (!isNumber(percent) && !(0, _FnUtils._isStr)(percent)) {
    return defaultValue;
  }
  let value;
  if (isPercent(percent)) {
    const index = percent.indexOf('%');
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }
  if ((0, _FnUtils._isNaN)(value)) {
    value = defaultValue;
  }
  if (validate && value > totalValue) {
    value = totalValue;
  }
  return value;
};
exports.getPercentValue = getPercentValue;
const getAnyElementOfObject = obj => {
  if (!obj) {
    return null;
  }
  const keys = _getObjectKeys(obj);
  if (keys && keys.length) {
    return obj[keys[0]];
  }
  return null;
};
exports.getAnyElementOfObject = getAnyElementOfObject;
const hasDuplicate = ary => {
  if (!(0, _FnUtils._isArr)(ary)) {
    return false;
  }
  const len = ary.length,
    cache = {};
  for (let i = 0; i < len; i++) {
    if (!cache[ary[i]]) {
      cache[ary[i]] = true;
    } else {
      return true;
    }
  }
  return false;
};
exports.hasDuplicate = hasDuplicate;
const interpolateNumber = (numberA, numberB) => isNumber(numberA) && isNumber(numberB) ? t => numberA + t * (numberB - numberA) : () => numberB;
exports.interpolateNumber = interpolateNumber;
const findEntryInArray = (arr, specifiedKey, specifiedValue) => {
  if (!(0, _FnUtils._isArr)(arr) || !arr.length) {
    return null;
  }
  return arr.find(entry => entry && ((0, _FnUtils._isFn)(specifiedKey) ? specifiedKey(entry) : (0, _FnUtils._getByPropName)(entry, specifiedKey)) === specifiedValue);
};
exports.findEntryInArray = findEntryInArray;
//# sourceMappingURL=DataUtils.js.map