"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useLayoutButton2 = _interopRequireDefault(require("./useLayoutButton"));
var _jsxRuntime = require("react/jsx-runtime");
var _assign = Object.assign,
  CL_BT_CIRCLE = "bt-circle not-selected",
  S_ROOT = {
    display: 'inline-block',
    color: '#80c040',
    width: 22,
    height: 22,
    border: '2px solid #80c040',
    borderRadius: '50%',
    verticalAlign: 'middle',
    fontWeight: 'bold'
  },
  S_NOT_ACTIVE = {
    color: '#5b5b5b'
  };
var ButtonCircle = function ButtonCircle(_ref) {
  var style = _ref.style,
    caption = _ref.caption,
    title = _ref.title,
    storeKey = _ref.storeKey,
    onClick = _ref.onClick;
  var _useLayoutButton = (0, _useLayoutButton2["default"])(storeKey, onClick),
    isActive = _useLayoutButton[0],
    _hClick = _useLayoutButton[1],
    _style = _assign((0, _extends2["default"])({}, S_ROOT, style), isActive && S_NOT_ACTIVE);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: CL_BT_CIRCLE,
    style: _style,
    title: title,
    onClick: _hClick,
    children: caption
  });
};
var _default = ButtonCircle;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map