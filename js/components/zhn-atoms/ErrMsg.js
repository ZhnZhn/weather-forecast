"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime");

var S = {
  color: '#080101',
  fontWeight: 'bold',
  fontSize: '18px'
};

var ErrMsg = function ErrMsg(_ref) {
  var style = _ref.style,
      msg = _ref.msg;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: (0, _extends2["default"])({}, S, style),
    children: msg
  });
};

var _default = ErrMsg;
exports["default"] = _default;
//# sourceMappingURL=ErrMsg.js.map