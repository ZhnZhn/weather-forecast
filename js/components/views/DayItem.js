"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _IconVane = _interopRequireDefault(require("./IconVane"));

//import React from 'react';
var STYLE = {
  ROOT_DIV: {
    display: 'inline-block',
    paddingLeft: '12px',
    paddingRight: '12px',
    borderRadius: '10px',
    transition: 'background-color 0.3s'
  },
  DAY: {
    color: '#8bc34a',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottom: '2px solid #8bc34a',
    marginBottom: '4px'
  },
  PRESSURE: {
    display: 'block',
    color: '#0D2339',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '-15px'
  },
  ICON: {
    display: 'block',
    width: '60px',
    height: '60px',
    margin: '0 auto'
  },
  CELL_WIND: {
    marginTop: '-10px'
  },
  WIND_SPEED: {
    color: '#3f51b5',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  CELL_TEMP: {
    paddingTop: '4px',
    paddingBottom: '4px',
    textAlign: 'center'
  },
  TEMP_DAY: {
    color: '#ff9800',
    paddingLeft: '4px',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  TEMP_NIGHT: {
    color: '#434348',
    paddingLeft: '8px',
    fontSize: '20px',
    fontWeight: 'bold'
  }
};

var roundProp = function roundProp(obj, prop) {
  if (obj === void 0) {
    obj = {};
  }

  return Math.round(obj[prop]);
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var DayItem = function DayItem(props) {
  var style = props.style,
      _props$item = props.item,
      item = _props$item === void 0 ? {} : _props$item,
      onClick = props.onClick,
      weather = item.weather,
      deg = item.deg,
      speed = item.speed,
      temp = item.temp,
      timestamp = item.dt,
      _speed = _isNumber(speed) ? speed.toFixed(2) : '',
      day = _dt["default"].toShortDayOfWeek(timestamp),
      pressure = roundProp(item, 'pressure'),
      icon = weather[0].icon,
      tempDay = roundProp(temp, 'day'),
      tempNight = roundProp(temp, 'night');

  return _react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, STYLE.ROOT_DIV, {}, style),
    onClick: onClick.bind(null, item)
  }, _react["default"].createElement("div", {
    style: STYLE.DAY
  }, day), _react["default"].createElement("span", {
    style: STYLE.PRESSURE
  }, pressure), _react["default"].createElement("img", {
    src: "./img/" + icon + ".png",
    style: STYLE.ICON
  }), _react["default"].createElement("div", {
    style: STYLE.CELL_WIND
  }, _react["default"].createElement(_IconVane["default"], {
    deg: deg
  }), _react["default"].createElement("span", {
    style: STYLE.WIND_SPEED
  }, _speed)), _react["default"].createElement("div", {
    style: STYLE.CELL_TEMP
  }, _react["default"].createElement("span", {
    style: STYLE.TEMP_DAY
  }, tempDay), _react["default"].createElement("span", {
    style: STYLE.TEMP_NIGHT
  }, tempNight)));
};

DayItem.defaultProps = {
  onClick: function onClick() {}
};
var _default = DayItem;
exports["default"] = _default;
//# sourceMappingURL=DayItem.js.map