"use strict";

exports.__esModule = true;
exports.crYAxisWindSpeed = exports.crYAxisTemp = exports.crYAxisSnow = exports.crYAxisRain = exports.crYAxisPressure = void 0;
var _Chart = require("../charts/Chart");
var _Chart2 = require("./Chart.Style");
var _YAxisLabel = require("./YAxisLabel.Style");
var _jsxRuntime = require("react/jsx-runtime");
const crYAxisTemp = (yId, filtered) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, {
  label: _YAxisLabel.YAXIS_LABEL_TEMPERATURE,
  yAxisId: yId,
  orientation: "right",
  width: 45,
  hide: filtered.temp,
  dataKey: "temp"
});
exports.crYAxisTemp = crYAxisTemp;
const crYAxisPressure = (yId, filtered) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, Object.assign({}, _Chart2.S_YAXIS_PRESSURE, {
  label: _YAxisLabel.YAXIS_LABEL_PRESSURE,
  orientation: "right",
  width: 80
  //type="number"
  ,
  allowDecimals: !1,
  domain: ['dataMin', 'dataMax'],
  tickCount: 5,
  yAxisId: yId,
  hide: filtered.pressure,
  dataKey: "pressure"
}));
exports.crYAxisPressure = crYAxisPressure;
const crYAxisWindSpeed = function (yId, filtered, id, value) {
  if (id === void 0) {
    id = 'speed';
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, Object.assign({}, _Chart2.S_YAXIS_SPEED, {
    label: (0, _YAxisLabel.crYAxisLabelWind)(value),
    orientation: "right",
    width: 45,
    yAxisId: yId,
    hide: filtered[id],
    dataKey: id
  }));
};
exports.crYAxisWindSpeed = crYAxisWindSpeed;
const crYAxisRain = (yId, filtered) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, Object.assign({}, _Chart2.S_YAXIS_RAIN, {
  label: _YAxisLabel.YAXIS_LABEL_RAIN,
  orientation: "right",
  width: 54,
  yAxisId: yId,
  hide: filtered.rain,
  dataKey: "rain"
}));
exports.crYAxisRain = crYAxisRain;
const crYAxisSnow = (yId, filtered) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, Object.assign({}, _Chart2.S_YAXIS_SNOW, {
  label: _YAxisLabel.YAXIS_LABEL_SNOW,
  orientation: "right",
  width: 54,
  yAxisId: yId,
  hide: filtered.snow,
  dataKey: "snow"
}));
exports.crYAxisSnow = crYAxisSnow;
//# sourceMappingURL=crYAxis.js.map