"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianGrid = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _getTicks = require("./getTicks");
var _CartesianAxis = require("./CartesianAxis");
var _CartesianGridBackground = _interopRequireDefault(require("./CartesianGridBackground"));
var _CartesianGridLines = require("./CartesianGridLines");
var _CartesianGridStripes = require("./CartesianGridStripes");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _isPoints = (is, points) => is && (0, _isTypeFn.isNotEmptyArr)(points);
const verticalCoordinatesGenerator = _ref => {
  let {
    xAxis,
    width,
    height,
    offset
  } = _ref;
  return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)({
    ..._CartesianAxis.CARTESIAN_AXIS_DF_PROPS,
    ...xAxis,
    ticks: (0, _ChartUtils.getTicksOfAxis)(xAxis, true),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  }), offset.left, offset.left + offset.width);
};
const horizontalCoordinatesGenerator = _ref2 => {
  let {
    yAxis,
    width,
    height,
    offset
  } = _ref2;
  return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)({
    ..._CartesianAxis.CARTESIAN_AXIS_DF_PROPS,
    ...yAxis,
    ticks: (0, _ChartUtils.getTicksOfAxis)(yAxis, true),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  }), offset.top, offset.top + offset.height);
};
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
  horizontalFill: [],
  verticalCoordinatesGenerator: verticalCoordinatesGenerator,
  horizontalCoordinatesGenerator: horizontalCoordinatesGenerator
};
const _getNumber = (value, dfValue) => (0, _isTypeFn.isNumber)(value) ? value : dfValue;
const CartesianGrid = exports.CartesianGrid = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.crProps)(DF_PROPS, props),
    {
      offset = {},
      stroke,
      ry,
      fill,
      fillOpacity,
      horizontal,
      vertical,
      horizontalFill,
      verticalFill,
      xAxis,
      yAxis,
      chartWidth,
      chartHeight,
      horizontalPoints,
      verticalPoints
    } = _props;
  let {
    x,
    y,
    width,
    height
  } = _props;
  x = _getNumber(x, offset.left);
  y = _getNumber(y, offset.top);
  width = _getNumber(width, offset.width);
  height = _getNumber(height, offset.height);
  if (!((0, _ChartUtils.validateWidthHeight)(width, height) && (0, _isTypeFn.isNumber)(x) && (0, _isTypeFn.isNumber)(y))) {
    return null;
  }
  const [_horizontalPoints, _verticalPoints] = (0, _CartesianGridRenderFn.crGridPoints)(horizontalCoordinatesGenerator, verticalCoordinatesGenerator, xAxis, yAxis, horizontalPoints, verticalPoints, {
      width: chartWidth,
      height: chartHeight,
      offset
    }),
    _lineProps = {
      offset,
      stroke
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
    }), _isPoints(horizontal, _horizontalPoints) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridLines.CartesianGridHorizontalLines, {
      className: _CL.CL_GRID_HORIZONTAL,
      x1: x,
      x2: x2,
      points: _horizontalPoints,
      props: _lineProps
    }), _isPoints(vertical, _verticalPoints) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridLines.CartesianGridVerticalLines, {
      className: _CL.CL_GRID_VERTICAL,
      y1: y,
      y2: y2,
      points: _verticalPoints,
      props: _lineProps
    }), _isPoints(horizontal, horizontalFill) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridStripes.CartesianGridHorizontalStripes, {
      className: _CL.CL_STRIPES_HORIZONTAL,
      x: x,
      width: width,
      y0: y2,
      arrFill: horizontalFill,
      fillOpacity: fillOpacity,
      points: (0, _CartesianGridRenderFn.crRoundedSortedPoints)(_horizontalPoints, y)
    }), _isPoints(vertical, verticalFill) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianGridStripes.CartesianGridVerticalStripes, {
      className: _CL.CL_STRIPES_VERTICAL,
      y: y,
      height: height,
      x0: x2,
      arrFill: verticalFill,
      fillOpacity: fillOpacity,
      points: (0, _CartesianGridRenderFn.crRoundedSortedPoints)(_verticalPoints, x)
    })]
  });
});
CartesianGrid.displayName = 'CartesianGrid';
//# sourceMappingURL=CartesianGrid.js.map