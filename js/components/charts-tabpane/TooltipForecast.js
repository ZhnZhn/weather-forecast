"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fTooltip = _interopRequireDefault(require("./fTooltip"));
var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));
var _TooltipRow = _interopRequireDefault(require("./TooltipRow2"));
var _TooltipRow2 = _interopRequireDefault(require("./TooltipRow1"));
var _Label = _interopRequireDefault(require("./Label.Style"));
var _jsxRuntime = require("react/jsx-runtime");
const TooltipForecast = (0, _fTooltip.default)((payload, props) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TooltipContent.default, {
  caption: props.label,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    style1: _Label.default.TEMP_DAY,
    t1: "Morn",
    v1: payload.tempMorn,
    t2: "Day",
    v2: payload.tempDay
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    style1: _Label.default.TEMP_NIGHT,
    t1: "Eve",
    v1: payload.tempEve,
    t2: "Night",
    v2: payload.tempNight
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t1: "Min",
    v1: payload.tempMin,
    style1: _Label.default.TEMP_MIN,
    t2: "Max",
    v2: payload.tempMax,
    style2: _Label.default.TEMP_MAX
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow.default, {
    t1: "Rain",
    v1: payload.rain,
    style1: _Label.default.RAIN,
    t2: "Wind",
    v2: payload.speed,
    style2: _Label.default.SPEED
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow2.default, {
    t: "Pressure",
    v: payload.pressure,
    style: _Label.default.PRESSURE
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRow2.default, {
    t: "Humidity",
    v: payload.humidity,
    style: _Label.default.SPEED
  })]
}));
var _default = exports.default = TooltipForecast;
//# sourceMappingURL=TooltipForecast.js.map