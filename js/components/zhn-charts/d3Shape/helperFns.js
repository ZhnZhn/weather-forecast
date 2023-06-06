"use strict";

exports.__esModule = true;
exports.arrayFrom = void 0;
exports.crArrayFrom = crArrayFrom;
exports.crFnConstant = crFnConstant;
exports.noop = exports.isUndef = exports.isFn = void 0;
var noop = function noop() {};
exports.noop = noop;
var isFn = function isFn(v) {
  return typeof v === 'function';
};
exports.isFn = isFn;
var isUndef = function isUndef(v) {
  return v === void 0;
};
exports.isUndef = isUndef;
function crFnConstant(x) {
  return function constant() {
    return x;
  };
}
var arrayFrom = Array.from;
exports.arrayFrom = arrayFrom;
function crArrayFrom(x) {
  return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
  : arrayFrom(x); // Map, Set, iterable, string, or anything else
}
//# sourceMappingURL=helperFns.js.map