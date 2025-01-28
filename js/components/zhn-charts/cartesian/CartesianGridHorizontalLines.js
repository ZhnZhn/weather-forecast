"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridHorizontalLines = _ref => {
  let {
    className,
    x1,
    x2,
    points,
    props
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: points.map((entry, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      ...props,
      x1: x1,
      y1: entry,
      x2: x2,
      y2: entry
    }, `line-${i}`))
  });
};
var _default = exports.default = CartesianGridHorizontalLines;
//# sourceMappingURL=CartesianGridHorizontalLines.js.map