"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crYAxisLabelWind = exports.YAXIS_LABEL_TEMPERATURE = exports.YAXIS_LABEL_SNOW = exports.YAXIS_LABEL_RAIN = exports.YAXIS_LABEL_PRESSURE = void 0;
var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));
const LABEL_POSITION = {
  position: "top",
  offset: 10
};
const _crLabelColor = color => ({
  stroke: color,
  fill: color
});
const YAXIS_LABEL_TEMPERATURE = exports.YAXIS_LABEL_TEMPERATURE = Object.assign({}, LABEL_POSITION, {
  value: "°C"
});
const YAXIS_LABEL_PRESSURE = exports.YAXIS_LABEL_PRESSURE = Object.assign({}, LABEL_POSITION, _crLabelColor(_SeriesColor.default.PRESSURE), {
  value: "hPa",
  xTopOffset: -10
});
const crYAxisLabelWind = function (value) {
  if (value === void 0) {
    value = 'm/s';
  }
  return Object.assign({}, LABEL_POSITION, _crLabelColor(_SeriesColor.default.SPEED), {
    value
  });
};
exports.crYAxisLabelWind = crYAxisLabelWind;
const YAXIS_LABEL_RAIN = exports.YAXIS_LABEL_RAIN = Object.assign({}, LABEL_POSITION, _crLabelColor(_SeriesColor.default.RAIN), {
  value: "mm"
});
const YAXIS_LABEL_SNOW = exports.YAXIS_LABEL_SNOW = Object.assign({}, YAXIS_LABEL_RAIN, _crLabelColor(_SeriesColor.default.SNOW));
//# sourceMappingURL=YAxisLabel.Style.js.map