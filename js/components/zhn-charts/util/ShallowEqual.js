"use strict";

exports.__esModule = true;
exports.shallowEqual = void 0;
var shallowEqual = function shallowEqual(a, b) {
  for (var key in a) {
    if ({}.hasOwnProperty.call(a, key) && (!{}.hasOwnProperty.call(b, key) || a[key] !== b[key])) {
      return false;
    }
  }
  for (var _key in b) {
    if ({}.hasOwnProperty.call(b, _key) && !{}.hasOwnProperty.call(a, _key)) {
      return false;
    }
  }
  return true;
};
exports.shallowEqual = shallowEqual;
//# sourceMappingURL=ShallowEqual.js.map