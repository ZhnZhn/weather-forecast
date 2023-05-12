"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Surface = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _classnames = _interopRequireDefault(require("classnames"));
var _ReactUtils = require("../util/ReactUtils");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["children", "width", "height", "viewBox", "className", "style"];
var CL_RECHARTS_SURFACE = 'recharts-surface';
var _crViewBox = function _crViewBox(svgView) {
  return svgView.x + " " + svgView.y + " " + svgView.width + " " + svgView.height;
};
var Surface = function Surface(props) {
  var children = props.children,
    width = props.width,
    height = props.height,
    viewBox = props.viewBox,
    className = props.className,
    style = props.style,
    restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded),
    svgView = viewBox || {
      width: width,
      height: height,
      x: 0,
      y: 0
    },
    layerClass = (0, _classnames["default"])(CL_RECHARTS_SURFACE, className);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", (0, _extends2["default"])({}, (0, _ReactUtils.filterProps)(restProps, true, 'svg'), {
    className: layerClass,
    width: width,
    height: height,
    style: style,
    viewBox: _crViewBox(svgView),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
      children: props.title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("desc", {
      children: props.desc
    }), children]
  }));
};
exports.Surface = Surface;
//# sourceMappingURL=Surface.js.map