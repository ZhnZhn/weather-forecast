"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fTooltip = _interopRequireDefault(require("./fTooltip"));
var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));
var _TooltipRow = _interopRequireDefault(require("./TooltipRow1"));
var _jsxRuntime = require("react/jsx-runtime");
const TooltipUvi = (0, _fTooltip.default)(payload => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipContent.default, {
  caption: payload.day + ":00",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t: "UV index",
    v: payload.uvi
  })
}));
var _default = exports.default = TooltipUvi;
//# sourceMappingURL=TooltipUvi.js.map