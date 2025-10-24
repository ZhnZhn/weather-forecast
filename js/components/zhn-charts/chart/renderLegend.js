"use strict";

exports.__esModule = true;
exports.renderLegend = void 0;
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
const _calcLegendWidth = (width, margin) => width - (margin.left || 0) - (margin.right || 0);
const renderLegend = chartInst => {
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
    [_legendProps, _legendItem] = (0, _ChartUtils.getLegendProps)({
      children,
      formattedGraphicalItems,
      legendWidth: _calcLegendWidth(width, margin)
    });
  return _legendProps ? (0, _uiApi.cloneUiElement)(_legendItem, Object.assign({}, _legendProps, {
    chartWidth: width || 0,
    chartHeight: height || 0,
    margin,
    onBBoxUpdate: chartInst.handleLegendBBoxUpdate
  })) : null;
};
exports.renderLegend = renderLegend;
//# sourceMappingURL=renderLegend.js.map