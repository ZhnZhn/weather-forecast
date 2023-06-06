"use strict";

exports.__esModule = true;
exports["default"] = ordinal;
var _InternMap = require("./InternMap");
var _init = require("./init");
var _helperFns = require("./helperFns");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var arrayFrom = Array.from,
  implicit = Symbol("implicit");
function ordinal() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var index = new _InternMap.InternMap(),
    domain = [],
    range = [],
    unknown = implicit;
  function scale(d) {
    var i = index.get(d);
    if ((0, _helperFns.isUndef)(i)) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }
  scale.domain = function (_) {
    if ((0, _helperFns.isUndef)(_)) return domain.slice();
    domain = [];
    index = new _InternMap.InternMap();
    for (var _iterator = _createForOfIteratorHelperLoose(_), _step; !(_step = _iterator()).done;) {
      var value = _step.value;
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = function (_) {
    return (0, _helperFns.isUndef)(_) ? range.slice() : (range = arrayFrom(_), scale);
  };
  scale.unknown = function () {
    return arguments.length ? (unknown = args[0], scale) : unknown;
  };
  scale.copy = function () {
    return ordinal(domain, range).unknown(unknown);
  };
  _init.initRange.apply(scale, args);
  return scale;
}
//# sourceMappingURL=ordinal.js.map