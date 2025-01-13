"use strict";

exports.__esModule = true;
exports.renderLegend = void 0;
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
const renderLegend = (chartInst, legendContent) => {
  const {
      props,
      state
    } = chartInst,
    {
      formattedGraphicalItems
    } = state,
    {
      children,
      width,
      height
    } = props,
    margin = props.margin || {},
    legendWidth = width - (margin.left || 0) - (margin.right || 0),
    _props = (0, _ChartUtils.getLegendProps)({
      children,
      formattedGraphicalItems,
      legendWidth,
      legendContent
    });
  if (!_props) {
    return null;
  }
  const {
    item,
    ...itemProps
  } = _props;
  return (0, _uiApi.cloneUiElement)(item, {
    ...itemProps,
    chartWidth: width,
    chartHeight: height,
    margin,
    onBBoxUpdate: chartInst.handleLegendBBoxUpdate
  });
};
exports.renderLegend = renderLegend;
//# sourceMappingURL=renderLegend.js.map