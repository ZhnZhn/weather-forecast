"use strict";

exports.__esModule = true;
exports.hasGraphicalBarItem = exports.getTooltipData = exports.getOrderedTooltipTicks = exports.getAxisNameByLayout = void 0;
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
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
const getTooltipData = (orderedTooltipTicks, graphicalItems, dataStartIndex, dataEndIndex, chartData, layout, rangeObj) => {
  const rangeData = rangeObj || {
      x: 0,
      y: 0
    },
    pos = calculateTooltipPos(rangeData, layout),
    activeIndex = (0, _ChartUtils.calculateActiveTickIndex)(pos, orderedTooltipTicks);
  if (activeIndex >= 0 && orderedTooltipTicks) {
    const activeLabel = orderedTooltipTicks[activeIndex] && orderedTooltipTicks[activeIndex].value,
      activePayload = (0, _getTooltipContent.getTooltipContent)(graphicalItems, dataStartIndex, dataEndIndex, chartData, activeIndex, activeLabel),
      activeCoordinate = getActiveCoordinate(layout, orderedTooltipTicks, activeIndex, rangeData);
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
const getOrderedTooltipTicks = axisMap => (0, _ChartUtils.getTicksOfAxis)((0, _DataUtils.getAnyElementOfObject)(axisMap), false, true).sort(o => o.coordinate);
exports.getOrderedTooltipTicks = getOrderedTooltipTicks;
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
//# sourceMappingURL=generateCategoricalChartFn.js.map