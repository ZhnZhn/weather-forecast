"use strict";

exports.__esModule = true;
exports.CartesianAxisLine = void 0;
var _styleFn = require("../../styleFn");
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
var _jsxRuntime = require("react/jsx-runtime");
const _needDimension = (orientation, value1, value2, mirror) => +(orientation === value1 && !mirror || orientation === value2 && mirror);
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
  } = props;
  let _y, _x;
  const _lineProps = orientation === 'top' || orientation === 'bottom' ? (_y = y + height * _needDimension(orientation, 'top', 'bottom', mirror), {
    x1: x,
    y1: _y,
    x2: x + width,
    y2: _y
  }) : (_x = x + width * _needDimension(orientation, 'left', 'right', mirror), {
    x1: _x,
    y1: y,
    x2: _x,
    y2: y + height
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    className: (0, _styleFn.crCn)(className, (0, _CartesianAxisRenderFn.getClassName)(axisLine)),
    stroke: axisLine && axisLine.stroke || props.stroke,
    fill: "none",
    ..._lineProps
  });
};
exports.CartesianAxisLine = CartesianAxisLine;
//# sourceMappingURL=CartesianAxisLine.js.map