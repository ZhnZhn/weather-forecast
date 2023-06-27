"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Layer = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ReactUtils = require("../util/ReactUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const Layer = (0, _uiApi.forwardRef)((props, ref) => {
  const {
    children,
    className,
    ...restProps
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: (0, _crCn.default)(_CL.CL_RECHARTS_LAYER, className),
    ...(0, _ReactUtils.filterProps)(restProps, true),
    ref: ref,
    children: children
  });
});
exports.Layer = Layer;
//# sourceMappingURL=Layer.js.map