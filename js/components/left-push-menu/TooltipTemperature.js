"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _TooltipContent = _interopRequireDefault(require("./TooltipContent"));

var _Label = _interopRequireDefault(require("./Label.Style"));

//import React from 'react';
var _crValue = function _crValue(v) {
  return v == null ? '' : v;
};

var TitleValue = function TitleValue(_ref) {
  var t = _ref.t,
      v = _ref.v,
      style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, t + ":"), /*#__PURE__*/_react["default"].createElement("span", {
    style: style
  }, _crValue(v), "\xA0"));
};

var Row = function Row(_ref2) {
  var t1 = _ref2.t1,
      v1 = _ref2.v1,
      t2 = _ref2.t2,
      v2 = _ref2.v2,
      style1 = _ref2.style1,
      style2 = _ref2.style2;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _Label["default"].ROW
  }, /*#__PURE__*/_react["default"].createElement(TitleValue, {
    t: t1,
    v: v1,
    style: style1
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    t: t2,
    v: v2,
    style: style2 || style1
  }));
};

var TooltipTemperature = function TooltipTemperature(props) {
  if (!props.active) {
    return null;
  }

  var label = props.label,
      payload = props.payload,
      _ref3 = (payload[0] || {}).payload || {},
      tempMorn = _ref3.tempMorn,
      tempDay = _ref3.tempDay,
      tempEve = _ref3.tempEve,
      tempNight = _ref3.tempNight,
      tempMin = _ref3.tempMin,
      tempMax = _ref3.tempMax,
      rain = _ref3.rain,
      speed = _ref3.speed;

  return /*#__PURE__*/_react["default"].createElement(_TooltipContent["default"], {
    caption: label
  }, /*#__PURE__*/_react["default"].createElement(Row, {
    style1: _Label["default"].TEMP_DAY,
    t1: "Morn",
    v1: tempMorn,
    t2: "Day",
    v2: tempDay
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    style1: _Label["default"].TEMP_NIGHT,
    t1: "Eve",
    v1: tempEve,
    t2: "Night",
    v2: tempNight
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    t1: "Min",
    v1: tempMin,
    style1: _Label["default"].TEMP_MIN,
    t2: "Max",
    v2: tempMax,
    style2: _Label["default"].TEMP_MAX
  }), /*#__PURE__*/_react["default"].createElement(Row, {
    style1: _Label["default"].TEMP_MIN,
    t1: "Rain",
    v1: rain,
    t2: "Speed",
    v2: speed
  }));
};

var _default = TooltipTemperature;
exports["default"] = _default;
//# sourceMappingURL=TooltipTemperature.js.map