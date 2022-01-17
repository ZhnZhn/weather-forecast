"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var TooltipContent = function TooltipContent(_ref) {
  var caption = _ref.caption,
      children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label["default"].ROOT_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _Label["default"].DAY,
        children: caption
      })
    }), children]
  });
};

var _default = TooltipContent;
exports["default"] = _default;
//# sourceMappingURL=TooltipContent.js.map