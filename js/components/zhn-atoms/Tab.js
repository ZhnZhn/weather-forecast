"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _jsxRuntime = require("react/jsx-runtime");
var CL_TAB = "tab",
  TAB_COLOR = '#2f7ed8',
  S_BT = {
    color: TAB_COLOR,
    borderBottom: "3px solid " + TAB_COLOR
  },
  S_TITLE = {
    color: TAB_COLOR
  };
var Tab = function Tab(_ref) {
  var id = _ref.id,
    title = _ref.title,
    isSelected = _ref.isSelected,
    onClick = _ref.onClick;
  var _ref2 = isSelected ? [S_BT, S_TITLE] : [],
    _btStyle = _ref2[0],
    _titleStyle = _ref2[1];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: CL_TAB,
    style: _btStyle,
    id: "tab-" + id,
    role: "tab",
    "aria-selected": isSelected,
    "aria-controls": "tabpanel-" + id,
    tabIndex: "0",
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _titleStyle,
      children: title
    })
  });
};
var _default = Tab;
exports["default"] = _default;
//# sourceMappingURL=Tab.js.map