"use strict";

exports.__esModule = true;
exports.isItemTypeBar = exports.getTooltipData = exports.getOrderedTooltipTicks = exports.getComposedDataFn = exports.getBarSizeList = exports.getAxisNameByLayout = void 0;
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _Bar = require("../cartesian/Bar");
var _Line = require("../cartesian/Line");
var _chartFn = require("./chartFn");
var _getTooltipContent = require("./getTooltipContent");
const _calculateTooltipPos = (rangeObj, layout) => (0, _ChartUtils.isLayoutHorizontal)(layout) ? rangeObj.x : rangeObj.y;
const _getActiveCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
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
const getTooltipData = (orderedTooltipTicks, graphicalItems, chartData, layout, rangeObj) => {
  const rangeData = rangeObj || {
      x: 0,
      y: 0
    },
    pos = _calculateTooltipPos(rangeData, layout),
    activeIndex = (0, _ChartUtils.calculateActiveTickIndex)(pos, orderedTooltipTicks);
  if (activeIndex >= 0 && orderedTooltipTicks) {
    const activeLabel = orderedTooltipTicks[activeIndex] && orderedTooltipTicks[activeIndex].value,
      activePayload = (0, _getTooltipContent.getTooltipContent)(graphicalItems, chartData, activeIndex, activeLabel),
      activeCoordinate = _getActiveCoordinate(layout, orderedTooltipTicks, activeIndex, rangeData);
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
const _fIsItemType = strType => item => ((0, _ReactUtils.getDisplayName)(item && item.type) || '').indexOf(strType) >= 0;
const isItemTypeBar = exports.isItemTypeBar = _fIsItemType('Bar');
const _isItemTypeLine = _fIsItemType('Line');
const getBarSizeList = (graphicalItems, barSize) => (graphicalItems || []).filter(isItemTypeBar).map(item => {
  var _item$props$barSize;
  return {
    item,
    barSize: (_item$props$barSize = item.props.barSize) != null ? _item$props$barSize : barSize,
    stackList: []
  };
});
exports.getBarSizeList = getBarSizeList;
const getComposedDataFn = item => isItemTypeBar(item) ? _Bar.getBarComposedData : _isItemTypeLine(item) ? _Line.getLineComposedData : void 0;
exports.getComposedDataFn = getComposedDataFn;
const _crAxisName = (numericAxisName, cateAxisName) => ({
  numericAxisName,
  cateAxisName
});
const getAxisNameByLayout = layout => (0, _ChartUtils.isLayoutHorizontal)(layout) ? _crAxisName('yAxis', 'xAxis') : _crAxisName('xAxis', 'yAxis');
exports.getAxisNameByLayout = getAxisNameByLayout;
//# sourceMappingURL=generateCategoricalChartFn.js.map