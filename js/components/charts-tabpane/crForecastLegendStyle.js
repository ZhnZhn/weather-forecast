"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Label = _interopRequireDefault(require("./Label.Style"));

var _assign = Object.assign,
    _crLabelStyle = function _crLabelStyle(is, style) {
  return is ? _assign({}, style, _Label["default"].POINTER, _Label["default"].FILTERED) : _assign({}, style, _Label["default"].POINTER);
};

var crForecastLegendStyle = function crForecastLegendStyle(filtered) {
  return _assign({}, {
    tempMorn: _crLabelStyle(filtered.tempMorn, _Label["default"].TEMP_DAY),
    tempDay: _crLabelStyle(filtered.tempDay, _Label["default"].TEMP_DAY),
    tempEve: _crLabelStyle(filtered.tempEve, _Label["default"].TEMP_NIGHT),
    tempNight: _crLabelStyle(filtered.tempNight, _Label["default"].TEMP_NIGHT),
    tempMax: _crLabelStyle(filtered.tempMax, _Label["default"].TEMP_MAX),
    tempMin: _crLabelStyle(filtered.tempMin, _Label["default"].TEMP_MIN),
    rain: _crLabelStyle(filtered.rain, _Label["default"].RAIN),
    speed: _crLabelStyle(filtered.speed, _Label["default"].SPEED),
    pressure: _crLabelStyle(filtered.pressure, _Label["default"].PRESSURE),
    humidity: _crLabelStyle(filtered.humidity, _Label["default"].HUMIDITY),
    snow: _crLabelStyle(filtered.snow, _Label["default"].SNOW)
  });
};

var _default = crForecastLegendStyle;
exports["default"] = _default;
//# sourceMappingURL=crForecastLegendStyle.js.map