"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _Label = _interopRequireDefault(require("./Label.Style"));

//import React from 'react';
var TooltipTemperature = function TooltipTemperature(props) {
  if (!props.active) {
    return null;
  }

  var label = props.label,
      payload = props.payload,
      value = payload[0].payload; //console.log(props);

  return _react["default"].createElement("div", {
    style: _Label["default"].ROOT_DIV
  }, _react["default"].createElement("div", null, _react["default"].createElement("span", {
    style: _Label["default"].DAY
  }, label)), _react["default"].createElement("div", {
    style: {
      paddingTop: '8px'
    }
  }, _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Morn:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_DAY
  }, value.tempMorn, "\xA0"), _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Day:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_DAY
  }, value.tempDay, "\xA0")), _react["default"].createElement("div", {
    style: {
      paddingTop: '8px'
    }
  }, _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Eve:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_NIGHT
  }, value.tempEve, "\xA0"), _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Night:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_NIGHT
  }, value.tempNight, "\xA0")), _react["default"].createElement("div", {
    style: {
      paddingTop: '8px'
    }
  }, _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Min:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_MIN
  }, value.tempMin, "\xA0"), _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Max:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_MAX
  }, value.tempMax, "\xA0")), _react["default"].createElement("div", {
    style: {
      paddingTop: '8px'
    }
  }, _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Rain:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_MIN
  }, value.rain, "\xA0"), _react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, "Speed:"), _react["default"].createElement("span", {
    style: _Label["default"].TEMP_MIN
  }, value.speed, "\xA0")));
};

var _default = TooltipTemperature;
exports["default"] = _default;
//# sourceMappingURL=TooltipTemperature.js.map