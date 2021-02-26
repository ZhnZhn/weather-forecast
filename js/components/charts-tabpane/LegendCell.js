"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var CL = "legend-cell";
var S = {
  CELL: {
    paddingLeft: 4,
    paddingRight: 4
  }
};

var LegendCell = function LegendCell(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick,
      children = _ref.children,
      titleStyle = _ref.titleStyle,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: CL,
    style: (0, _extends2["default"])({}, S.CELL, style),
    onClick: onClick
  }, children, /*#__PURE__*/_react["default"].createElement("span", {
    style: titleStyle
  }, title));
};

var _default = LegendCell;
exports["default"] = _default;
//# sourceMappingURL=LegendCell.js.map