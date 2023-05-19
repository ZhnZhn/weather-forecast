"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.uniqueId = exports.mathSign = exports.isPercent = exports.isNumber = exports.isNumOrStr = exports.interpolateNumber = exports.hasDuplicate = exports.getPercentValue = exports.getAnyElementOfObject = exports.findEntryInArray = void 0;
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _FnUtils = require("./FnUtils");
var _getObjectKeys = Object.keys;
var _getByPropName = function _getByPropName(obj, propName) {
  return obj && propName ? obj[propName] : void 0;
};
var mathSign = function mathSign(value) {
  return value === 0 ? 0 : value > 0 ? 1 : -1;
};
exports.mathSign = mathSign;
var isPercent = function isPercent(value) {
  return (0, _FnUtils._isStr)(value) && value.indexOf('%') === value.length - 1;
};
exports.isPercent = isPercent;
var isNumber = function isNumber(value) {
  return (0, _isNumber2["default"])(value) && !(0, _FnUtils._isNaN)(value);
};
exports.isNumber = isNumber;
var isNumOrStr = function isNumOrStr(value) {
  return isNumber(value) || (0, _FnUtils._isStr)(value);
};
exports.isNumOrStr = isNumOrStr;
var idCounter = 0;
var uniqueId = function uniqueId(prefix) {
  var id = ++idCounter;
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
var getPercentValue = function getPercentValue(percent, totalValue, defaultValue, validate) {
  if (defaultValue === void 0) {
    defaultValue = 0;
  }
  if (validate === void 0) {
    validate = false;
  }
  if (!isNumber(percent) && !(0, _FnUtils._isStr)(percent)) {
    return defaultValue;
  }
  var value;
  if (isPercent(percent)) {
    var index = percent.indexOf('%');
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
var getAnyElementOfObject = function getAnyElementOfObject(obj) {
  if (!obj) {
    return null;
  }
  var keys = _getObjectKeys(obj);
  if (keys && keys.length) {
    return obj[keys[0]];
  }
  return null;
};
exports.getAnyElementOfObject = getAnyElementOfObject;
var hasDuplicate = function hasDuplicate(ary) {
  if (!(0, _FnUtils._isArr)(ary)) {
    return false;
  }
  var len = ary.length,
    cache = {};
  for (var i = 0; i < len; i++) {
    if (!cache[ary[i]]) {
      cache[ary[i]] = true;
    } else {
      return true;
    }
  }
  return false;
};
exports.hasDuplicate = hasDuplicate;
var interpolateNumber = function interpolateNumber(numberA, numberB) {
  return isNumber(numberA) && isNumber(numberB) ? function (t) {
    return numberA + t * (numberB - numberA);
  } : function () {
    return numberB;
  };
};
exports.interpolateNumber = interpolateNumber;
var findEntryInArray = function findEntryInArray(arr, specifiedKey, specifiedValue) {
  if (!(0, _FnUtils._isArr)(arr) || !arr.length) {
    return null;
  }
  return arr.find(function (entry) {
    return entry && ((0, _FnUtils._isFn)(specifiedKey) ? specifiedKey(entry) : _getByPropName(entry, specifiedKey)) === specifiedValue;
  });
};
exports.findEntryInArray = findEntryInArray;
//# sourceMappingURL=DataUtils.js.map