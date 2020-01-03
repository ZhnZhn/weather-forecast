"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

//import React from 'react';
var STYLE = {
  SVG: {
    position: 'relative',
    top: '4px',
    display: 'inline-block',
    width: '18px',
    height: '18px'
  }
};

var SvgCircle = function SvgCircle(_ref) {
  var stroke = _ref.stroke,
      fill = _ref.fill;
  return _react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 18 18",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    "aria-labelledby": "title",
    style: STYLE.SVG
  }, _react["default"].createElement("title", {
    id: "title"
  }, "Circle Marker"), _react["default"].createElement("circle", {
    r: "6",
    stroke: stroke,
    strokeWidth: "2",
    fill: fill,
    cx: "9",
    cy: "9"
  }));
};

var _default = SvgCircle;
exports["default"] = _default;
//# sourceMappingURL=SvgCircle.js.map