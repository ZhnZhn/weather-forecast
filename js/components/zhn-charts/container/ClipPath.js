"use strict";

exports.__esModule = true;
exports.ClipPath = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const ClipPath = _ref => {
  let {
    id,
    offset
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
      id: id,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: offset.left,
        y: offset.top,
        height: offset.height,
        width: offset.width
      })
    })
  });
};
exports.ClipPath = ClipPath;
//# sourceMappingURL=ClipPath.js.map