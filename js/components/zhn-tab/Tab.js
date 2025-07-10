"use strict";

exports.__esModule = true;
exports.default = void 0;
var _tabPaneFn = require("./tabPaneFn");
var _jsxRuntime = require("react/jsx-runtime");
const Tab = _ref => {
  let {
    isSelected,
    id,
    index,
    title,
    onClick,
    onKeyDown
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    role: "tab",
    className: (0, _tabPaneFn.crTabCn)(isSelected),
    id: (0, _tabPaneFn.crTabId)(id, index),
    tabIndex: isSelected ? '0' : '-1',
    "aria-selected": isSelected,
    "aria-controls": (0, _tabPaneFn.crTabPanelId)(id, index),
    onClick: onClick,
    onKeyDown: onKeyDown,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: _tabPaneFn.CL_TAB_TITLE,
      children: title
    })
  });
};
var _default = exports.default = Tab;
//# sourceMappingURL=Tab.js.map