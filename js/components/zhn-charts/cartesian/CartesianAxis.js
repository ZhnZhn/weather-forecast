"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianAxis = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ShallowEqual = require("../util/ShallowEqual");
var _ReactUtils = require("../util/ReactUtils");
var _Layer = require("../container/Layer");
var _Label = require("../component/Label");
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
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
    width,
    height,
    className,
    hide
  } = _props;
  if (hide) {
    return null;
  }
  const finalTicks = (0, _CartesianAxisRenderFn.crFinalTicks)(_props);
  if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
    refEl: _refLayer,
    className: (0, _crCn.default)(_CL.CL_AXIS, className),
    children: [axisLine && (0, _CartesianAxisRenderFn.renderAxisLine)(props), (0, _CartesianAxisRenderFn.renderTicks)(props, finalTicks, fontSize, letterSpacing), _Label.Label.renderCallByParent(props)]
  });
}, _arePropsEqual);
CartesianAxis.displayName = 'CartesianAxis';
CartesianAxis.defaultProps = CARTESIAN_AXIS_DF_PROPS;
//# sourceMappingURL=CartesianAxis.js.map