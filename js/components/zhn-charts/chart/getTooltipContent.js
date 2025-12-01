"use strict";

exports.__esModule = true;
exports.getTooltipContent = void 0;
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
const getTooltipContent = (graphicalItems, chartData, activeIndex, activeLabel) => {
  const displayedData = (0, _chartFn.getDisplayedData)(chartData, {
    graphicalItems
  });
  if (activeIndex < 0 || !graphicalItems || !graphicalItems.length || activeIndex >= displayedData.length) {
    return null;
  }

  // get data by activeIndex when the axis don't allow duplicated category
  return graphicalItems.reduce((result, child) => {
    const {
      hide
    } = child.props;
    if (hide) {
      return result;
    }
    const {
        data
      } = child.props,
      payload = data && data[activeIndex] || displayedData[activeIndex];
    return payload ? [...result, (0, _ChartUtils.getTooltipItem)(child, payload)] : result;
  }, []);
};
exports.getTooltipContent = getTooltipContent;
//# sourceMappingURL=getTooltipContent.js.map