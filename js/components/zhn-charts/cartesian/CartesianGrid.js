"use strict";

exports.__esModule = true;
exports.CartesianGrid = void 0;
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _CartesianGridRenderFn = require("./CartesianGridRenderFn");
var _jsxRuntime = require("react/jsx-runtime");
var CartesianGrid = (0, _uiApi.memo)(function (props) {
  var x = props.x,
    y = props.y,
    width = props.width,
    height = props.height,
    horizontal = props.horizontal,
    vertical = props.vertical,
    horizontalCoordinatesGenerator = props.horizontalCoordinatesGenerator,
    verticalCoordinatesGenerator = props.verticalCoordinatesGenerator,
    xAxis = props.xAxis,
    yAxis = props.yAxis,
    offset = props.offset,
    chartWidth = props.chartWidth,
    chartHeight = props.chartHeight;
  if (!(0, _DataUtils.isNumber)(width) || width <= 0 || !(0, _DataUtils.isNumber)(height) || height <= 0 || !(0, _DataUtils.isNumber)(x) || x !== +x || !(0, _DataUtils.isNumber)(y) || y !== +y) {
    return null;
  }
  var horizontalPoints = props.horizontalPoints,
    verticalPoints = props.verticalPoints;
  // No horizontal points are specified
  if ((!horizontalPoints || !horizontalPoints.length) && (0, _FnUtils._isFn)(horizontalCoordinatesGenerator)) {
    horizontalPoints = horizontalCoordinatesGenerator({
      yAxis: yAxis,
      width: chartWidth,
      height: chartHeight,
      offset: offset
    });
  }

  // No vertical points are specified
  if ((!verticalPoints || !verticalPoints.length) && (0, _FnUtils._isFn)(verticalCoordinatesGenerator)) {
    verticalPoints = verticalCoordinatesGenerator({
      xAxis: xAxis,
      width: chartWidth,
      height: chartHeight,
      offset: offset
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: _CartesianGridRenderFn.CL_CARTESIAN_GRID,
    children: [(0, _CartesianGridRenderFn.renderBackground)(props), horizontal && (0, _CartesianGridRenderFn.renderHorizontal)(horizontalPoints, props), vertical && (0, _CartesianGridRenderFn.renderVertical)(verticalPoints, props), horizontal && (0, _CartesianGridRenderFn.renderHorizontalStripes)(horizontalPoints, props), vertical && (0, _CartesianGridRenderFn.renderVerticalStripes)(verticalPoints, props)]
  });
});
exports.CartesianGrid = CartesianGrid;
CartesianGrid.displayName = 'CartesianGrid';
CartesianGrid.defaultProps = {
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
//# sourceMappingURL=CartesianGrid.js.map