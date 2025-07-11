"use strict";

exports.__esModule = true;
exports.Layer = void 0;
var _styleFn = require("../../styleFn");
var _ReactUtils = require("../util/ReactUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const Layer = _ref => {
  let {
    refEl,
    children,
    className,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: (0, _styleFn.crCn)(_CL.CL_RECHARTS_LAYER, className),
    ...(0, _ReactUtils.filterProps)(restProps, true),
    ref: refEl,
    children: children
  });
};
exports.Layer = Layer;
//# sourceMappingURL=Layer.js.map