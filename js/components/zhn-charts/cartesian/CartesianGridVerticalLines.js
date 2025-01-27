"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ReactUtils = require("../util/ReactUtils");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridVerticalLines = _ref => {
  let {
    className,
    y,
    height,
    points,
    props
  } = _ref;
  return (0, _CartesianGridRenderFn.isPoints)(points) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: points.map((entry, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      ...(0, _ReactUtils.filterProps)(props),
      x1: entry,
      y1: y,
      x2: entry,
      y2: y + height
    }, `line-${i}`))
  }) : null;
};
var _default = exports.default = CartesianGridVerticalLines;
//# sourceMappingURL=CartesianGridVerticalLines.js.map