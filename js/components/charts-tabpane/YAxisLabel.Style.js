"use strict";

exports.__esModule = true;
exports.crYAxisLabelWind = exports.YAXIS_LABEL_TEMPERATURE = exports.YAXIS_LABEL_SNOW = exports.YAXIS_LABEL_RAIN = exports.YAXIS_LABEL_PRESSURE = exports.YAXIS_LABEL_POSITION = void 0;
var _Chart = require("../charts/Chart");
var _SeriesColor = require("./SeriesColor");
const YAXIS_LABEL_POSITION = exports.YAXIS_LABEL_POSITION = {
  position: _Chart.labelTopFn,
  offset: 10
};
const _crLabelColor = color => ({
  stroke: color,
  fill: color
});
const YAXIS_LABEL_TEMPERATURE = exports.YAXIS_LABEL_TEMPERATURE = {
  ...YAXIS_LABEL_POSITION,
  value: "°C"
};
const YAXIS_LABEL_PRESSURE = exports.YAXIS_LABEL_PRESSURE = {
  ...YAXIS_LABEL_POSITION,
  ..._crLabelColor(_SeriesColor.PRESSURE_COLOR),
  value: "hPa",
  xTopOffset: -10
};
const crYAxisLabelWind = function (value) {
  if (value === void 0) {
    value = 'm/s';
  }
  return {
    ...YAXIS_LABEL_POSITION,
    ..._crLabelColor(_SeriesColor.SPEED_COLOR),
    value
  };
};
exports.crYAxisLabelWind = crYAxisLabelWind;
const YAXIS_LABEL_RAIN = exports.YAXIS_LABEL_RAIN = {
  ...YAXIS_LABEL_POSITION,
  ..._crLabelColor(_SeriesColor.RAIN_COLOR),
  value: "mm"
};
const YAXIS_LABEL_SNOW = exports.YAXIS_LABEL_SNOW = {
  ...YAXIS_LABEL_RAIN,
  ..._crLabelColor(_SeriesColor.SNOW_COLOR)
};
//# sourceMappingURL=YAxisLabel.Style.js.map