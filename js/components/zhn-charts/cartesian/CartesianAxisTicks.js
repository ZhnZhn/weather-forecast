"use strict";

exports.__esModule = true;
exports.CartesianAxisTicks = void 0;
var _ReactUtils = require("../util/ReactUtils");
var _getTicks = require("./getTicks");
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
    ticks,
    fontSize,
    letterSpacing
  } = _ref;
  const {
      tickLine,
      stroke,
      tick,
      tickFormatter,
      orientation,
      mirror
    } = props,
    finalTicks = (0, _getTicks.getTicks)({
      ...props,
      ticks
    }, fontSize, letterSpacing),
    [textAnchor, verticalAnchor] = (0, _CartesianAxisRenderFn.getTickAnchors)(orientation, mirror),
    axisProps = (0, _ReactUtils.filterProps)(props),
    customTickProps = (0, _ReactUtils.filterProps)(tick),
    tickLineProps = {
      ...axisProps,
      fill: 'none',
      ...(0, _ReactUtils.filterProps)(tickLine)
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: _CL.CL_AXIS_TICKS,
    children: finalTicks.map((entry, i) => {
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
          visibleTicksCount: finalTicks.length,
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