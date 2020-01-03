"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

//import React from 'react';
var S = {
  SVG: {
    position: 'relative',
    top: '2px',
    display: 'inline-block',
    width: '18px',
    height: '18px'
  }
};

var SvgRest = function SvgRest(_ref) {
  var _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? 'green' : _ref$stroke,
      fill = _ref.fill;

  if (!fill) {
    fill = stroke;
  }

  return _react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 18 18",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    "aria-labelledby": "title",
    style: S.SVG
  }, _react["default"].createElement("title", {
    id: "title"
  }, "Rest Marker"), _react["default"].createElement("rect", {
    x: "3",
    y: "0",
    width: "11",
    height: "18",
    stroke: stroke,
    fill: fill
  }));
};

var _default = SvgRest;
exports["default"] = _default;
//# sourceMappingURL=SvgRect.js.map