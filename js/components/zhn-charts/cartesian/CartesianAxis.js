"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.CartesianAxis = void 0;
var _uiApi = require("../../uiApi");
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _FnUtils = require("../util/FnUtils");
var _ShallowEqual = require("../util/ShallowEqual");
var _types = require("../util/types");
var _ReactUtils = require("../util/ReactUtils");
var _Layer = require("../container/Layer");
var _Text = require("../component/Text");
var _Label = require("../component/Label");
var _getTicks = require("./getTicks");
var _cartesianFn = require("./cartesianFn");
var _CartesianAxisFn = require("./CartesianAxisFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import { isNumber } from '../util/DataUtils';

const _crTextElement = (props, option, value) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, {
  ...props,
  className: _CL.CL_AXIS_TICK_VALUE,
  children: value
});
const _getClassName = obj => obj ? obj.className : void 0;
const _crFinalTicks = props => {
  const {
    ticks,
    ticksGenerator,
    ...noTicksProps
  } = props;
  return (0, _FnUtils._isFn)(ticksGenerator) ? ticks && ticks.length > 0 ? ticksGenerator(props) : ticksGenerator(noTicksProps) : ticks;
};
const _renderTickItem = (0, _cartesianFn.fCreateElement)(_crTextElement);
class CartesianAxis extends _uiApi.Component {
  constructor() {
    super(...arguments);
    this.state = {
      fontSize: '',
      letterSpacing: ''
    };
    this._refLayerReference = ref => {
      this.layerReference = ref;
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

  /**
   * Calculate the coordinates of endpoints in ticks
   * @param  {Object} data The data of a simple tick
   * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
   *  (x2, y2): The coordinate of endpoint close to axis
   */
  /*
  getTickLineCoord(data) {
   const {
     x,
     y,
     width,
     height,
     orientation,
     tickSize,
     mirror,
     tickMargin
   } = this.props
   , sign = mirror ? -1 : 1
   , finalTickSize = data.tickSize || tickSize
   , tickCoord = isNumber(data.tickCoord)
      ? data.tickCoord
      : data.coordinate;
   let x1, x2, y1, y2, tx, ty;
   switch (orientation) {
     case 'top':
       x1 = x2 = data.coordinate;
       y2 = y + +!mirror * height;
       y1 = y2 - sign * finalTickSize;
       ty = y1 - sign * tickMargin;
       tx = tickCoord;
       break;
     case 'left':
       y1 = y2 = data.coordinate;
       x2 = x + +!mirror * width;
       x1 = x2 - sign * finalTickSize;
       tx = x1 - sign * tickMargin;
       ty = tickCoord;
       break;
     case 'right':
       y1 = y2 = data.coordinate;
       x2 = x + +mirror * width;
       x1 = x2 + sign * finalTickSize;
       tx = x1 + sign * tickMargin;
       ty = tickCoord;
       break;
     default:
       x1 = x2 = data.coordinate;
       y2 = y + +mirror * height;
       y1 = y2 + sign * finalTickSize;
       ty = y1 + sign * tickMargin;
       tx = tickCoord;
       break;
   }
   return {
     line: { x1, y1, x2, y2 },
     tick: { x: tx, y: ty }
   };
  }
  */

  renderAxisLine() {
    const {
      x,
      y,
      width,
      height,
      orientation,
      mirror,
      axisLine
    } = this.props;
    let props = {
      ...(0, _ReactUtils.filterProps)(this.props),
      ...(0, _ReactUtils.filterProps)(axisLine),
      fill: 'none'
    };
    if (orientation === 'top' || orientation === 'bottom') {
      const needHeight = +(orientation === 'top' && !mirror || orientation === 'bottom' && mirror);
      props = {
        ...props,
        x1: x,
        y1: y + needHeight * height,
        x2: x + width,
        y2: y + needHeight * height
      };
    } else {
      const needWidth = +(orientation === 'left' && !mirror || orientation === 'right' && mirror);
      props = {
        ...props,
        x1: x + needWidth * width,
        y1: y,
        x2: x + needWidth * width,
        y2: y + height
      };
    }
    const _axisLineClassName = _getClassName(axisLine);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      ...props,
      className: (0, _crCn.default)(_CL.CL_AXIS_LINE, _axisLineClassName)
    });
  }

  /**
   * render the ticks
   * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
   * @param {string} fontSize Fontsize to consider for tick spacing
   * @param {string} letterSpacing Letterspacing to consider for tick spacing
   * @return {ReactComponent} renderedTicks
   */
  renderTicks(ticks, fontSize, letterSpacing) {
    const {
        tickLine,
        stroke,
        tick,
        tickFormatter,
        unit,
        orientation,
        mirror
      } = this.props,
      finalTicks = (0, _getTicks.getTicks)({
        ...this.props,
        ticks
      }, fontSize, letterSpacing),
      [textAnchor, verticalAnchor] = (0, _CartesianAxisFn.getTickAnchors)(orientation, mirror),
      axisProps = (0, _ReactUtils.filterProps)(this.props),
      customTickProps = (0, _ReactUtils.filterProps)(tick),
      tickLineProps = {
        ...axisProps,
        fill: 'none',
        ...(0, _ReactUtils.filterProps)(tickLine)
      },
      items = finalTicks.map((entry, i) => {
        const {
            line: lineCoord,
            tick: tickCoord
          } = (0, _CartesianAxisFn.getTickLineCoord)(this.props, entry),
          tickProps = {
            textAnchor,
            verticalAnchor,
            ...axisProps,
            stroke: 'none',
            fill: stroke,
            ...customTickProps,
            ...tickCoord,
            index: i,
            payload: entry,
            visibleTicksCount: finalTicks.length,
            tickFormatter
          };
        const _tickLineClassName = _getClassName(tickLine);
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
          className: _CL.CL_AXIS_TICK,
          ...(0, _types.adaptEventsOfChild)(this.props, entry, i),
          children: [tickLine && /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
            ...tickLineProps,
            ...lineCoord,
            className: (0, _crCn.default)(_CL.CL_AXIS_TICK_LINE, _tickLineClassName)
          }), tick && _renderTickItem(tick, tickProps, "" + ((0, _FnUtils._isFn)(tickFormatter) ? tickFormatter(entry.value, i) : entry.value) + (unit || ''))]
        }, "tick-" + i);
      });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: _CL.CL_AXIS_TICKS,
      children: items
    });
  }
  render() {
    const {
      axisLine,
      width,
      height,
      className,
      hide
    } = this.props;
    if (hide) {
      return null;
    }
    const finalTicks = _crFinalTicks(this.props);
    if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
      return null;
    }
    const {
      fontSize,
      letterSpacing
    } = this.state;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Layer.Layer, {
      className: (0, _crCn.default)(_CL.CL_AXIS, className),
      refEl: this._refLayerReference,
      children: [axisLine && this.renderAxisLine(), this.renderTicks(finalTicks, fontSize, letterSpacing), _Label.Label.renderCallByParent(this.props)]
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