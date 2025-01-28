"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridVerticalStripes = _ref => {
  let {
    className,
    verticalFill,
    fillOpacity,
    x,
    y,
    width,
    height,
    points
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: points.map((entry, i) => {
      const recentStripe = !points[i + 1],
        lineWidth = recentStripe ? x + width - entry : points[i + 1] - entry;
      return lineWidth <= 0 ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: entry,
        y: y,
        width: lineWidth,
        height: height,
        stroke: "none",
        fill: verticalFill[i % verticalFill.length],
        fillOpacity: fillOpacity,
        className: _CL.CL_BG
      }, `react-${i}`);
    })
  });
};
var _default = exports.default = CartesianGridVerticalStripes;
//# sourceMappingURL=CartesianGridVerticalStripes.js.map