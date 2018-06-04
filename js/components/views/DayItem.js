'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //import React from 'react';


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _dt = require('../../utils/dt');

var _dt2 = _interopRequireDefault(_dt);

var _IconVane = require('./IconVane');

var _IconVane2 = _interopRequireDefault(_IconVane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var roundProp = function roundProp() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prop = arguments[1];

  return Math.round(obj[prop]);
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var DayItem = function DayItem(props) {
  var style = props.style,
      _props$item = props.item,
      item = _props$item === undefined ? {} : _props$item,
      onClick = props.onClick,
      weather = item.weather,
      deg = item.deg,
      speed = item.speed,
      temp = item.temp,
      timestamp = item.dt,
      _speed = _isNumber(speed) ? speed.toFixed(2) : '',
      day = _dt2.default.toShortDayOfWeek(timestamp),
      pressure = roundProp(item, 'pressure'),
      icon = weather[0].icon,
      tempDay = roundProp(temp, 'day'),
      tempNight = roundProp(temp, 'night');

  return _react2.default.createElement(
    'div',
    {
      style: _extends({}, STYLE.ROOT_DIV, style),
      onClick: onClick.bind(null, item)
    },
    _react2.default.createElement(
      'div',
      { style: STYLE.DAY },
      day
    ),
    _react2.default.createElement(
      'span',
      { style: STYLE.PRESSURE },
      pressure
    ),
    _react2.default.createElement('img', { src: './img/' + icon + '.png', style: STYLE.ICON }),
    _react2.default.createElement(
      'div',
      { style: STYLE.CELL_WIND },
      _react2.default.createElement(_IconVane2.default, { deg: deg }),
      _react2.default.createElement(
        'span',
        { style: STYLE.WIND_SPEED },
        _speed
      )
    ),
    _react2.default.createElement(
      'div',
      { style: STYLE.CELL_TEMP },
      _react2.default.createElement(
        'span',
        { style: STYLE.TEMP_DAY },
        tempDay
      ),
      _react2.default.createElement(
        'span',
        { style: STYLE.TEMP_NIGHT },
        tempNight
      )
    )
  );
};

DayItem.defaultProps = {
  onClick: function onClick() {}
};

exports.default = DayItem;
//# sourceMappingURL=DayItem.js.map