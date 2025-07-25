"use strict";

exports.__esModule = true;
exports.CartesianAxis = void 0;
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _ShallowEqual = require("../util/ShallowEqual");
var _ReactUtils = require("../util/ReactUtils");
var _Layer = require("../container/Layer");
var _Label = require("../component/Label");
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
var _CartesianAxisLine = require("./CartesianAxisLine");
var _CartesianAxisTicks = require("./CartesianAxisTicks");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const CARTESIAN_AXIS_DF_PROPS = {
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
  const _prevProps = (0, _ReactUtils.crProps)(CARTESIAN_AXIS_DF_PROPS, prevProps),
    _nextProps = (0, _ReactUtils.crProps)(CARTESIAN_AXIS_DF_PROPS, nextProps),
    {
      viewBox,
      ...restProps
    } = _nextProps,
    {
      viewBox: viewBoxPrev,
      ...restPropsPrev
    } = _prevProps;
  return (0, _ShallowEqual.shallowEqual)(viewBox, viewBoxPrev) && (0, _ShallowEqual.shallowEqual)(restProps, restPropsPrev);
};
const CartesianAxis = exports.CartesianAxis = (0, _uiApi.memo)(props => {
  const _props = (0, _ReactUtils.crProps)(CARTESIAN_AXIS_DF_PROPS, props),
    [state, setState] = (0, _uiApi.useState)({
      fontSize: '',
      letterSpacing: ''
    }),
    {
      fontSize,
      letterSpacing
    } = state,
    _refLayer = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(() => {
    const htmlLayer = (0, _uiApi.getRefValue)(_refLayer);
    if (!htmlLayer) {
      return;
    }
    const tick = htmlLayer.getElementsByClassName(_CL.CL_AXIS_TICK_VALUE)[0];
    if (tick) {
      const _tickComputedStyle = window.getComputedStyle(tick);
      setState({
        fontSize: _tickComputedStyle.fontSize,
        letterSpacing: _tickComputedStyle.letterSpacing
      });
    }
  }, []);
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
    }), _Label.Label.renderCallByParent(_props)]
  });
}, _arePropsEqual);
CartesianAxis.displayName = 'CartesianAxis';
CartesianAxis.defaultProps = CARTESIAN_AXIS_DF_PROPS;
//# sourceMappingURL=CartesianAxis.js.map