"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var S_SVG = {
  position: 'relative',
  top: 4,
  display: 'inline-block',
  width: 18,
  height: 18
};

var SvgCircle = function SvgCircle(_ref) {
  var stroke = _ref.stroke,
      fill = _ref.fill;
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
      children: "Circle Marker"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      r: "6",
      stroke: stroke,
      strokeWidth: "2",
      fill: fill,
      cx: "9",
      cy: "9"
    })]
  });
};

var _default = SvgCircle;
exports["default"] = _default;
//# sourceMappingURL=SvgCircle.js.map