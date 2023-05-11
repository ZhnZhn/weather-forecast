"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.patchResizeCallback = exports.isSSR = exports.isFunction = exports.isDOMElement = void 0;
var _debounce2 = _interopRequireDefault(require("lodash/debounce"));
var _throttle2 = _interopRequireDefault(require("lodash/throttle"));
var patchResizeCallback = function patchResizeCallback(resizeCallback, refreshMode, refreshRate, refreshOptions) {
  return refreshMode === 'debounce' ? (0, _debounce2["default"])(resizeCallback, refreshRate, refreshOptions) : refreshMode === 'throttle' ? (0, _throttle2["default"])(resizeCallback, refreshRate, refreshOptions) : resizeCallback;
};
exports.patchResizeCallback = patchResizeCallback;
var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};
exports.isFunction = isFunction;
var isSSR = function isSSR() {
  return typeof window === 'undefined';
};
exports.isSSR = isSSR;
var isDOMElement = function isDOMElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
};
exports.isDOMElement = isDOMElement;
//# sourceMappingURL=utils.js.map