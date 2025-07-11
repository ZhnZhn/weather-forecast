"use strict";

exports.__esModule = true;
exports.Svg100WithTitle = exports.Svg100 = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const Svg100 = _ref => {
  let {
    w,
    h = w,
    children,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    height: "100%",
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    ...restProps,
    children: children
  });
};
exports.Svg100 = Svg100;
const Svg100WithTitle = _ref2 => {
  let {
    title,
    children,
    ...restProps
  } = _ref2;
  const _titleId = (0, _uiApi.useId)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Svg100, {
    ...restProps,
    "aria-labelledby": _titleId,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
      id: _titleId,
      children: title
    }), children]
  });
};
exports.Svg100WithTitle = Svg100WithTitle;
//# sourceMappingURL=Svg.js.map