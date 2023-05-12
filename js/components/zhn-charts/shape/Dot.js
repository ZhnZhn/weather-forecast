"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Dot = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _classnames = _interopRequireDefault(require("classnames"));
var _types = require("../util/types");
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
var CL_DOT = "recharts-dot";
var Dot = (0, _uiApi.memo)(function (props) {
  var cx = props.cx,
    cy = props.cy,
    r = props.r,
    className = props.className,
    layerClass = (0, _classnames["default"])(CL_DOT, className);
  return cx === +cx && cy === +cy && r === +r ? /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(props), (0, _types.adaptEventHandlers)(props), {
    className: layerClass,
    cx: cx,
    cy: cy,
    r: r
  })) : null;
});
exports.Dot = Dot;
//# sourceMappingURL=Dot.js.map