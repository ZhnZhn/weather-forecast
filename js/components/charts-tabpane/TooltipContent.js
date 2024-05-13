"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const TooltipContent = _ref => {
  let {
    caption,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label.S_TOOLTIP,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _Label.S_DAY,
        children: caption
      })
    }), children]
  });
};
var _default = exports.default = TooltipContent;
//# sourceMappingURL=TooltipContent.js.map