"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianAxis = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _ShallowEqual = require("../util/ShallowEqual");
var _Layer = require("../container/Layer");
var _Label = require("../component/Label");
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
class CartesianAxis extends _uiApi.Component {
  constructor() {
    super(...arguments);
    this.state = {
      fontSize: '',
      letterSpacing: ''
    };
    this._refLayerReference = layerEl => {
      this.layerReference = layerEl;
    };
  }
  shouldComponentUpdate(_ref, nextState) {
    let {
      viewBox,
      ...restProps
    } = _ref;
    // props.viewBox is sometimes generated every time -
    // check that specially as object equality is likely to fail
    const {
      viewBox: viewBoxOld,
      ...restPropsOld
    } = this.props;
    return !(0, _ShallowEqual.shallowEqual)(viewBox, viewBoxOld) || !(0, _ShallowEqual.shallowEqual)(restProps, restPropsOld) || !(0, _ShallowEqual.shallowEqual)(nextState, this.state);
  }
  componentDidMount() {
    const htmlLayer = this.layerReference;
    if (!htmlLayer) {
      return;
    }
    const tick = htmlLayer.getElementsByClassName(_CL.CL_AXIS_TICK_VALUE)[0];
    if (tick) {
      const _tickComputedStyle = window.getComputedStyle(tick);
      this.setState({
        fontSize: _tickComputedStyle.fontSize,
        letterSpacing: _tickComputedStyle.letterSpacing
      });
    }
  }
  render() {
    const {
        props,
        state
      } = this,
      {
        axisLine,
        width,
        height,
        className,
        hide
      } = props;
    if (hide) {
      return null;
    }
    const finalTicks = (0, _CartesianAxisRenderFn.crFinalTicks)(props);
    if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
      return null;
    }
    const {
      fontSize,
      letterSpacing
    } = state;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      refEl: this._refLayerReference,
      className: (0, _crCn.default)(_CL.CL_AXIS, className),
      children: [axisLine && (0, _CartesianAxisRenderFn.renderAxisLine)(props), (0, _CartesianAxisRenderFn.renderTicks)(props, finalTicks, fontSize, letterSpacing), _Label.Label.renderCallByParent(props)]
    });
  }
}
exports.CartesianAxis = CartesianAxis;
CartesianAxis.displayName = 'CartesianAxis';
CartesianAxis.defaultProps = {
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
//# sourceMappingURL=CartesianAxis.js.map