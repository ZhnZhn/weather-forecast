"use strict";

exports.__esModule = true;
exports.setExternal = exports.mathPow = exports.mathMax = exports.mathFloor = exports.mathCeil = exports.isDecimal = exports.invalidArgument = exports.getExternal = exports.exponentOutOfRange = exports.decimalError = exports.MAX_E = exports.LOG_BASE = exports.BASE = void 0;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
exports.isDecimal = isDecimal;
var mathMax = Math.max;
exports.mathMax = mathMax;
var mathCeil = Math.ceil;
exports.mathCeil = mathCeil;
var mathFloor = Math.floor;
exports.mathFloor = mathFloor;
var mathPow = Math.pow;
exports.mathPow = mathPow;
var LOG_BASE = 7;
exports.LOG_BASE = LOG_BASE;
var BASE = 1e7;
exports.BASE = BASE;
var _MAX_SAFE_INTEGER = 9007199254740991;
// 1286742750677284
var MAX_E = mathFloor(_MAX_SAFE_INTEGER / LOG_BASE);
exports.MAX_E = MAX_E;
var decimalError = '[DecimalError] ';
exports.decimalError = decimalError;
var invalidArgument = decimalError + 'Invalid argument: ';
exports.invalidArgument = invalidArgument;
var exponentOutOfRange = decimalError + 'Exponent out of range: ';
exports.exponentOutOfRange = exponentOutOfRange;
var _external = true;
var getExternal = function getExternal() {
  return _external;
};
exports.getExternal = getExternal;
var setExternal = function setExternal(is) {
  _external = is;
};
exports.setExternal = setExternal;
//# sourceMappingURL=decimalLightConfig.js.map