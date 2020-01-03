"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _SvgRect = _interopRequireDefault(require("./SvgRect"));

var _LegendCell = _interopRequireDefault(require("./LegendCell"));

var _Label = _interopRequireDefault(require("./Label.Style"));

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var K = {
  T_DAY: 'tempDay',
  T_NIGHT: 'tempNight',
  T_MORN: 'tempMorn',
  T_EVE: 'tempEve',
  T_MAX: 'tempMax',
  T_MIN: 'tempMin',
  RAIN: 'rain',
  SPEED: 'speed'
};
var L = {
  ROOT_DIV: {
    marginLeft: '3rem',
    marginTop: '1rem'
  },
  COL_1: {
    display: 'inline-block',
    marginRight: '1rem'
  },
  COL_2: {
    display: 'inline-block'
  },
  COL_3: {
    display: 'inline-block',
    marginLeft: '1rem'
  }
};

var LegendTemperature =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(LegendTemperature, _Component);

  function LegendTemperature() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = LegendTemperature.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps && this.props.styles === nextProps.styles) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        styles = _this$props.styles,
        onFilter = _this$props.onFilter;
    return _react["default"].createElement("div", {
      style: L.ROOT_DIV
    }, _react["default"].createElement("div", {
      style: L.COL_1
    }, _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.T_MORN),
      titleStyle: styles.tempMorn,
      title: "T Morn"
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_MORN)), _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.T_DAY),
      titleStyle: styles.tempDay,
      title: "T Day"
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_DAY))), _react["default"].createElement("div", {
      style: L.COL_2
    }, _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.T_EVE),
      titleStyle: styles.tempEve,
      title: "T Eve"
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_EVE)), _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.T_NIGHT),
      titleStyle: styles.tempNight,
      title: "T Night"
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_NIGHT))), _react["default"].createElement("div", {
      style: L.COL_3
    }, _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.T_MAX),
      titleStyle: styles.tempMax,
      title: "T Max"
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_MAX)), _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.T_MIN),
      titleStyle: styles.tempMin,
      title: "T Min"
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_MIN))), _react["default"].createElement("div", {
      style: L.COL_3
    }, _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.RAIN),
      titleStyle: styles.rain,
      title: "Rain"
    }, _react["default"].createElement(_SvgRect["default"], _Label["default"].RECT_RAIN)), _react["default"].createElement(_LegendCell["default"], {
      onClick: onFilter.bind(null, K.SPEED),
      titleStyle: styles.speed,
      title: "Speed"
    }, _react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_SPEED))));
  };

  return LegendTemperature;
}(Component);

var _default = LegendTemperature;
exports["default"] = _default;
//# sourceMappingURL=LegendTemperature.js.map