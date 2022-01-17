"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var TooltipRow1 = function TooltipRow1(_ref) {
  var t = _ref.t,
      v = _ref.v,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? _Label["default"].SERIA : _ref$style;

  if (v == null) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label["default"].ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Label["default"].CAPTION,
      children: t + ":"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: style,
      children: v
    })]
  });
};

var _default = TooltipRow1;
exports["default"] = _default;
//# sourceMappingURL=TooltipRow1.js.map