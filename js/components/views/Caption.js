'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ROOT_DIV: {
    width: '100%',
    color: '#795548',
    paddingLeft: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    borderBottom: '3px solid #795548',
    marginBottom: '8px'
  }
}; //import React from 'react';


var Caption = function Caption(props) {
  var _props$forecast = props.forecast,
      forecast = _props$forecast === undefined ? {} : _props$forecast,
      style = props.style,
      _forecast$city = forecast.city,
      city = _forecast$city === undefined ? {} : _forecast$city,
      _city$name = city.name,
      name = _city$name === undefined ? 'Forecast' : _city$name,
      _city$country = city.country,
      country = _city$country === undefined ? '' : _city$country;

  return _react2.default.createElement(
    'div',
    { style: Object.assign({}, STYLE.ROOT_DIV, style) },
    _react2.default.createElement(
      'span',
      null,
      name
    ),
    _react2.default.createElement(
      'span',
      null,
      ':'
    ),
    _react2.default.createElement(
      'span',
      null,
      country
    )
  );
};

exports.default = Caption;
//# sourceMappingURL=Caption.js.map