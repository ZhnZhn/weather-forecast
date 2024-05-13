"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Label = _interopRequireDefault(require("./Label.Style"));
var _jsxRuntime = require("react/jsx-runtime");
const TooltipRow1 = _ref => {
  let {
    t,
    v,
    style = _Label.default.SERIA
  } = _ref;
  return v == null ? null : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label.default.ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Label.default.CAPTION,
      children: t + ":"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: style,
      children: v
    })]
  });
};
var _default = exports.default = TooltipRow1;
//# sourceMappingURL=TooltipRow1.js.map