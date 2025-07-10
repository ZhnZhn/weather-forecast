"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_CIRCLE = "bt-circle not-selected",
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
const ButtonCircle = _ref => {
  let {
    isActive,
    style,
    caption,
    title,
    onClick
  } = _ref;
  const _style = {
    ...S_BT,
    ...style,
    ...(isActive && S_NOT_ACTIVE)
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: CL_BT_CIRCLE,
    style: _style,
    title: title,
    onClick: onClick,
    children: caption
  });
};
var _default = exports.default = ButtonCircle;
//# sourceMappingURL=ButtonCircle.js.map