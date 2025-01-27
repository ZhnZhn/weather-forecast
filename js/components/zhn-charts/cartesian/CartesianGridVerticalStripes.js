"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridVerticalStripes = _ref => {
  let {
    className,
    verticalFill,
    verticalPoints,
    fillOpacity,
    x,
    y,
    width,
    height
  } = _ref;
  if (!(0, _CartesianGridRenderFn.isPoints)(verticalFill)) {
    return null;
  }
  const roundedSortedVerticalPoints = (0, _CartesianGridRenderFn.crRoundedSortedPoints)(verticalPoints, x);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: roundedSortedVerticalPoints.map((entry, i) => {
      const recentStripe = !roundedSortedVerticalPoints[i + 1],
        lineWidth = recentStripe ? x + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
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