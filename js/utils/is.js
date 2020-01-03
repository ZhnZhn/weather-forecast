"use strict";

exports.__esModule = true;
exports["default"] = exports.toStr = exports.toObjLike = void 0;

var toObjLike = function toObjLike(obj) {
  return obj !== null && typeof obj === "object" ? obj : {};
};

exports.toObjLike = toObjLike;

var toStr = function toStr(arr, prop, i, df) {
  if (arr === void 0) {
    arr = [];
  }

  if (i === void 0) {
    i = 0;
  }

  if (df === void 0) {
    df = 'no data';
  }

  return arr !== null && arr[i] && arr[i][prop] ? arr[i][prop] : df;
};

exports.toStr = toStr;
var _default = {
  toObjLike: toObjLike,
  toStr: toStr
};
exports["default"] = _default;
//# sourceMappingURL=is.js.map