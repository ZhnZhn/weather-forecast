"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _jsxRuntime = require("react/jsx-runtime");
var CL_BT_CIRCLE = "bt-circle not-selected",
  S_BT = {
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
  var isActive = _ref.isActive,
    style = _ref.style,
    caption = _ref.caption,
    title = _ref.title,
    onClick = _ref.onClick;
  var _style = (0, _extends2["default"])({}, S_BT, style, isActive && S_NOT_ACTIVE);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: CL_BT_CIRCLE,
    style: _style,
    title: title,
    onClick: onClick,
    children: caption
  });
};
var _default = ButtonCircle;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map