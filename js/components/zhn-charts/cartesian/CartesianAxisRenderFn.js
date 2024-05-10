"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderTicks = exports.renderAxisLine = exports.crFinalTicks = void 0;
var _crCn = _interopRequireDefault(require("../../zhn-utils/crCn"));
var _types = require("../util/types");
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _Layer = require("../container/Layer");
var _Text = require("../component/Text");
var _getTicks = require("./getTicks");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const crFinalTicks = props => {
  const {
    ticks,
    ticksGenerator,
    ...noTicksProps
  } = props;
  return (0, _FnUtils._isFn)(ticksGenerator) ? ticks && ticks.length > 0 ? ticksGenerator(props) : ticksGenerator(noTicksProps) : ticks;
};

//[textAnchor, verticalAnchor]
exports.crFinalTicks = crFinalTicks;
const getTickAnchors = (orientation, mirror) => [orientation === 'left' ? mirror ? 'start' : 'end' : orientation === 'right' ? mirror ? 'end' : 'start' : 'middle', orientation === 'left' || orientation === 'right' ? 'middle' : orientation === 'top' ? mirror ? 'start' : 'end' : mirror ? 'end' : 'start'];

/**
 * Calculate the coordinates of endpoints in ticks
 * @param  {Object} data The data of a simple tick
 * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
 *  (x2, y2): The coordinate of endpoint close to axis
 */
const getTickLineCoord = (props, data) => {
  const {
      x,
      y,
      width,
      height,
      orientation,
      tickSize,
      mirror,
      tickMargin
    } = props,
    sign = mirror ? -1 : 1,
    finalTickSize = data.tickSize || tickSize,
    tickCoord = (0, _DataUtils.isNumber)(data.tickCoord) ? data.tickCoord : data.coordinate;
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
    line: {
      x1,
      y1,
      x2,
      y2
    },
    tick: {
      x: tx,
      y: ty
    }
  };
};
const _getClassName = obj => obj ? obj.className : void 0;
const renderAxisLine = props => {
  const {
    x,
    y,
    width,
    height,
    orientation,
    mirror,
    axisLine
  } = props;
  let _props = {
    ...(0, _ReactUtils.filterProps)(props),
    ...(0, _ReactUtils.filterProps)(axisLine),
    fill: 'none'
  };
  if (orientation === 'top' || orientation === 'bottom') {
    const needHeight = +(orientation === 'top' && !mirror || orientation === 'bottom' && mirror);
    _props = {
      ...props,
      x1: x,
      y1: y + needHeight * height,
      x2: x + width,
      y2: y + needHeight * height
    };
  } else {
    const needWidth = +(orientation === 'left' && !mirror || orientation === 'right' && mirror);
    _props = {
      ...props,
      x1: x + needWidth * width,
      y1: y,
      x2: x + needWidth * width,
      y2: y + height
    };
  }
  const _axisLineClassName = _getClassName(axisLine);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
    ..._props,
    className: (0, _crCn.default)(_CL.CL_AXIS_LINE, _axisLineClassName)
  });
};
exports.renderAxisLine = renderAxisLine;
const _crTextElement = (props, option, value) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.Text, {
  ...props,
  className: _CL.CL_AXIS_TICK_VALUE,
  children: value
});
const _renderTickItem = (0, _cartesianFn.fCreateElement)(_crTextElement);

/**
 * render the ticks
 * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
 * @param {string} fontSize Fontsize to consider for tick spacing
 * @param {string} letterSpacing Letterspacing to consider for tick spacing
 * @return {ReactComponent} renderedTicks
 */
const renderTicks = (props, ticks, fontSize, letterSpacing) => {
  const {
      tickLine,
      stroke,
      tick,
      tickFormatter,
      unit,
      orientation,
      mirror
    } = props,
    finalTicks = (0, _getTicks.getTicks)({
      ...props,
      ticks
    }, fontSize, letterSpacing),
    [textAnchor, verticalAnchor] = getTickAnchors(orientation, mirror),
    axisProps = (0, _ReactUtils.filterProps)(props),
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
        } = getTickLineCoord(props, entry),
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
        ...(0, _types.adaptEventsOfChild)(props, entry, i),
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
};
exports.renderTicks = renderTicks;
//# sourceMappingURL=CartesianAxisRenderFn.js.map