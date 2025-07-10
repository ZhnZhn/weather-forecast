"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const S = {
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
      ...S,
      ...style
    },
    children: msg
  });
};
var _default = exports.default = ErrMsg;
//# sourceMappingURL=ErrMsg.js.map