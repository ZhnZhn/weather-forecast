"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderLegend = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _ChartUtils = require("../util/ChartUtils");
var _excluded = ["item"];
var renderLegend = function renderLegend(chartInst, legendContent) {
  var props = chartInst.props,
    state = chartInst.state,
    formattedGraphicalItems = state.formattedGraphicalItems,
    children = props.children,
    width = props.width,
    height = props.height,
    margin = props.margin || {},
    legendWidth = width - (margin.left || 0) - (margin.right || 0),
    _props = (0, _ChartUtils.getLegendProps)({
      children: children,
      formattedGraphicalItems: formattedGraphicalItems,
      legendWidth: legendWidth,
      legendContent: legendContent
    });
  if (!_props) {
    return null;
  }
  var item = _props.item,
    itemProps = (0, _objectWithoutPropertiesLoose2["default"])(_props, _excluded);
  return (0, _uiApi.cloneElement)(item, (0, _extends2["default"])({}, itemProps, {
    chartWidth: width,
    chartHeight: height,
    margin: margin,
    ref: chartInst._refLegend,
    onBBoxUpdate: chartInst.handleLegendBBoxUpdate
  }));
};
exports.renderLegend = renderLegend;
//# sourceMappingURL=renderLegend.js.map