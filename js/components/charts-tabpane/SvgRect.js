"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var S_SVG = {
  position: 'relative',
  top: 2,
  display: 'inline-block',
  width: 18,
  height: 18
};

var SvgRest = function SvgRest(_ref) {
  var _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? 'green' : _ref$stroke,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? stroke : _ref$fill;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 18 18",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    "aria-labelledby": "title",
    style: S_SVG,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
      id: "title",
      children: "Rest Marker"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      x: "3",
      y: "0",
      width: "11",
      height: "18",
      stroke: stroke,
      fill: fill
    })]
  });
};

var _default = SvgRest;
exports["default"] = _default;
//# sourceMappingURL=SvgRect.js.map