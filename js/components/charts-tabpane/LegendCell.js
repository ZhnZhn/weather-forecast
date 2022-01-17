"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime");

var CL_LEGEND_CELL = "legend-cell",
    S_CELL = {
  padding: '0 4px'
};

var LegendCell = function LegendCell(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick,
      children = _ref.children,
      titleStyle = _ref.titleStyle,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_LEGEND_CELL,
    style: (0, _extends2["default"])({}, S_CELL, style),
    onClick: onClick,
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: titleStyle,
      children: title
    })]
  });
};

var _default = LegendCell;
exports["default"] = _default;
//# sourceMappingURL=LegendCell.js.map