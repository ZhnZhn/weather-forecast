"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Dot = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _types = require("../util/types");
var _ReactUtils = require("../util/ReactUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const Dot = (0, _uiApi.memo)(props => {
  const {
    cx,
    cy,
    r,
    className
  } = props;
  return cx === +cx && cy === +cy && r === +r ? /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
    ...(0, _ReactUtils.filterProps)(props),
    ...(0, _types.adaptEventHandlers)(props),
    className: (0, _crCn.default)(_CL.CL_DOT, className),
    cx: cx,
    cy: cy,
    r: r
  }) : null;
});
exports.Dot = Dot;
//# sourceMappingURL=Dot.js.map