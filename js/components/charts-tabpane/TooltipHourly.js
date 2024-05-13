"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fTooltip = _interopRequireDefault(require("./fTooltip"));
var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));
var _TooltipRow = _interopRequireDefault(require("./TooltipRow1"));
var _Label = _interopRequireDefault(require("./Label.Style"));
var _jsxRuntime = require("react/jsx-runtime");
const TooltipHourly = (0, _fTooltip.default)(payload => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipContent.default, {
  caption: payload.dt_text,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t: "Temp",
    v: payload.temp
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t: "Pressure",
    v: payload.pressure,
    style: _Label.default.PRESSURE
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t: "Speed",
    v: payload.speed,
    style: _Label.default.SPEED
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t: "Rain",
    v: payload.rain,
    s: _Label.default.RAIN
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t: "Snow",
    v: payload.snow,
    s: _Label.default.RAIN
  })]
}));
var _default = exports.default = TooltipHourly;
//# sourceMappingURL=TooltipHourly.js.map