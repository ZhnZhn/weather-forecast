"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderTooltip = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _ReactUtils = require("../util/ReactUtils");
var _Tooltip = require("../component/Tooltip");
var renderTooltip = function renderTooltip(chartInst) {
  var props = chartInst.props,
    state = chartInst.state,
    children = props.children,
    tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip);
  if (!tooltipItem) {
    return null;
  }
  var isTooltipActive = state.isTooltipActive,
    activeCoordinate = state.activeCoordinate,
    activePayload = state.activePayload,
    activeLabel = state.activeLabel,
    offset = state.offset;
  return (0, _uiApi.cloneElement)(tooltipItem, {
    viewBox: (0, _extends2["default"])({}, offset, {
      x: offset.left,
      y: offset.top
    }),
    active: isTooltipActive,
    label: activeLabel,
    payload: isTooltipActive ? activePayload : [],
    coordinate: activeCoordinate
  });
};
exports.renderTooltip = renderTooltip;
//# sourceMappingURL=renderTooltip.js.map