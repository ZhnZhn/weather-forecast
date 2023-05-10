"use strict";

exports.__esModule = true;
exports.getTooltipContent = void 0;
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _chartFn = require("./chartFn");
/**
 * Get the content to be displayed in the tooltip
 * @param  {Object} state          Current state
 * @param  {Array}  chartData      The data defined in chart
 * @param  {Number} activeIndex    Active index of data
 * @param  {String} activeLabel    Active label of data
 * @return {Array}                 The content of tooltip
 */
var getTooltipContent = function getTooltipContent(state, chartData, activeIndex, activeLabel) {
  var graphicalItems = state.graphicalItems,
    tooltipAxis = state.tooltipAxis,
    displayedData = (0, _chartFn.getDisplayedData)(chartData, state);
  if (activeIndex < 0 || !graphicalItems || !graphicalItems.length || activeIndex >= displayedData.length) {
    return null;
  }
  // get data by activeIndex when the axis don't allow duplicated category
  return graphicalItems.reduce(function (result, child) {
    var hide = child.props.hide;
    if (hide) {
      return result;
    }
    var data = child.props.data,
      payload = tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory ? (0, _DataUtils.findEntryInArray)(data || displayedData, tooltipAxis.dataKey, activeLabel) : data && data[activeIndex] || displayedData[activeIndex];
    return payload ? [].concat(result, [(0, _ChartUtils.getTooltipItem)(child, payload)]) : result;
  }, []);
};
exports.getTooltipContent = getTooltipContent;
//# sourceMappingURL=getTooltipContent.js.map