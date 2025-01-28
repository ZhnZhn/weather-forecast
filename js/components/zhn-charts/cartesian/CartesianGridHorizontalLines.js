"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridHorizontalLines = _ref => {
  let {
    className,
    x,
    width,
    points,
    props
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: points.map((entry, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      ...(0, _ReactUtils.filterProps)(props),
      x1: x,
      y1: entry,
      x2: x + width,
      y2: entry
    }, `line-${i}`))
  });
};
var _default = exports.default = CartesianGridHorizontalLines;
//# sourceMappingURL=CartesianGridHorizontalLines.js.map