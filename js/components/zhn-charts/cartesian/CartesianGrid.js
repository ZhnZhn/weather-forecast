"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianGrid = void 0;
var _uiApi = require("../../uiApi");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _CartesianGridBackground = _interopRequireDefault(require("./CartesianGridBackground"));
var _CartesianGridHorizontalLines = _interopRequireDefault(require("./CartesianGridHorizontalLines"));
var _CartesianGridVerticalLines = _interopRequireDefault(require("./CartesianGridVerticalLines"));
var _CartesianGridVerticalStripes = _interopRequireDefault(require("./CartesianGridVerticalStripes"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const DF_PROPS = {
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: '#ccc',
  fill: 'none',
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
const CartesianGrid = exports.CartesianGrid = (0, _uiApi.memo)(props => {
  const _props = (0, _ReactUtils.crProps)(DF_PROPS, props),
    {
      x,
      y,
      ry,
      width,
      height,
      fill,
      fillOpacity,
      horizontal,
      vertical,
      horizontalFill,
      verticalFill,
      ...restProps
    } = _props;
  if (!((0, _DataUtils.isPositiveNumber)(width) && (0, _DataUtils.isPositiveNumber)(height) && (0, _DataUtils.isNumber)(x) && (0, _DataUtils.isNumber)(y))) {
    return null;
  }
  const [horizontalPoints, verticalPoints] = (0, _CartesianGridRenderFn.crGridPoints)(_props);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: _CL.CL_CARTESIAN_GRID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridBackground.default, {
      className: _CL.CL_BG,
      fill: fill,
      fillOpacity: fillOpacity,
      x: x,
      y: y,
      ry: ry,
      width: width,
      height: height
    }), horizontal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridHorizontalLines.default, {
      className: _CL.CL_GRID_HORIZONTAL,
      x: x,
      width: width,
      points: horizontalPoints,
      props: restProps
    }), vertical && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridVerticalLines.default, {
      className: _CL.CL_GRID_VERTICAL,
      y: y,
      height: height,
      points: verticalPoints,
      props: restProps
    }), horizontal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridHorizontalLines.default, {
      className: _CL.CL_STRIPES_HORIZONTAL,
      x: x,
      y: y,
      width: width,
      height: height,
      fillOpacity: fillOpacity,
      horizontalFill: horizontalFill,
      horizontalPoints: horizontalPoints
    }), vertical && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridVerticalStripes.default, {
      className: _CL.CL_STRIPES_VERTICAL,
      x: x,
      y: y,
      width: width,
      height: height,
      fillOpacity: fillOpacity,
      verticalFill: verticalFill,
      verticalPoints: verticalPoints
    })]
  });
});
CartesianGrid.displayName = 'CartesianGrid';
//# sourceMappingURL=CartesianGrid.js.map