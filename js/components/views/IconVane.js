"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

//import React from 'react';
//import PropTypes from 'prop-types';
var CL_VANE = "icon__popup__vane";

var _crStyle = function _crStyle(deg) {
  if (typeof deg !== 'number') {
    return undefined;
  }

  return {
    transform: "rotate(" + deg + "deg)"
  };
};

var IconVane = function IconVane(_ref) {
  var deg = _ref.deg;
  return _react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 17 18",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    "aria-labelledby": "title",
    className: CL_VANE,
    style: _crStyle(deg)
  }, _react["default"].createElement("title", {
    id: "title"
  }, "Icon Wind Vane"), _react["default"].createElement("path", {
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