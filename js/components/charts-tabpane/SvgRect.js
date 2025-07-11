"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Svg = require("../zhn/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG = {
  position: 'relative',
  top: 2,
  display: 'inline-block',
  width: 18,
  height: 18
};
const SvgRest = _ref => {
  let {
    stroke = 'green',
    fill = stroke
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg100WithTitle, {
    title: "Rest Marker",
    w: "18",
    "aria-labelledby": "title",
    style: S_SVG,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      x: "3",
      y: "0",
      width: "11",
      height: "18",
      stroke: stroke,
      fill: fill
    })
  });
};
var _default = exports.default = SvgRest;
//# sourceMappingURL=SvgRect.js.map