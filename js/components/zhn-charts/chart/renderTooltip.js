"use strict";

exports.__esModule = true;
exports.renderTooltip = void 0;
var _uiApi = require("../../uiApi");
const renderTooltip = (tooltipItem, isTooltipActive, activeCoordinate, activePayload, activeLabel, offset, handleCloseTooltip) => tooltipItem ? (0, _uiApi.cloneUiElement)(tooltipItem, {
  viewBox: Object.assign({}, offset, {
    x: offset.left,
    y: offset.top
  }),
  active: isTooltipActive,
  label: activeLabel,
  payload: isTooltipActive ? activePayload : [],
  coordinate: activeCoordinate,
  onClose: handleCloseTooltip
}) : null;
exports.renderTooltip = renderTooltip;
//# sourceMappingURL=renderTooltip.js.map