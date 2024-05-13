"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const TooltipRow1 = _ref => {
  let {
    t,
    v,
    style = _Label.S_SERIA
  } = _ref;
  return v == null ? null : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label.S_TOOLTIP_ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Label.S_CAPTION,
      children: t + ":"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: style,
      children: v
    })]
  });
};
var _default = exports.default = TooltipRow1;
//# sourceMappingURL=TooltipRow1.js.map