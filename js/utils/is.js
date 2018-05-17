"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toObjLike = exports.toObjLike = function toObjLike(obj) {
  return obj !== null && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" ? obj : {};
};

var toStr = exports.toStr = function toStr() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var prop = arguments[1];
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var df = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'no data';

  return arr !== null && arr[i] && arr[i][prop] ? arr[i][prop] : df;
};

exports.default = {
  toObjLike: toObjLike,
  toStr: toStr
};
//# sourceMappingURL=is.js.map