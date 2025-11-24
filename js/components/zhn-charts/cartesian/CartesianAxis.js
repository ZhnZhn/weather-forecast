"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianAxis = exports.CARTESIAN_AXIS_DF_PROPS = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _ShallowEqual = require("../util/ShallowEqual");
var _Layer = require("../container/Layer");
var _Label = require("../component/Label");
var _useFontSizeByClassName = _interopRequireDefault(require("./useFontSizeByClassName"));
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
var _CartesianAxisLine = require("./CartesianAxisLine");
var _CartesianAxisTicks = require("./CartesianAxisTicks");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["viewBox"],
  _excluded2 = ["viewBox"];
const CARTESIAN_AXIS_DF_PROPS = exports.CARTESIAN_AXIS_DF_PROPS = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: 'bottom',
  // The ticks
  ticks: [],
  stroke: '#666',
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: 'preserveEnd'
};
const _arePropsEqual = (prevProps, nextProps) => {
  const _prevProps = (0, _uiApi.crProps)(CARTESIAN_AXIS_DF_PROPS, prevProps),
    _nextProps = (0, _uiApi.crProps)(CARTESIAN_AXIS_DF_PROPS, nextProps),
    {
      viewBox
    } = _nextProps,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(_nextProps, _excluded),
    {
      viewBox: viewBoxPrev
    } = _prevProps,
    restPropsPrev = (0, _objectWithoutPropertiesLoose2.default)(_prevProps, _excluded2);
  return (0, _ShallowEqual.shallowEqual)(viewBox, viewBoxPrev) && (0, _ShallowEqual.shallowEqual)(restProps, restPropsPrev);
};
const CartesianAxis = exports.CartesianAxis = (0, _uiApi.memo)(props => {
  const _props = (0, _uiApi.useDefaultProps)(CARTESIAN_AXIS_DF_PROPS, props),
    _refLayer = (0, _uiApi.useRef)(),
    {
      fontSize,
      letterSpacing
    } = (0, _useFontSizeByClassName.default)(_refLayer, _CL.CL_AXIS_TICK_VALUE);
  const {
    axisLine,
    className,
    width,
    height,
    hide
  } = _props;
  if (hide || width <= 0 || height <= 0) {
    return null;
  }
  const _ticks = (0, _CartesianAxisRenderFn.getCartesianAxisTicks)(_props, fontSize, letterSpacing);
  if (!_ticks) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    refEl: _refLayer,
    className: (0, _styleFn.crCn)(_CL.CL_AXIS, className),
    children: [axisLine && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianAxisLine.CartesianAxisLine, {
      className: _CL.CL_AXIS_LINE,
      props: _props
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianAxisTicks.CartesianAxisTicks, {
      props: _props,
      ticks: _ticks
    }), (0, _Label.renderLabelByParentProps)(_props)]
  });
}, _arePropsEqual);
(0, _uiApi.setDisplayNameTo)(CartesianAxis, 'CartesianAxis');
//# sourceMappingURL=CartesianAxis.js.map