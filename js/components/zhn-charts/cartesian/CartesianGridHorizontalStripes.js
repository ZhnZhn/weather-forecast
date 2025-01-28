"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CL = require("../CL");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _jsxRuntime = require("react/jsx-runtime");
const CartesianGridHorizontalStripes = _ref => {
  let {
    className,
    horizontalFill,
    fillOpacity,
    x,
    width,
    y0,
    points
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: points.map((entry, i) => {
      const lineHeight = (0, _CartesianGridRenderFn.getStripeLineDimension)(y0, entry, i, points);
      return lineHeight > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        y: entry,
        x: x,
        height: lineHeight,
        width: width,
        stroke: "none",
        fill: (0, _CartesianGridRenderFn.getFillByIndex)(horizontalFill, i),
        fillOpacity: fillOpacity,
        className: _CL.CL_BG
      }, `react-${i}`) : null;
    })
  });
};
var _default = exports.default = CartesianGridHorizontalStripes;
//# sourceMappingURL=CartesianGridHorizontalStripes.js.map