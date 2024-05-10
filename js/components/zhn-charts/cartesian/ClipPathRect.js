"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const ClipPathRect = _ref => {
  let {
    is,
    id,
    props
  } = _ref;
  const {
    left,
    top,
    width,
    height
  } = props;
  return is ? /*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
      id: "clipPath-" + id,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: left,
        y: top,
        width: width,
        height: height
      })
    })
  }) : null;
};
var _default = exports.default = ClipPathRect;
//# sourceMappingURL=ClipPathRect.js.map