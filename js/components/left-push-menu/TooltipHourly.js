"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _TooltipRow = _interopRequireDefault(require("./TooltipRow"));

var TooltipHourly = function TooltipHourly(_ref) {
  var active = _ref.active,
      payload = _ref.payload;

  if (!active) {
    return null;
  }

  var _ref2 = (payload[0] || {}).payload || {},
      dt_text = _ref2.dt_text,
      temp = _ref2.temp,
      pressure = _ref2.pressure,
      rain = _ref2.rain,
      speed = _ref2.speed;

  return /*#__PURE__*/_react["default"].createElement(_TooltipContent["default"], {
    caption: dt_text
  }, /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    caption: "Temp",
    value: temp
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    caption: "Pressure",
    value: pressure
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    caption: "Speed",
    value: speed
  }), /*#__PURE__*/_react["default"].createElement(_TooltipRow["default"], {
    caption: "Rain",
    value: rain
  }));
};

var _default = TooltipHourly;
exports["default"] = _default;
//# sourceMappingURL=TooltipHourly.js.map