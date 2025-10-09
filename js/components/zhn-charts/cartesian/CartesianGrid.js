"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianGrid = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _DataUtils = require("../util/DataUtils");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _CartesianGridBackground = _interopRequireDefault(require("./CartesianGridBackground"));
var _CartesianGridLines = require("./CartesianGridLines");
var _CartesianGridStripes = require("./CartesianGridStripes");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _isPoints = (is, points) => is && (0, _isTypeFn.isNotEmptyArr)(points);
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
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
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
  const [horizontalPoints, verticalPoints] = (0, _CartesianGridRenderFn.crGridPoints)(_props),
    _lineProps = {
      offset: restProps.offset,
      stroke: restProps.stroke
    },
    x2 = x + width,
    y2 = y + height;
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
    }), _isPoints(horizontal, horizontalPoints) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridLines.CartesianGridHorizontalLines, {
      className: _CL.CL_GRID_HORIZONTAL,
      x1: x,
      x2: x2,
      points: horizontalPoints,
      props: _lineProps
    }), _isPoints(vertical, verticalPoints) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridLines.CartesianGridVerticalLines, {
      className: _CL.CL_GRID_VERTICAL,
      y1: y,
      y2: y2,
      points: verticalPoints,
      props: _lineProps
    }), _isPoints(horizontal, horizontalFill) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridStripes.CartesianGridHorizontalStripes, {
      className: _CL.CL_STRIPES_HORIZONTAL,
      x: x,
      width: width,
      y0: y2,
      arrFill: horizontalFill,
      fillOpacity: fillOpacity,
      points: (0, _CartesianGridRenderFn.crRoundedSortedPoints)(horizontalPoints, y)
    }), _isPoints(vertical, verticalFill) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridStripes.CartesianGridVerticalStripes, {
      className: _CL.CL_STRIPES_VERTICAL,
      y: y,
      height: height,
      x0: x2,
      arrFill: verticalFill,
      fillOpacity: fillOpacity,
      points: (0, _CartesianGridRenderFn.crRoundedSortedPoints)(verticalPoints, x)
    })]
  });
});
CartesianGrid.displayName = 'CartesianGrid';
//# sourceMappingURL=CartesianGrid.js.map