"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const _crValue = v => v == null ? '' : v;
const TitleValue = _ref => {
  let {
    t,
    v,
    style = _Label.S_SERIA
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Label.S_LABEL,
      children: t + ":"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      style: style,
      children: [_crValue(v), "\xA0"]
    })]
  });
};
const TooltipRow2 = _ref2 => {
  let {
    t1,
    v1,
    t2,
    v2,
    style1,
    style2
  } = _ref2;
  return v1 == null && v2 == null ? null : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label.S_TOOLTIP_ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
      t: t1,
      v: v1,
      style: style1
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
      t: t2,
      v: v2,
      style: style2 || style1
    })]
  });
};
var _default = exports.default = TooltipRow2;
//# sourceMappingURL=TooltipRow2.js.map