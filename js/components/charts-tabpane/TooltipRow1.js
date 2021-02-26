"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var TooltipRow1 = function TooltipRow1(_ref) {
  var t = _ref.t,
      v = _ref.v,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? _Label["default"].SERIA : _ref$style;

  if (v == null) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _Label["default"].ROW
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].CAPTION
  }, t + ":"), /*#__PURE__*/_react["default"].createElement("span", {
    style: style
  }, v));
};

var _default = TooltipRow1;
exports["default"] = _default;
//# sourceMappingURL=TooltipRow1.js.map