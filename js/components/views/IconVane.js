"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

//import React from 'react';
//import PropTypes from 'prop-types';
var CL_VANE = "icon__popup__vane",
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _crStyle = function _crStyle(deg) {
  return _isNumber(deg) ? {
    transform: "rotate(" + deg + "deg)"
  } : void 0;
};

var IconVane = function IconVane(_ref) {
  var deg = _ref.deg;
  return /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 17 18",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    className: CL_VANE,
    style: _crStyle(deg)
  }, /*#__PURE__*/_react["default"].createElement("title", null, "Icon Wind Vane"), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0"
  }));
};
/*
IconVane.propTypes = {
  deg: PropTypes.number
}
*/


var _default = IconVane;
exports["default"] = _default;
//# sourceMappingURL=IconVane.js.map