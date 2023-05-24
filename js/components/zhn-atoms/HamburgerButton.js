"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _useLayoutButton2 = _interopRequireDefault(require("../hooks/useLayoutButton"));
var _hotkeys = require("../hotkeys/hotkeys");
var _useHotKey = _interopRequireDefault(require("../hotkeys/useHotKey"));
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _jsxRuntime = require("react/jsx-runtime");
var CL_BT_HAMBURGER = "bt-hamburger",
  CL_OPENED = "opened",
  S_HAMBURGER = {
    width: '2.2rem',
    height: '2.2rem',
    verticalAlign: 'middle',
    marginBottom: '0.5rem',
    marginLeft: '0.8rem',
    borderRadius: '0.4rem'
  };
var HamburgerButton = function HamburgerButton(_ref) {
  var storeKey = _ref.storeKey,
    onClick = _ref.onClick;
  var _useLayoutButton = (0, _useLayoutButton2["default"])(storeKey, onClick),
    isOpen = _useLayoutButton[0],
    _hClick = _useLayoutButton[1],
    btClass = (0, _crCn["default"])(CL_BT_HAMBURGER, [isOpen, CL_OPENED]);
  (0, _useHotKey["default"])(_hotkeys.HK_MENU, _hClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: btClass,
    style: S_HAMBURGER,
    onClick: _hClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {})
  });
};
var _default = HamburgerButton;
exports["default"] = _default;
//# sourceMappingURL=HamburgerButton.js.map