"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridHorizontalStripes = _ref => {
  let {
    className,
    horizontalPoints,
    horizontalFill,
    fillOpacity,
    x,
    y,
    width,
    height
  } = _ref;
  const roundedSortedHorizontalPoints = (0, _CartesianGridRenderFn.crRoundedSortedPoints)(horizontalPoints, y);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: roundedSortedHorizontalPoints.map((entry, i) => {
      const recentStripe = !roundedSortedHorizontalPoints[i + 1],
        lineHeight = recentStripe ? y + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
      return lineHeight <= 0 ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        y: entry,
        x: x,
        height: lineHeight,
        width: width,
        stroke: "none",
        fill: horizontalFill[i % horizontalFill.length],
        fillOpacity: fillOpacity,
        className: _CL.CL_BG
      }, `react-${i}`);
    })
  });
};
var _default = exports.default = CartesianGridHorizontalStripes;
//# sourceMappingURL=CartesianGridHorizontalStripes.js.map