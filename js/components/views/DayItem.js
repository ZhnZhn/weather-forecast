"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _IconVane = _interopRequireDefault(require("./IconVane"));

//import React from 'react';
var CL_DAY_ITEM = 'day-item';
var S = {
  ROOT_DIV: {
    display: 'inline-block',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    transition: 'background-color 0.3s'
  },
  DAY: {
    color: '#8bc34a',
    marginBottom: 4,
    borderBottom: '2px solid #8bc34a',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  PRESSURE: {
    display: 'block',
    marginBottom: -15,
    color: '#0d2339',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  ICON: {
    display: 'block',
    width: 60,
    height: 60,
    margin: '0 auto'
  },
  CELL_WIND: {
    marginTop: -10
  },
  WIND_SPEED: {
    color: '#3f51b5',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  CELL_TEMP: {
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center'
  },
  TEMP_DAY: {
    color: '#ff9800',
    paddingLeft: 4,
    fontSize: '20px',
    fontWeight: 'bold'
  },
  TEMP_NIGHT: {
    color: '#434348',
    paddingLeft: 8,
    fontSize: '20px',
    fontWeight: 'bold'
  }
};

var roundProp = function roundProp(obj, prop) {
  if (obj === void 0) {
    obj = {};
  }

  return Math.round(obj[prop]);
},
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
},
    _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var DayItem = function DayItem(_ref) {
  var style = _ref.style,
      _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item,
      _onClick = _ref.onClick;

  var weather = item.weather,
      deg = item.deg,
      speed = item.speed,
      temp = item.temp,
      timestamp = item.dt,
      _speed = _isNumber(speed) ? speed.toFixed(2) : '',
      day = _dt["default"].toShortDayOfWeek(timestamp),
      pressure = roundProp(item, 'pressure'),
      icon = weather[0].icon,
      _srcIcon = icon.length === 3 ? "./img/" + icon + ".png" : void 0,
      tempDay = roundProp(temp, 'day'),
      tempNight = roundProp(temp, 'night'),
      _focusableAttr = _isFn(_onClick) ? {
    tabIndex: "-1",
    className: CL_DAY_ITEM,
    onClick: function onClick() {
      return _onClick(item);
    }
  } : void 0;

  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, _focusableAttr, {
    style: (0, _extends2["default"])({}, S.ROOT_DIV, style)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: S.DAY
  }, day), /*#__PURE__*/_react["default"].createElement("span", {
    style: S.PRESSURE
  }, pressure), /*#__PURE__*/_react["default"].createElement("img", {
    src: _srcIcon,
    style: S.ICON
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: S.CELL_WIND
  }, /*#__PURE__*/_react["default"].createElement(_IconVane["default"], {
    deg: deg
  }), /*#__PURE__*/_react["default"].createElement("span", {
    style: S.WIND_SPEED
  }, _speed)), /*#__PURE__*/_react["default"].createElement("div", {
    style: S.CELL_TEMP
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: S.TEMP_DAY
  }, tempDay), /*#__PURE__*/_react["default"].createElement("span", {
    style: S.TEMP_NIGHT
  }, tempNight)));
};

var _default = DayItem;
exports["default"] = _default;
//# sourceMappingURL=DayItem.js.map