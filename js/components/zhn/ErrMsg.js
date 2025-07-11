"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const S_ERR_MSG = {
  color: '#080101',
  fontWeight: 'bold',
  fontSize: '18px'
};
const ErrMsg = _ref => {
  let {
    style,
    msg
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      ...S_ERR_MSG,
      ...style
    },
    children: msg ? msg + '.' : msg
  });
};
var _default = exports.default = ErrMsg;
//# sourceMappingURL=ErrMsg.js.map