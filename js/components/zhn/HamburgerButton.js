"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useLayoutButton = _interopRequireDefault(require("../hooks/useLayoutButton"));
var _hotkeys = require("../hotkeys/hotkeys");
var _useHotKey = _interopRequireDefault(require("../hotkeys/useHotKey"));
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_HAMBURGER = "bt-hamburger",
  CL_OPENED = "opened",
  S_HAMBURGER = {
    width: '2.2rem',
    height: '2.2rem',
    verticalAlign: 'middle',
    marginBottom: '0.5rem',
    marginLeft: '0.8rem',
    borderRadius: '0.4rem'
  };
const HamburgerButton = _ref => {
  let {
    storeKey,
    onClick
  } = _ref;
  const [isOpen, _hClick] = (0, _useLayoutButton.default)(storeKey, onClick),
    btClass = (0, _crCn.default)(CL_BT_HAMBURGER, [isOpen, CL_OPENED]);
  (0, _useHotKey.default)(_hotkeys.HK_MENU, _hClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: btClass,
    style: S_HAMBURGER,
    onClick: _hClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {})
  });
};
var _default = exports.default = HamburgerButton;
//# sourceMappingURL=HamburgerButton.js.map