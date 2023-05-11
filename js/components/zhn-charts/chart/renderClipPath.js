"use strict";

exports.__esModule = true;
exports.renderClipPath = void 0;
var _jsxRuntime = require("react/jsx-runtime");
var renderClipPath = function renderClipPath(chartIns) {
  var clipPathId = chartIns.clipPathId,
    state = chartIns.state,
    _state$offset = state.offset,
    left = _state$offset.left,
    top = _state$offset.top,
    height = _state$offset.height,
    width = _state$offset.width;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("defs", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
      id: clipPathId,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: left,
        y: top,
        height: height,
        width: width
      })
    })
  });
};
exports.renderClipPath = renderClipPath;
//# sourceMappingURL=renderClipPath.js.map