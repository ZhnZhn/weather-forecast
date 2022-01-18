"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.YAXIS_LABEL_WIND = exports.YAXIS_LABEL_TEMPERATURE = exports.YAXIS_LABEL_SNOW = exports.YAXIS_LABEL_RAIN = exports.YAXIS_LABEL_PRESSURE = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));

var LABEL_POSITION = {
  position: "top",
  offset: 10
};

var _crLabelColor = function _crLabelColor(color) {
  return {
    stroke: color,
    fill: color
  };
};

var YAXIS_LABEL_TEMPERATURE = (0, _extends2["default"])({}, LABEL_POSITION, {
  value: "°C"
});
exports.YAXIS_LABEL_TEMPERATURE = YAXIS_LABEL_TEMPERATURE;
var YAXIS_LABEL_PRESSURE = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].PRESSURE), {
  value: "hPa"
});
exports.YAXIS_LABEL_PRESSURE = YAXIS_LABEL_PRESSURE;
var YAXIS_LABEL_WIND = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].SPEED), {
  value: "m/s"
});
exports.YAXIS_LABEL_WIND = YAXIS_LABEL_WIND;
var YAXIS_LABEL_RAIN = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].RAIN), {
  value: "mm"
});
exports.YAXIS_LABEL_RAIN = YAXIS_LABEL_RAIN;
var YAXIS_LABEL_SNOW = (0, _extends2["default"])({}, YAXIS_LABEL_RAIN, _crLabelColor(_SeriesColor["default"].SNOW));
exports.YAXIS_LABEL_SNOW = YAXIS_LABEL_SNOW;
//# sourceMappingURL=YAxisLabel.Style.js.map