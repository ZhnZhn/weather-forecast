"use strict";

exports.__esModule = true;
exports._upperFirst = exports._range = exports._min = exports._max = exports._isStr = exports._isObject = exports._isNumber = exports._isNil = exports._isNaN = exports._isFn = exports._isBool = exports._isArr = exports._getByPropName = void 0;
var _isArr = Array.isArray;
exports._isArr = _isArr;
var _isFn = function _isFn(v) {
  return typeof v === 'function';
};
exports._isFn = _isFn;
var _isBool = function _isBool(v) {
  return typeof v === 'boolean';
};
exports._isBool = _isBool;
var _isStr = function _isStr(v) {
  return typeof v === 'string';
};
exports._isStr = _isStr;
var _isNumber = function _isNumber(v) {
  return typeof v === 'number';
};
exports._isNumber = _isNumber;
var _isNil = function _isNil(v) {
  return v == null;
};
exports._isNil = _isNil;
var _isNaN = Number.isNaN;
exports._isNaN = _isNaN;
var _isObject = function _isObject(value) {
  var type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};
exports._isObject = _isObject;
var _upperFirst = function _upperFirst(str) {
  return _isStr(str) && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
};
exports._upperFirst = _upperFirst;
var _getByPropName = function _getByPropName(obj, propName, dfValue) {
  return obj && propName ? obj[propName] || dfValue : dfValue;
};
exports._getByPropName = _getByPropName;
var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};
var _range = function _range(startValue, endValue, increment) {
  var isEndDef = !_isUndef(endValue);
  endValue = isEndDef ? endValue : startValue;
  startValue = isEndDef ? startValue : 0;
  var _diff = endValue - startValue;
  if (_isUndef(increment)) {
    increment = Math.sign(_diff);
  }
  var length = Math.abs(_diff / (increment || 1));
  var _Array$from$reduce = Array.from({
      length: length
    }).reduce(function (_ref) {
      var result = _ref.result,
        current = _ref.current;
      return {
        result: [].concat(result, [current]),
        current: current + increment
      };
    }, {
      current: startValue,
      result: []
    }),
    result = _Array$from$reduce.result;
  return result;
};
exports._range = _range;
var _isSymbol = function _isSymbol(v) {
  return typeof v === 'symbol';
};
var _findExtremum = function _findExtremum(arr, iteratee, comparator) {
  var index = -1,
    length = arr.length,
    computed,
    result;
  while (++index < length) {
    var value = arr[index],
      current = iteratee(value);
    if (current != null && (computed === void 0 ? current === current && !_isSymbol(current) : comparator(current, computed))) {
      computed = current;
      result = value;
    }
  }
  return result;
};
var _identity = function _identity(v) {
  return v;
};
var _baseLt = function _baseLt(valueA, valueB) {
  return valueA < valueB;
};
var _baseGt = function _baseGt(valueA, valueB) {
  return valueA > valueB;
};
var _min = function _min(arr) {
  return arr && arr.length ? _findExtremum(arr, _identity, _baseLt) : void 0;
};
exports._min = _min;
var _max = function _max(arr) {
  return arr && arr.length ? _findExtremum(arr, _identity, _baseGt) : void 0;
};
exports._max = _max;
//# sourceMappingURL=FnUtils.js.map