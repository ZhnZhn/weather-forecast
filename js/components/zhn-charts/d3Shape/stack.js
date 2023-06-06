"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _none = _interopRequireDefault(require("./offset/none"));
var _none2 = _interopRequireDefault(require("./order/none"));
var _helperFns = require("./helperFns");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function stackValue(d, key) {
  return d[key];
}
function stackSeries(key) {
  var series = [];
  series.key = key;
  return series;
}
function _default() {
  var keys = (0, _helperFns.crFnConstant)([]),
    order = _none2["default"],
    offset = _none["default"],
    value = stackValue;
  function stack(data) {
    var sz = (0, _helperFns.arrayFrom)(keys.apply(this, arguments), stackSeries),
      i,
      n = sz.length,
      j = -1,
      oz;
    for (var _iterator = _createForOfIteratorHelperLoose(data), _step; !(_step = _iterator()).done;) {
      var d = _step.value;
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }
    for (i = 0, oz = (0, _helperFns.crArrayFrom)(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function (_) {
    return (0, _helperFns.isUndef)(_) ? keys : (keys = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)((0, _helperFns.arrayFrom)(_)), stack);
  };
  stack.value = function (_) {
    return (0, _helperFns.isUndef)(_) ? value : (value = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), stack);
  };
  stack.order = function (_) {
    return (0, _helperFns.isUndef)(_) ? order : (order = _ == null ? _none2["default"] : (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)((0, _helperFns.arrayFrom)(_)), stack);
  };
  stack.offset = function (_) {
    return (0, _helperFns.isUndef)(_) ? offset : (offset = _ == null ? _none["default"] : _, stack);
  };
  return stack;
}
//# sourceMappingURL=stack.js.map