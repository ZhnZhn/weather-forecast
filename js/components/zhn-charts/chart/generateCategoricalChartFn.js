"use strict";

exports.__esModule = true;
exports.verticalCoordinatesGenerator = exports.tooltipTicksGenerator = exports.horizontalCoordinatesGenerator = exports.hasGraphicalBarItem = exports.getTooltipData = exports.getAxisNameByLayout = void 0;
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _getTicks = require("../cartesian/getTicks");
var _CartesianAxis = require("../cartesian/CartesianAxis");
var _chartFn = require("./chartFn");
var _getTooltipContent = require("./getTooltipContent");
const calculateTooltipPos = (rangeObj, layout) => (0, _ChartUtils.isLayoutHorizontal)(layout) ? rangeObj.x : (0, _ChartUtils.isLayoutVertical)(layout) ? rangeObj.y : (0, _ChartUtils.isLayoutCentric)(layout) ? rangeObj.angle : rangeObj.radius;
const getActiveCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
  const entry = tooltipTicks.find(tick => tick && tick.index === activeIndex);
  if (!entry) {
    return _chartFn.originCoordinate;
  }
  return (0, _ChartUtils.isLayoutHorizontal)(layout) ? {
    x: entry.coordinate,
    y: rangeObj.y
  }
  //vertical layout case
  : {
    x: rangeObj.x,
    y: entry.coordinate
  };
};

/**
 * Returns tooltip data based on a mouse position (as a parameter or in state)
 * @param  {Object} state     current state
 * @param  {Array}  chartData the data defined in chart
 * @param  {String} layout     The layout type of chart
 * @param  {Object} rangeObj  { x, y } coordinates
 * @return {Object}           Tooltip data data
 */
const getTooltipData = (state, chartData, layout, rangeObj) => {
  const rangeData = rangeObj || {
      x: 0,
      y: 0
    },
    pos = calculateTooltipPos(rangeData, layout),
    {
      orderedTooltipTicks: ticks,
      tooltipTicks
    } = state,
    activeIndex = (0, _ChartUtils.calculateActiveTickIndex)(pos, ticks);
  if (activeIndex >= 0 && tooltipTicks) {
    const activeLabel = tooltipTicks[activeIndex] && tooltipTicks[activeIndex].value,
      activePayload = (0, _getTooltipContent.getTooltipContent)(state, chartData, activeIndex, activeLabel),
      activeCoordinate = getActiveCoordinate(layout, ticks, activeIndex, rangeData);
    return {
      activeTooltipIndex: activeIndex,
      activeLabel,
      activePayload,
      activeCoordinate
    };
  }
  return null;
};
exports.getTooltipData = getTooltipData;
const tooltipTicksGenerator = axisMap => {
  const axis = (0, _DataUtils.getAnyElementOfObject)(axisMap),
    tooltipTicks = (0, _ChartUtils.getTicksOfAxis)(axis, false, true);
  return {
    tooltipTicks,
    orderedTooltipTicks: tooltipTicks.sort(o => o.coordinate)
  };
};
exports.tooltipTicksGenerator = tooltipTicksGenerator;
const hasGraphicalBarItem = graphicalItems => !graphicalItems || !graphicalItems.length ? false : graphicalItems.some(item => {
  const name = (0, _ReactUtils.getDisplayName)(item && item.type);
  return name && name.indexOf('Bar') >= 0;
});
exports.hasGraphicalBarItem = hasGraphicalBarItem;
const _crAxisName = (numericAxisName, cateAxisName) => ({
  numericAxisName,
  cateAxisName
});
const getAxisNameByLayout = layout => (0, _ChartUtils.isLayoutHorizontal)(layout) ? _crAxisName('yAxis', 'xAxis') : (0, _ChartUtils.isLayoutVertical)(layout) ? _crAxisName('xAxis', 'yAxis') : (0, _ChartUtils.isLayoutCentric)(layout) ? _crAxisName('radiusAxis', 'angleAxis') : _crAxisName('angleAxis', 'radiusAxis');
exports.getAxisNameByLayout = getAxisNameByLayout;
const verticalCoordinatesGenerator = _ref => {
  let {
    xAxis,
    width,
    height,
    offset
  } = _ref;
  return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)(Object.assign({}, _CartesianAxis.CARTESIAN_AXIS_DF_PROPS, xAxis, {
    ticks: (0, _ChartUtils.getTicksOfAxis)(xAxis, true),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.left, offset.left + offset.width);
};
exports.verticalCoordinatesGenerator = verticalCoordinatesGenerator;
const horizontalCoordinatesGenerator = _ref2 => {
  let {
    yAxis,
    width,
    height,
    offset
  } = _ref2;
  return (0, _ChartUtils.getCoordinatesOfGrid)((0, _getTicks.getTicks)(Object.assign({}, _CartesianAxis.CARTESIAN_AXIS_DF_PROPS, yAxis, {
    ticks: (0, _ChartUtils.getTicksOfAxis)(yAxis, true),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.top, offset.top + offset.height);
};
exports.horizontalCoordinatesGenerator = horizontalCoordinatesGenerator;
//# sourceMappingURL=generateCategoricalChartFn.js.map