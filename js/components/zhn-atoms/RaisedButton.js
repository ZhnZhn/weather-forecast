"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var CL_BT = 'bt-raised',
    CL_BT_DIV = 'bt-raised__div',
    CL_BT_SPAN = 'bt-raised__span',
    S_PRIMARY_SPAN = {
  color: 'greenyellow'
};

var RaisedButton = function RaisedButton(_ref) {
  var rootStyle = _ref.rootStyle,
      _ref$clDiv = _ref.clDiv,
      clDiv = _ref$clDiv === void 0 ? CL_BT_DIV : _ref$clDiv,
      caption = _ref.caption,
      isPrimary = _ref.isPrimary,
      onClick = _ref.onClick;

  var _spanStyle = isPrimary ? S_PRIMARY_SPAN : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    tabIndex: 0,
    className: CL_BT,
    style: rootStyle,
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

var _default = RaisedButton;
exports["default"] = _default;
//# sourceMappingURL=RaisedButton.js.map