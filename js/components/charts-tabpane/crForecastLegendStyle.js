"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Label = _interopRequireDefault(require("./Label.Style"));

var _assign = Object.assign;

var _crLabelStyle = function _crLabelStyle(is, style) {
  return is ? _assign({}, style, _Label["default"].POINTER, _Label["default"].FILTERED) : _assign({}, style, _Label["default"].POINTER);
};

var crForecastLegendStyle = function crForecastLegendStyle(filtered) {
  var _styles = {};
  _styles.tempMorn = _crLabelStyle(filtered.tempMorn, _Label["default"].TEMP_DAY);
  _styles.tempDay = _crLabelStyle(filtered.tempDay, _Label["default"].TEMP_DAY);
  _styles.tempEve = _crLabelStyle(filtered.tempEve, _Label["default"].TEMP_NIGHT);
  _styles.tempNight = _crLabelStyle(filtered.tempNight, _Label["default"].TEMP_NIGHT);
  _styles.tempMax = _crLabelStyle(filtered.tempMax, _Label["default"].TEMP_MAX);
  _styles.tempMin = _crLabelStyle(filtered.tempMin, _Label["default"].TEMP_MIN);
  _styles.rain = _crLabelStyle(filtered.rain, _Label["default"].RAIN);
  _styles.speed = _crLabelStyle(filtered.speed, _Label["default"].SPEED);
  _styles.pressure = _crLabelStyle(filtered.pressure, _Label["default"].PRESSURE);
  _styles.humidity = _crLabelStyle(filtered.humidity, _Label["default"].HUMIDITY);
  return _styles;
};

var _default = crForecastLegendStyle;
exports["default"] = _default;
//# sourceMappingURL=crForecastLegendStyle.js.map