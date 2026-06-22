"use strict";

exports.__esModule = true;
exports.roundSafeOrEmpty = exports.roundSafeByOneDigitsOrEmpty = void 0;
var _isTypeFn = require("../utils/isTypeFn");
const NUMBER_EPSILON = Number.EPSILON;
const _mathRound = Math.round;
const roundSafeByOneDigitsOrEmpty = value => (0, _isTypeFn.isNumber)(value) ? _mathRound((value + NUMBER_EPSILON) * 10) / 10 : '';
exports.roundSafeByOneDigitsOrEmpty = roundSafeByOneDigitsOrEmpty;
const roundSafeOrEmpty = value => (0, _isTypeFn.isNumber)(value) ? _mathRound(value) : '';
exports.roundSafeOrEmpty = roundSafeOrEmpty;
//# sourceMappingURL=mathFn.js.map