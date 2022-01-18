"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crYAxisWindSpeed = exports.crYAxisTemp = exports.crYAxisSnow = exports.crYAxisRain = exports.crYAxisPressure = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _YAxisLabel = require("./YAxisLabel.Style");

var _jsxRuntime = require("react/jsx-runtime");

var YAxis = _Chart["default"].YAxis;

var crYAxisTemp = function crYAxisTemp(yId, filtered) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, {
    label: _YAxisLabel.YAXIS_LABEL_TEMPERATURE,
    yAxisId: yId,
    orientation: "right",
    width: 45,
    hide: filtered.temp,
    dataKey: "temp"
  });
};

exports.crYAxisTemp = crYAxisTemp;

var crYAxisPressure = function crYAxisPressure(yId, filtered) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisPressure, {
    label: _YAxisLabel.YAXIS_LABEL_PRESSURE,
    orientation: "right",
    width: 80,
    type: "number",
    domain: ['dataMin', 'dataMax'],
    yAxisId: yId,
    hide: filtered.pressure,
    dataKey: "pressure"
  }));
};

exports.crYAxisPressure = crYAxisPressure;

var crYAxisWindSpeed = function crYAxisWindSpeed(yId, filtered, id, value) {
  if (id === void 0) {
    id = 'speed';
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisSpeed, {
    label: (0, _YAxisLabel.crYAxisLabelWind)(value),
    orientation: "right",
    width: 45,
    yAxisId: yId,
    hide: filtered[id],
    dataKey: id
  }));
};

exports.crYAxisWindSpeed = crYAxisWindSpeed;

var crYAxisRain = function crYAxisRain(yId, filtered) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisRain, {
    label: _YAxisLabel.YAXIS_LABEL_RAIN,
    orientation: "right",
    width: 54,
    yAxisId: yId,
    hide: filtered.rain,
    dataKey: "rain"
  }));
};

exports.crYAxisRain = crYAxisRain;

var crYAxisSnow = function crYAxisSnow(yId, filtered) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisSnow, {
    label: _YAxisLabel.YAXIS_LABEL_SNOW,
    orientation: "right",
    width: 54,
    yAxisId: yId,
    hide: filtered.snow,
    dataKey: "snow"
  }));
};

exports.crYAxisSnow = crYAxisSnow;
//# sourceMappingURL=crYAxis.js.map