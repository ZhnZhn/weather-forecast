"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.InternMap = void 0;
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
function intern_get(_ref, value) {
  var _intern = _ref._intern,
    _key = _ref._key;
  var key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set(_ref2, value) {
  var _intern = _ref2._intern,
    _key = _ref2._key;
  var key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete(_ref3, value) {
  var _intern = _ref3._intern,
    _key = _ref3._key;
  var key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern["delete"](key);
  }
  return value;
}
var InternMap = /*#__PURE__*/function (_Map) {
  (0, _inheritsLoose2["default"])(InternMap, _Map);
  function InternMap(entries, key) {
    var _this;
    if (key === void 0) {
      key = keyof;
    }
    _this = _Map.call(this) || this;
    Object.defineProperties((0, _assertThisInitialized2["default"])(_this), {
      _intern: {
        value: new Map()
      },
      _key: {
        value: key
      }
    });
    if (entries != null) {
      for (var _iterator = _createForOfIteratorHelperLoose(entries), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
          _key2 = _step$value[0],
          value = _step$value[1];
        _this.set(_key2, value);
      }
    }
    return _this;
  }
  var _proto = InternMap.prototype;
  _proto.get = function get(key) {
    return _Map.prototype.get.call(this, intern_get(this, key));
  };
  _proto.has = function has(key) {
    return _Map.prototype.has.call(this, intern_get(this, key));
  };
  _proto.set = function set(key, value) {
    return _Map.prototype.set.call(this, intern_set(this, key), value);
  };
  _proto["delete"] = function _delete(key) {
    return _Map.prototype["delete"].call(this, intern_delete(this, key));
  };
  return InternMap;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Map));
exports.InternMap = InternMap;
//# sourceMappingURL=InternMap.js.map