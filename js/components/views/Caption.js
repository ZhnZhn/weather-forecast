"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

//import React from 'react';
var STYLE = {
  ROOT_DIV: {
    display: 'inline',
    color: '#795548',
    width: '100%',
    paddingLeft: 8,
    marginBottom: 8,
    borderBottom: '3px solid #795548',
    fontSize: '24px',
    fontWeight: 'bold'
  }
};

var Caption = function Caption(_ref) {
  var forecast = _ref.forecast,
      style = _ref.style;

  var _ref2 = forecast || {},
      city = _ref2.city,
      _ref3 = city || {},
      _ref3$name = _ref3.name,
      name = _ref3$name === void 0 ? 'Forecast' : _ref3$name,
      _ref3$country = _ref3.country,
      country = _ref3$country === void 0 ? '' : _ref3$country;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, STYLE.ROOT_DIV, style)
  }, /*#__PURE__*/_react["default"].createElement("span", null, name), /*#__PURE__*/_react["default"].createElement("span", null, ":"), /*#__PURE__*/_react["default"].createElement("span", null, country));
};

var _default = Caption;
exports["default"] = _default;
//# sourceMappingURL=Caption.js.map