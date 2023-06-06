"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = _default;
var _linear = _interopRequireDefault(require("./curve/linear"));
var _line = _interopRequireDefault(require("./line"));
var _path = require("./path");
var _point = require("./point");
var _helperFns = require("./helperFns");
var _crPointGetter = function _crPointGetter(fnOrValue, dfGetter) {
  return (0, _helperFns.isFn)(fnOrValue) ? fnOrValue : (0, _helperFns.isUndef)(fnOrValue) ? dfGetter : (0, _helperFns.crFnConstant)(+fnOrValue);
};
function _default(x0, y0, y1) {
  var x1 = null,
    defined = (0, _helperFns.crFnConstant)(true),
    context = null,
    curve = _linear["default"],
    output = null,
    path = (0, _path.withPath)(area);
  x0 = _crPointGetter(x0, _point.x);
  y0 = _crPointGetter(y0, (0, _helperFns.crFnConstant)(0));
  y1 = _crPointGetter(y1, _point.y);
  function area(data) {
    var i,
      j,
      k,
      n = (data = (0, _helperFns.crArrayFrom)(data)).length,
      d,
      defined0 = false,
      buffer,
      x0z = new Array(n),
      y0z = new Array(n);
    if (context == null) output = curve(buffer = path());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        /*eslint-disable no-cond-assign*/
        if (defined0 = !defined0) {
          /*eslint-enable no-cond-assign*/
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data);
        y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  function arealine() {
    return (0, _line["default"])().defined(defined).curve(curve).context(context);
  }
  area.x = function (_) {
    return (0, _helperFns.isUndef)(_) ? x0 : (x0 = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), x1 = null, area);
  };
  area.x0 = function (_) {
    return (0, _helperFns.isUndef)(_) ? x0 : (x0 = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), area);
  };
  area.x1 = function (_) {
    return (0, _helperFns.isUndef)(_) ? x1 : (x1 = _ == null ? null : (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), area);
  };
  area.y = function (_) {
    return (0, _helperFns.isUndef)(_) ? y0 : (y0 = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), y1 = null, area);
  };
  area.y0 = function (_) {
    return (0, _helperFns.isUndef)(_) ? y0 : (y0 = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), area);
  };
  area.y1 = function (_) {
    return (0, _helperFns.isUndef)(_) ? y1 : (y1 = _ == null ? null : (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(+_), area);
  };
  area.lineX0 = area.lineY0 = function () {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function () {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function () {
    return arealine().x(x1).y(y0);
  };
  area.defined = function (_) {
    return (0, _helperFns.isUndef)(_) ? defined : (defined = (0, _helperFns.isFn)(_) ? _ : (0, _helperFns.crFnConstant)(!!_), area);
  };
  area.curve = function (_) {
    return (0, _helperFns.isUndef)(_) ? curve : (curve = _, context != null && (output = curve(context)), area);
  };
  area.context = function (_) {
    return (0, _helperFns.isUndef)(_) ? context : (_ == null ? context = output = null : output = curve(context = _), area);
  };
  return area;
}
//# sourceMappingURL=area.js.map