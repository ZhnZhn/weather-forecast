"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _crValue = function _crValue(v) {
  return v == null ? '' : v;
};

var TitleValue = function TitleValue(_ref) {
  var t = _ref.t,
      v = _ref.v,
      style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].LABEL
  }, t + ":"), /*#__PURE__*/_react["default"].createElement("span", {
    style: style
  }, _crValue(v), "\xA0"));
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

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _Label["default"].ROW
  }, /*#__PURE__*/_react["default"].createElement(TitleValue, {
    t: t1,
    v: v1,
    style: style1
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    t: t2,
    v: v2,
    style: style2 || style1
  }));
};

var _default = TooltipRow2;
exports["default"] = _default;
//# sourceMappingURL=TooltipRow2.js.map