"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CL = require("../CL");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridVerticalStripes = _ref => {
  let {
    className,
    verticalFill,
    fillOpacity,
    y,
    height,
    x0,
    points
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: points.map((entry, i) => {
      const lineWidth = (0, _CartesianGridRenderFn.getStripeLineDimension)(x0, entry, i, points);
      return lineWidth > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: entry,
        y: y,
        width: lineWidth,
        height: height,
        stroke: "none",
        fill: (0, _CartesianGridRenderFn.getFillByIndex)(verticalFill, i),
        fillOpacity: fillOpacity,
        className: _CL.CL_BG
      }, `react-${i}`) : null;
    })
  });
};
var _default = exports.default = CartesianGridVerticalStripes;
//# sourceMappingURL=CartesianGridVerticalStripes.js.map