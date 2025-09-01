"use strict";

exports.__esModule = true;
exports.isStr = exports.isPositiveNumber = exports.isNumber = exports.isNumOrStr = exports.isNullOrUndef = exports.isNotEmptyArr = exports.isNaN = exports.isFn = exports.isBool = exports.isArr = void 0;
const isArr = exports.isArr = Array.isArray;
const isNotEmptyArr = arr => isArr(arr) && arr.length > 0;
exports.isNotEmptyArr = isNotEmptyArr;
const isNullOrUndef = v => v == null;
exports.isNullOrUndef = isNullOrUndef;
const _fIsTypeof = strType => v => typeof v == strType;
const isFn = exports.isFn = _fIsTypeof('function');
const isStr = exports.isStr = _fIsTypeof('string');
const isBool = exports.isBool = _fIsTypeof('boolean');
const _isTypeNumber = _fIsTypeof('number');
const isNumber = v => _isTypeNumber(v) && v - v == 0;
exports.isNumber = isNumber;
const isNaN = exports.isNaN = Number.isNaN;
const isPositiveNumber = value => isNumber(value) && value >= 0;
exports.isPositiveNumber = isPositiveNumber;
const isNumOrStr = value => isNumber(value) || isStr(value);
exports.isNumOrStr = isNumOrStr;
//# sourceMappingURL=isTypeFn.js.map