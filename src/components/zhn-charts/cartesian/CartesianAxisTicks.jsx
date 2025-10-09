import {
  getTickAnchors,
  getTickLineCoord
} from './CartesianAxisRenderFn';

import { CL_AXIS_TICKS } from '../CL';

import { CartesianAxisTick } from './CartesianAxisTick';

/**
 * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
 * @param {string} fontSize Fontsize to consider for tick spacing
 * @param {string} letterSpacing Letterspacing to consider for tick spacing
 */

export const CartesianAxisTicks = ({
  props,
  ticks
}) => {
  const {
    tickLine,
    stroke,
    tick,
    tickFormatter,
    orientation,
    mirror
  } = props
  , [
    textAnchor,
    verticalAnchor
  ] = getTickAnchors(orientation, mirror)
  , axisProps = {
    className: props.className,
    orientation: props.orientation,
    stroke: props.stroke,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height
  }
  , customTickProps = tick
      ? {
        fill: tick.fill,
        stroke: tick.stroke,
        style: tick.style
      } : null
  , tickLineProps = {
      ...axisProps,
      fill: 'none',
      stroke: tickLine ? tickLine.stroke : void 0
  };
  return (
    <g className={CL_AXIS_TICKS}>
      {ticks.map((entry, i) => {
          const {
            line: lineCoord,
            tick: tickCoord
          } = getTickLineCoord(props, entry)
          , tickProps = {
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
          return (
            <CartesianAxisTick
              key={`tick-${i}`}
              props={props}
              entry={entry}
              i={i}
              tickProps={tickProps}
              tickLineProps={tickLineProps}
              lineCoord={lineCoord}
            />
          );
      })}
    </g>
  );
}
