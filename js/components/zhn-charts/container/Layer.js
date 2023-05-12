"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Layer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _uiApi = require("../../uiApi");
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["children", "className"];
var CL_RECHARTS_LAYER = 'recharts-layer';
var Layer = (0, _uiApi.forwardRef)(function (props, ref) {
  var children = props.children,
    className = props.className,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded),
    layerClass = (0, _classnames["default"])(CL_RECHARTS_LAYER, className);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", (0, _extends2["default"])({
    className: layerClass
  }, (0, _ReactUtils.filterProps)(restProps, true), {
    ref: ref,
    children: children
  }));
});
exports.Layer = Layer;
//# sourceMappingURL=Layer.js.map