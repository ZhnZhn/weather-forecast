"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT = 'bt-raised',
  CL_BT_DIV = `${CL_BT}__div`,
  CL_BT_SPAN = `${CL_BT}__span`,
  S_PRIMARY_SPAN = {
    color: 'greenyellow'
  };
const RaisedButton = _ref => {
  let {
    style,
    clDiv = CL_BT_DIV,
    caption,
    isPrimary,
    onClick
  } = _ref;
  const _spanStyle = isPrimary ? S_PRIMARY_SPAN : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    tabIndex: 0,
    className: CL_BT,
    style: style,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: clDiv,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_BT_SPAN,
        style: _spanStyle,
        children: caption
      })
    })
  });
};
var _default = exports.default = RaisedButton;
//# sourceMappingURL=RaisedButton.js.map