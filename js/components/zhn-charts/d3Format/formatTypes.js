"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _formatDecimal = _interopRequireDefault(require("./formatDecimal.js"));
var _formatPrefixAuto = _interopRequireDefault(require("./formatPrefixAuto.js"));
var _formatRounded = _interopRequireDefault(require("./formatRounded.js"));
var _default = {
  "%": function _(x, p) {
    return (x * 100).toFixed(p);
  },
  "b": function b(x) {
    return Math.round(x).toString(2);
  },
  "c": function c(x) {
    return x + "";
  },
  "d": _formatDecimal["default"],
  "e": function e(x, p) {
    return x.toExponential(p);
  },
  "f": function f(x, p) {
    return x.toFixed(p);
  },
  "g": function g(x, p) {
    return x.toPrecision(p);
  },
  "o": function o(x) {
    return Math.round(x).toString(8);
  },
  "p": function p(x, _p) {
    return (0, _formatRounded["default"])(x * 100, _p);
  },
  "r": _formatRounded["default"],
  "s": _formatPrefixAuto["default"],
  "X": function X(x) {
    return Math.round(x).toString(16).toUpperCase();
  },
  "x": function x(_x) {
    return Math.round(_x).toString(16);
  }
};
exports["default"] = _default;
//# sourceMappingURL=formatTypes.js.map