"use strict";

exports.__esModule = true;
exports.renderTooltip = void 0;
var _uiApi = require("../../uiApi");
const renderTooltip = (tooltipItem, offset, handleCloseTooltip) => tooltipItem ? (0, _uiApi.cloneUiElement)(tooltipItem, {
  viewBox: Object.assign({}, offset, {
    x: offset.left,
    y: offset.top
  }),
  onClose: handleCloseTooltip
}) : null;
exports.renderTooltip = renderTooltip;
//# sourceMappingURL=renderTooltip.js.map