"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var TooltipRow = function TooltipRow(_ref) {
  var caption = _ref.caption,
      value = _ref.value;

  if (value == null) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _Label["default"].ROW
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].CAPTION
  }, caption + ":"), /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].TEMP_MIN
  }, value));
};

var _default = TooltipRow;
exports["default"] = _default;
//# sourceMappingURL=TooltipRow.js.map