"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianAxisLine = void 0;
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ReactUtils = require("../util/ReactUtils");
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianAxisLine = _ref => {
  let {
    className,
    props
  } = _ref;
  const {
      x,
      y,
      width,
      height,
      orientation,
      mirror,
      axisLine
    } = props,
    _props = {
      ...(0, _ReactUtils.filterProps)(props),
      ...(0, _ReactUtils.filterProps)(axisLine),
      fill: 'none'
    };
  let needHeight, needWidth;
  const _lineProps = orientation === 'top' || orientation === 'bottom' ? (needHeight = +(orientation === 'top' && !mirror || orientation === 'bottom' && mirror), {
    x1: x,
    y1: y + needHeight * height,
    x2: x + width,
    y2: y + needHeight * height
  }) : (needWidth = +(orientation === 'left' && !mirror || orientation === 'right' && mirror), {
    x1: x + needWidth * width,
    y1: y,
    x2: x + needWidth * width,
    y2: y + height
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    ..._props,
    ..._lineProps,
    className: (0, _crCn.default)(className, (0, _CartesianAxisRenderFn.getClassName)(axisLine))
  });
};
exports.CartesianAxisLine = CartesianAxisLine;
//# sourceMappingURL=CartesianAxisLine.js.map