"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

//import React from 'react';
var STYLE = {
  ROOT_DIV: {
    display: 'inline',
    width: '100%',
    color: '#795548',
    paddingLeft: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    borderBottom: '3px solid #795548',
    marginBottom: '8px'
  }
};

var Caption = function Caption(props) {
  var _props$forecast = props.forecast,
      forecast = _props$forecast === void 0 ? {} : _props$forecast,
      style = props.style,
      _forecast$city = forecast.city,
      city = _forecast$city === void 0 ? {} : _forecast$city,
      _city$name = city.name,
      name = _city$name === void 0 ? 'Forecast' : _city$name,
      _city$country = city.country,
      country = _city$country === void 0 ? '' : _city$country;
  return _react["default"].createElement("div", {
    style: Object.assign({}, STYLE.ROOT_DIV, style)
  }, _react["default"].createElement("span", null, name), _react["default"].createElement("span", null, ":"), _react["default"].createElement("span", null, country));
};

var _default = Caption;
exports["default"] = _default;
//# sourceMappingURL=Caption.js.map