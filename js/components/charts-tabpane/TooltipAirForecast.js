"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fTooltip = _interopRequireDefault(require("./fTooltip"));
var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));
var _TooltipRow = _interopRequireDefault(require("./TooltipRow2"));
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const TooltipAirForecast = (0, _fTooltip.default)(payload => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipContent.default, {
  caption: payload.dt_text,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t1: "AQI",
    v1: payload.aqi,
    style1: _Label.S_SPEED,
    t2: "CO",
    v2: payload.co,
    style2: _Label.S_PRESSURE
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t1: "NO2",
    v1: payload.no2,
    t2: "O3",
    v2: payload.o3
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t1: "PM10",
    v1: payload.pm10,
    t2: "PM2.5",
    v2: payload.pm2_5
  })]
}));
var _default = exports.default = TooltipAirForecast;
//# sourceMappingURL=TooltipAirForecast.js.map