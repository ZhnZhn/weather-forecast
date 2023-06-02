"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _d3Color = require("d3-color");
var _rgb = _interopRequireDefault(require("./rgb.js"));
var _array = require("./array.js");
var _date = _interopRequireDefault(require("./date.js"));
var _number = _interopRequireDefault(require("./number.js"));
var _object = _interopRequireDefault(require("./object.js"));
var _string = _interopRequireDefault(require("./string.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _numberArray = _interopRequireWildcard(require("./numberArray.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _default(a, b) {
  var t = typeof b,
    c;
  return b == null || t === "boolean" ? (0, _constant["default"])(b) : (t === "number" ? _number["default"] : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgb["default"]) : _string["default"] : b instanceof _d3Color.color ? _rgb["default"] : b instanceof Date ? _date["default"] : (0, _numberArray.isNumberArray)(b) ? _numberArray["default"] : Array.isArray(b) ? _array.genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object["default"] : _number["default"])(a, b);
}
//# sourceMappingURL=value.js.map