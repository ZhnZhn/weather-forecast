"use strict";

exports.__esModule = true;
exports.useTooltip = exports.TooltipProvider = void 0;
var _uiApi = require("../../uiApi");
const TooltipContext = (0, _uiApi.createContext)();
const TooltipProvider = exports.TooltipProvider = TooltipContext.Provider;
const DF_USE_TOOLTIP = () => ({});
const useTooltip = () => {
  const _useTooltip = (0, _uiApi.useContext)(TooltipContext) || DF_USE_TOOLTIP;
  return _useTooltip();
};
exports.useTooltip = useTooltip;
//# sourceMappingURL=TooltipContext.js.map