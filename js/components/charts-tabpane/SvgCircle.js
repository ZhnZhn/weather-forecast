"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("../zhn/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG = {
  position: 'relative',
  top: 4,
  display: 'inline-block',
  width: 18,
  height: 18
};
const SvgCircle = _ref => {
  let {
    stroke,
    fill
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg100WithTitle, {
    title: "Circle Marker",
    w: "18",
    style: S_SVG,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
      fill: fill,
      stroke: stroke,
      strokeWidth: "2",
      r: "6",
      cx: "9",
      cy: "9"
    })
  });
};
var _default = exports.default = SvgCircle;
//# sourceMappingURL=SvgCircle.js.map