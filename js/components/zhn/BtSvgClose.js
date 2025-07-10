"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Svg = _interopRequireDefault(require("./svg/Svg100"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SVG_CLOSE = "bt-svg-close",
  STROKE_LINECAP_ROUND_PROPS = {
    strokeWidth: "2",
    strokeLinecap: "round"
  },
  S_SVG = {
    padding: 3
  };
const BtSvgClose = _ref => {
  let {
    style,
    color,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    "aria-label": "Close",
    tabIndex: "-1",
    className: CL_SVG_CLOSE,
    style: style,
    onClick: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.default, {
      ...STROKE_LINECAP_ROUND_PROPS,
      w: "12",
      style: {
        ...S_SVG,
        stroke: color
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 0,0 L 12,12"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 12,0 L 0,12"
      })]
    })
  });
};
var _default = exports.default = BtSvgClose;
//# sourceMappingURL=BtSvgClose.js.map