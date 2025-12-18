"use strict";

exports.__esModule = true;
exports.Rectangle = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _CL = require("../CL");
var _RectangleFn = require("./RectangleFn");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    // The radius of border
    // The radius of four corners when radius is a number
    // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
    radius: 0
  },
  _isNotNumber = v => v !== +v;
const Rectangle = exports.Rectangle = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      x,
      y,
      width,
      height,
      radius,
      className
    } = _props;
  if (_isNotNumber(x) || _isNotNumber(y) || _isNotNumber(width) || _isNotNumber(height) || width === 0 || height === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    fill: _props.fill,
    className: (0, _styleFn.crCn)(_CL.CL_RECTANGLE, className),
    d: (0, _RectangleFn.getRectanglePath)(x, y, width, height, radius)
  });
});
//# sourceMappingURL=Rectangle.js.map