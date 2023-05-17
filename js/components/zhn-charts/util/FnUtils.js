"use strict";

exports.__esModule = true;
exports._upperFirst = exports._isStr = exports._isObject = exports._isNil = exports._isNaN = exports._isFn = exports._isBool = exports._isArr = void 0;
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
//# sourceMappingURL=FnUtils.js.map