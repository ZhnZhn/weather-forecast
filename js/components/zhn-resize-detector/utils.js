"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.patchResizeCallback = exports.isSSR = exports.isFunction = exports.isDOMElement = void 0;
var _debounceFn = _interopRequireDefault(require("../../utils/debounceFn"));
var _throttleFn = _interopRequireDefault(require("../../utils/throttleFn"));
var patchResizeCallback = function patchResizeCallback(resizeCallback, refreshMode, refreshRate, refreshOptions) {
  return refreshMode === 'debounce' ? (0, _debounceFn["default"])(resizeCallback, refreshRate, refreshOptions) : refreshMode === 'throttle' ? (0, _throttleFn["default"])(resizeCallback, refreshRate, refreshOptions) : resizeCallback;
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