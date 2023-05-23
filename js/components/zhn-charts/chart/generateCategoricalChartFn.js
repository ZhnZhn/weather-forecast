"use strict";

exports.__esModule = true;
exports.tooltipTicksGenerator = exports.hasGraphicalBarItem = exports.getTooltipData = exports.getAxisNameByLayout = exports.deferClear = exports.defer = void 0;
var _FnUtils = require("../util/FnUtils");
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _chartFn = require("./chartFn");
var _getTooltipContent = require("./getTooltipContent");
var defer = (0, _FnUtils._isFn)(requestAnimationFrame) ? requestAnimationFrame : (0, _FnUtils._isFn)(window.setImmediate) ? window.setImmediate : setTimeout;
exports.defer = defer;
var deferClear = (0, _FnUtils._isFn)(cancelAnimationFrame) ? cancelAnimationFrame : (0, _FnUtils._isFn)(window.clearImmediate) ? window.clearImmediate : clearTimeout;
exports.deferClear = deferClear;
var calculateTooltipPos = function calculateTooltipPos(rangeObj, layout) {
  return (0, _chartFn.isLayoutHorizontal)(layout) ? rangeObj.x : (0, _chartFn.isLayoutVertical)(layout) ? rangeObj.y : (0, _chartFn.isLayoutCentric)(layout) ? rangeObj.angle : rangeObj.radius;
};
var getActiveCoordinate = function getActiveCoordinate(layout, tooltipTicks, activeIndex, rangeObj) {
  var entry = tooltipTicks.find(function (tick) {
    return tick && tick.index === activeIndex;
  });
  if (!entry) {
    return _chartFn.originCoordinate;
  }
  return (0, _chartFn.isLayoutHorizontal)(layout) ? {
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
var getTooltipData = function getTooltipData(state, chartData, layout, rangeObj) {
  var rangeData = rangeObj || {
      x: state.chartX,
      y: state.chartY
    },
    pos = calculateTooltipPos(rangeData, layout),
    ticks = state.orderedTooltipTicks,
    axis = state.tooltipAxis,
    tooltipTicks = state.tooltipTicks,
    activeIndex = (0, _ChartUtils.calculateActiveTickIndex)(pos, ticks, tooltipTicks, axis);
  if (activeIndex >= 0 && tooltipTicks) {
    var activeLabel = tooltipTicks[activeIndex] && tooltipTicks[activeIndex].value,
      activePayload = (0, _getTooltipContent.getTooltipContent)(state, chartData, activeIndex, activeLabel),
      activeCoordinate = getActiveCoordinate(layout, ticks, activeIndex, rangeData);
    return {
      activeTooltipIndex: activeIndex,
      activeLabel: activeLabel,
      activePayload: activePayload,
      activeCoordinate: activeCoordinate
    };
  }
  return null;
};
exports.getTooltipData = getTooltipData;
var tooltipTicksGenerator = function tooltipTicksGenerator(axisMap) {
  var axis = (0, _DataUtils.getAnyElementOfObject)(axisMap),
    tooltipTicks = (0, _ChartUtils.getTicksOfAxis)(axis, false, true);
  return {
    tooltipTicks: tooltipTicks,
    //orderedTooltipTicks: _sortBy(tooltipTicks, o => o.coordinate),
    orderedTooltipTicks: tooltipTicks.sort(function (o) {
      return o.coordinate;
    }),
    tooltipAxis: axis,
    tooltipAxisBandSize: (0, _ChartUtils.getBandSizeOfAxis)(axis, tooltipTicks)
  };
};
exports.tooltipTicksGenerator = tooltipTicksGenerator;
var hasGraphicalBarItem = function hasGraphicalBarItem(graphicalItems) {
  return !graphicalItems || !graphicalItems.length ? false : graphicalItems.some(function (item) {
    var name = (0, _ReactUtils.getDisplayName)(item && item.type);
    return name && name.indexOf('Bar') >= 0;
  });
};
exports.hasGraphicalBarItem = hasGraphicalBarItem;
var getAxisNameByLayout = function getAxisNameByLayout(layout) {
  return (0, _chartFn.isLayoutHorizontal)(layout) ? {
    numericAxisName: 'yAxis',
    cateAxisName: 'xAxis'
  } : (0, _chartFn.isLayoutVertical)(layout) ? {
    numericAxisName: 'xAxis',
    cateAxisName: 'yAxis'
  } : (0, _chartFn.isLayoutCentric)(layout) ? {
    numericAxisName: 'radiusAxis',
    cateAxisName: 'angleAxis'
  } : {
    numericAxisName: 'angleAxis',
    cateAxisName: 'radiusAxis'
  };
};
exports.getAxisNameByLayout = getAxisNameByLayout;
//# sourceMappingURL=generateCategoricalChartFn.js.map