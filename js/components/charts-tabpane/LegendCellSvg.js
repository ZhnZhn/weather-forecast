"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _LegendCell = _interopRequireDefault(require("./LegendCell"));

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _SvgRect = _interopRequireDefault(require("./SvgRect"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["svgStyle", "svgType"];
var LS_ITEM = {
  display: 'inline-block',
  marginRight: '1rem',
  padding: '0 4px 4px 4px'
};

var LegendCellSvg = function LegendCellSvg(_ref) {
  var _ref$svgStyle = _ref.svgStyle,
      svgStyle = _ref$svgStyle === void 0 ? _Label["default"].CIRCLE_SERIA : _ref$svgStyle,
      svgType = _ref.svgType,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  var SvgComp = svgType === 'rect' ? _SvgRect["default"] : _SvgCircle["default"];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], (0, _extends2["default"])({
    style: LS_ITEM
  }, restProps, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgComp, (0, _extends2["default"])({}, svgStyle))
  }));
};

var _default = LegendCellSvg;
exports["default"] = _default;
//# sourceMappingURL=LegendCellSvg.js.map