"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Cross = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_CROSS = 'recharts-cross';
var getPath = function getPath(x, y, width, height, top, left) {
  return "M" + x + "," + top + "v" + height + "M" + left + "," + y + "h" + width;
};
var Cross = function Cross(props) {
  var x = props.x,
    y = props.y,
    width = props.width,
    height = props.height,
    top = props.top,
    left = props.left,
    className = props.className;
  return !(0, _DataUtils.isNumber)(x) || !(0, _DataUtils.isNumber)(y) || !(0, _DataUtils.isNumber)(width) || !(0, _DataUtils.isNumber)(height) || !(0, _DataUtils.isNumber)(top) || !(0, _DataUtils.isNumber)(left) ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("path", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(props, true), {
    className: (0, _classnames["default"])(CL_CROSS, className),
    d: getPath(x, y, width, height, top, left)
  }));
};
exports.Cross = Cross;
Cross.defaultProps = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0
};
//# sourceMappingURL=Cross.js.map