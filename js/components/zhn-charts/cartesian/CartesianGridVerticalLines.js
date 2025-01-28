"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridVerticalLines = _ref => {
  let {
    className,
    y1,
    y2,
    points,
    props
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: points.map((entry, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      ...props,
      x1: entry,
      y1: y1,
      x2: entry,
      y2: y2
    }, `line-${i}`))
  });
};
var _default = exports.default = CartesianGridVerticalLines;
//# sourceMappingURL=CartesianGridVerticalLines.js.map