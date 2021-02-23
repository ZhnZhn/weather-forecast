"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var TooltipContent = function TooltipContent(_ref) {
  var caption = _ref.caption,
      children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _Label["default"].ROOT_DIV
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: _Label["default"].DAY
  }, caption)), children);
};

var _default = TooltipContent;
exports["default"] = _default;
//# sourceMappingURL=TooltipContent.js.map