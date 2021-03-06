"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Label = _interopRequireDefault(require("./Label.Style"));

var _assign = Object.assign;

var _crLabelStyle = function _crLabelStyle(is, style) {
  return is ? _assign({}, style, _Label["default"].POINTER) : _assign({}, style, _Label["default"].POINTER, _Label["default"].FILTERED);
};

var crForecastLegendStyle = function crForecastLegendStyle(filters) {
  var _styles = {};
  _styles.tempMorn = _crLabelStyle(filters.tempMorn, _Label["default"].TEMP_DAY);
  _styles.tempDay = _crLabelStyle(filters.tempDay, _Label["default"].TEMP_DAY);
  _styles.tempEve = _crLabelStyle(filters.tempEve, _Label["default"].TEMP_NIGHT);
  _styles.tempNight = _crLabelStyle(filters.tempNight, _Label["default"].TEMP_NIGHT);
  _styles.tempMax = _crLabelStyle(filters.tempMax, _Label["default"].TEMP_MAX);
  _styles.tempMin = _crLabelStyle(filters.tempMin, _Label["default"].TEMP_MIN);
  _styles.rain = _crLabelStyle(filters.rain, _Label["default"].RAIN);
  _styles.speed = _crLabelStyle(filters.speed, _Label["default"].SPEED);
  _styles.pressure = _crLabelStyle(filters.pressure, _Label["default"].PRESSURE);
  _styles.humidity = _crLabelStyle(filters.humidity, _Label["default"].HUMIDITY);
  return _styles;
};

var _default = crForecastLegendStyle;
exports["default"] = _default;
//# sourceMappingURL=crForecastLegendStyle.js.map