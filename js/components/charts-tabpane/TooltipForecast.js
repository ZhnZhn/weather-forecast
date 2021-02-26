"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _TooltipRow = _interopRequireDefault(require("./TooltipRow2"));

var _TooltipRow2 = _interopRequireDefault(require("./TooltipRow1"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var TooltipForecast = function TooltipForecast(props) {
  if (!props.active) {
    return null;
  }

  var label = props.label,
      payload = props.payload,
      _ref = (payload[0] || {}).payload || {},
      tempMorn = _ref.tempMorn,
      tempDay = _ref.tempDay,
      tempEve = _ref.tempEve,
      tempNight = _ref.tempNight,
      tempMin = _ref.tempMin,
      tempMax = _ref.tempMax,
      rain = _ref.rain,
      speed = _ref.speed,
      pressure = _ref.pressure,
      humidity = _ref.humidity;

  return /*#__PURE__*/_react["default"].createElement(_TooltipContent["default"], {
    caption: label
  }, /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    style1: _Label["default"].TEMP_DAY,
    t1: "Morn",
    v1: tempMorn,
    t2: "Day",
    v2: tempDay
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    style1: _Label["default"].TEMP_NIGHT,
    t1: "Eve",
    v1: tempEve,
    t2: "Night",
    v2: tempNight
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    t1: "Min",
    v1: tempMin,
    style1: _Label["default"].TEMP_MIN,
    t2: "Max",
    v2: tempMax,
    style2: _Label["default"].TEMP_MAX
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    t1: "Rain",
    v1: rain,
    style1: _Label["default"].RAIN,
    t2: "Wind",
    v2: speed,
    style2: _Label["default"].SPEED
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow2["default"], {
    t: "Pressure",
    v: pressure,
    style: _Label["default"].PRESSURE
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow2["default"], {
    t: "Humidity",
    v: humidity,
    style: _Label["default"].SPEED
  }));
};

var _default = TooltipForecast;
exports["default"] = _default;
//# sourceMappingURL=TooltipForecast.js.map