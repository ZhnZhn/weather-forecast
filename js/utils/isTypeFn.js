"use strict";

exports.__esModule = true;
exports.isStr = exports.isNumber = exports.isNaN = exports.isFn = exports.isBool = exports.isArr = void 0;
const isArr = exports.isArr = Array.isArray;
const _fIsTypeof = strType => v => typeof v == strType;
const isFn = exports.isFn = _fIsTypeof('function');
const isStr = exports.isStr = _fIsTypeof('string');
const isBool = exports.isBool = _fIsTypeof('boolean');
const _isTypeNumber = _fIsTypeof('number');
const isNumber = v => _isTypeNumber(v) && v - v == 0;
exports.isNumber = isNumber;
const isNaN = exports.isNaN = Number.isNaN;
//# sourceMappingURL=isTypeFn.js.map