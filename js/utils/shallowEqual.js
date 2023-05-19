"use strict";

exports.__esModule = true;
exports.shallowEqual = void 0;
var _getObjectKeys = Object.keys;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var shallowEqual = function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  var aKeys = _getObjectKeys(objA),
    bKeys = _getObjectKeys(objB),
    len = aKeys.length;
  if (bKeys.length !== len) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var key = aKeys[i];
    if (objA[key] !== objB[key] || !_hasOwnProperty.call(objB, key)) {
      return false;
    }
  }
  return true;
};
exports.shallowEqual = shallowEqual;
//# sourceMappingURL=shallowEqual.js.map