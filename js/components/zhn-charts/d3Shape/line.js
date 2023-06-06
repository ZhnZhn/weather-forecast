"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _linear = _interopRequireDefault(require("./curve/linear"));
var _path = require("./path");
var _point = require("./point");
var _helperFns = require("./helperFns");
var _crPointGetter = function _crPointGetter(fnOrValue, dfGetter) {
  return (0, _helperFns.isFn)(fnOrValue) ? fnOrValue : fnOrValue === void 0 ? dfGetter : (0, _helperFns.crFnConstant)(fnOrValue);
};
function _default(x, y) {
  var defined = (0, _helperFns.crFnConstant)(true),
    context = null,
    curve = _linear["default"],
    output = null,
    path = (0, _path.withPath)(line);
  x = _crPointGetter(x, _point.x);
  y = _crPointGetter(y, _point.y);
  function line(data) {
    var i,
      n = (data = (0, _helperFns.crArrayFrom)(data)).length,
      d,
      defined0 = false,
      buffer;
    if (context == null) output = curve(buffer = path());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        /*eslint-disable no-cond-assign*/
        if (defined0 = !defined0) output.lineStart();
        /*eslint-enable no-cond-assign*/else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line.x = function (_) {
    return (0, _helperFns.isUndef)(_) ? x : (x = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), line);
  };
  line.y = function (_) {
    return (0, _helperFns.isUndef)(_) ? y : (y = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), line);
  };
  line.defined = function (_) {
    return (0, _helperFns.isUndef)(_) ? defined : (defined = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(!!_), line);
  };
  line.curve = function (_) {
    return (0, _helperFns.isUndef)(_) ? curve : (curve = _, context != null && (output = curve(context)), line);
  };
  line.context = function (_) {
    return (0, _helperFns.isUndef)(_) ? context : (_ == null ? context = output = null : output = curve(context = _), line);
  };
  return line;
}
//# sourceMappingURL=line.js.map