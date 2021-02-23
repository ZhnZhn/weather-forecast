"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var Row = function Row(_ref) {
  var caption = _ref.caption,
      value = _ref.value;

  if (value == null) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _Label["default"].ROW
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].CAPTION
  }, caption + ":"), /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].TEMP_MIN
  }, value));
};

var TooltipHourly = function TooltipHourly(props) {
  var active = props.active,
      payload = props.payload;

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
  }, /*#__PURE__*/_react["default"].createElement(Row, {
    caption: "Temp",
    value: temp
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    caption: "Pressure",
    value: pressure
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    caption: "Speed",
    value: speed
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    caption: "Rain",
    value: rain
  }));
};

var _default = TooltipHourly;
exports["default"] = _default;
//# sourceMappingURL=TooltipHourly.js.map