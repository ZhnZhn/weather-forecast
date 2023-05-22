"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _jsxRuntime = require("react/jsx-runtime");
var ClipPathRect = function ClipPathRect(_ref) {
  var id = _ref.id,
    props = _ref.props;
  var left = props.left,
    top = props.top,
    width = props.width,
    height = props.height;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
      id: "clipPath-" + id,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: left,
        y: top,
        width: width,
        height: height
      })
    })
  });
};
var _default = ClipPathRect;
exports["default"] = _default;
//# sourceMappingURL=ClipPathRect.js.map