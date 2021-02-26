"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var S = {
  color: '#080101',
  fontWeight: 'bold',
  fontSize: '18px'
};

var ErrMsg = function ErrMsg(_ref) {
  var style = _ref.style,
      msg = _ref.msg;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S, style)
  }, msg);
};

var _default = ErrMsg;
exports["default"] = _default;
//# sourceMappingURL=ErrMsg.js.map