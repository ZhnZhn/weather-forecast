"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var _crValue = function _crValue(v) {
  return v == null ? '' : v;
};

var TitleValue = function TitleValue(_ref) {
  var t = _ref.t,
      v = _ref.v,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? _Label["default"].SERIA : _ref$style;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Label["default"].LABEL,
      children: t + ":"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      style: style,
      children: [_crValue(v), "\xA0"]
    })]
  });
};

var TooltipRow2 = function TooltipRow2(_ref2) {
  var t1 = _ref2.t1,
      v1 = _ref2.v1,
      t2 = _ref2.t2,
      v2 = _ref2.v2,
      style1 = _ref2.style1,
      style2 = _ref2.style2;

  if (v1 == null && v2 == null) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label["default"].ROW,
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

var _default = TooltipRow2;
exports["default"] = _default;
//# sourceMappingURL=TooltipRow2.js.map