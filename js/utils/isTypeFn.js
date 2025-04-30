"use strict";

exports.__esModule = true;
exports.isStr = exports.isNumber = exports.isFn = exports.isArr = void 0;
const isArr = exports.isArr = Array.isArray;
const _fIsTypeof = strType => v => typeof v == strType;
const _isTypeNumber = _fIsTypeof('number');
const isFn = exports.isFn = _fIsTypeof('function');
const isStr = exports.isStr = _fIsTypeof('string');
const isNumber = v => _isTypeNumber(v) && v - v == 0;
exports.isNumber = isNumber;
//# sourceMappingURL=isTypeFn.js.map