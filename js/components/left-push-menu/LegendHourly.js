"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _Label = _interopRequireDefault(require("./Label.Style"));

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var CL = 'legend-cell';
var L_S = {
  ROOT: {
    marginTop: '1rem'
  },
  ITEM: {
    display: 'inline-block',
    marginRight: '1rem',
    paddingLeft: '4px',
    paddingRight: '4px',
    paddingBottom: '4px'
  }
};

var _fnLabelStyle = function _fnLabelStyle(is) {
  return is ? L_S.LABEL : (0, _extends2["default"])({}, L_S.LABEL, {}, _Label["default"].FILTERED);
};

var LegendHourly =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(LegendHourly, _Component);

  function LegendHourly() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = LegendHourly.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        filtered = _this$props.filtered,
        onFilter = _this$props.onFilter,
        _tempStyle = _fnLabelStyle(!filtered.temp),
        _pressureStyle = _fnLabelStyle(!filtered.pressure),
        _rainStyle = _fnLabelStyle(!filtered.rain),
        _speedStyle = _fnLabelStyle(!filtered.speed);

    return _react["default"].createElement("div", {
      style: L_S.ROOT
    }, _react["default"].createElement("span", {
      className: CL,
      style: L_S.ITEM,
      onClick: onFilter.bind(null, 'temp')
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_NIGHT), _react["default"].createElement("span", {
      style: _tempStyle
    }, "T")), _react["default"].createElement("span", {
      className: CL,
      style: L_S.ITEM,
      onClick: onFilter.bind(null, 'pressure')
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_PRESSURE), _react["default"].createElement("span", {
      style: _pressureStyle
    }, "Pressure")), _react["default"].createElement("span", {
      className: CL,
      style: L_S.ITEM,
      onClick: onFilter.bind(null, 'rain')
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_RAIN), _react["default"].createElement("span", {
      style: _rainStyle
    }, "Rain")), _react["default"].createElement("span", {
      className: CL,
      style: L_S.ITEM,
      onClick: onFilter.bind(null, 'speed')
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_SPEED), _react["default"].createElement("span", {
      style: _speedStyle
    }, "Speed")));
  };

  return LegendHourly;
}(Component);

var _default = LegendHourly;
exports["default"] = _default;
//# sourceMappingURL=LegendHourly.js.map