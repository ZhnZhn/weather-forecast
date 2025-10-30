"use strict";

exports.__esModule = true;
exports.renderTooltip = void 0;
var _uiApi = require("../../uiApi");
var _ReactUtils = require("../util/ReactUtils");
var _Tooltip = require("../component/Tooltip");
const renderTooltip = chartInst => {
  const {
      props,
      state
    } = chartInst,
    {
      children
    } = props,
    tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip);
  if (!tooltipItem) {
    return null;
  }
  const {
    isTooltipActive,
    activeCoordinate,
    activePayload,
    activeLabel,
    offset
  } = state;
  return (0, _uiApi.cloneUiElement)(tooltipItem, {
    viewBox: Object.assign({}, offset, {
      x: offset.left,
      y: offset.top
    }),
    active: isTooltipActive,
    label: activeLabel,
    payload: isTooltipActive ? activePayload : [],
    coordinate: activeCoordinate,
    onClose: chartInst.handleCloseTooltip
  });
};
exports.renderTooltip = renderTooltip;
//# sourceMappingURL=renderTooltip.js.map