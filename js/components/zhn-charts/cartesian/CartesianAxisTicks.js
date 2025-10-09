"use strict";

exports.__esModule = true;
exports.CartesianAxisTicks = void 0;
var _CartesianAxisRenderFn = require("./CartesianAxisRenderFn");
var _CL = require("../CL");
var _CartesianAxisTick = require("./CartesianAxisTick");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
 * @param {string} fontSize Fontsize to consider for tick spacing
 * @param {string} letterSpacing Letterspacing to consider for tick spacing
 */

const CartesianAxisTicks = _ref => {
  let {
    props,
    ticks
  } = _ref;
  const {
      tickLine,
      stroke,
      tick,
      tickFormatter,
      orientation,
      mirror
    } = props,
    [textAnchor, verticalAnchor] = (0, _CartesianAxisRenderFn.getTickAnchors)(orientation, mirror),
    axisProps = {
      className: props.className,
      orientation: props.orientation,
      stroke: props.stroke,
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height
    },
    customTickProps = tick ? {
      fill: tick.fill,
      stroke: tick.stroke,
      style: tick.style
    } : null,
    tickLineProps = {
      ...axisProps,
      fill: 'none',
      stroke: tickLine ? tickLine.stroke : void 0
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: _CL.CL_AXIS_TICKS,
    children: ticks.map((entry, i) => {
      const {
          line: lineCoord,
          tick: tickCoord
        } = (0, _CartesianAxisRenderFn.getTickLineCoord)(props, entry),
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
          visibleTicksCount: ticks.length,
          tickFormatter
        };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianAxisTick.CartesianAxisTick, {
        props: props,
        entry: entry,
        i: i,
        tickProps: tickProps,
        tickLineProps: tickLineProps,
        lineCoord: lineCoord
      }, `tick-${i}`);
    })
  });
};
exports.CartesianAxisTicks = CartesianAxisTicks;
//# sourceMappingURL=CartesianAxisTicks.js.map