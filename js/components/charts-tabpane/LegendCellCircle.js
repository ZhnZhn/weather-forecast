"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _LegendCell = _interopRequireDefault(require("./LegendCell"));

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["circleStyle"];
var LS_ITEM = {
  display: 'inline-block',
  marginRight: '1rem',
  padding: '0 4px 4px 4px'
};

var LegendCellCircle = function LegendCellCircle(_ref) {
  var _ref$circleStyle = _ref.circleStyle,
      circleStyle = _ref$circleStyle === void 0 ? _Label["default"].CIRCLE_SERIA : _ref$circleStyle,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendCell["default"], (0, _extends2["default"])({
    style: LS_ITEM
  }, restProps, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCircle["default"], (0, _extends2["default"])({}, circleStyle))
  }));
};

var _default = LegendCellCircle;
exports["default"] = _default;
//# sourceMappingURL=LegendCellCircle.js.map