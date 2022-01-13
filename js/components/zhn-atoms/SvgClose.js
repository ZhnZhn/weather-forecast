"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Svg = _interopRequireDefault(require("./svg/Svg100"));

var _jsxRuntime = require("react/jsx-runtime");

var CL_SVG_CLOSE = "svg-close",
    S_SVG = {
  padding: 3
};

var SvgClose = function SvgClose(_ref) {
  var style = _ref.style,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_SVG_CLOSE,
    style: style,
    onClick: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg["default"], {
      w: "12",
      style: S_SVG,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 0,0 L 12,12",
        strokeWidth: "2",
        stroke: "#ed5813",
        strokeLinecap: "round"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 12,0 L 0,12",
        strokeWidth: "2",
        stroke: "#ed5813",
        strokeLinecap: "round"
      })]
    })
  });
};

var _default = SvgClose;
exports["default"] = _default;
//# sourceMappingURL=SvgClose.js.map