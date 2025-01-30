import { filterProps } from '../util/ReactUtils';
import { getTicks } from './getTicks';

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
  ticks,
  fontSize,
  letterSpacing
}) => {
  const {
    tickLine,
    stroke,
    tick,
    tickFormatter,
    orientation,
    mirror
  } = props
  , finalTicks = getTicks(
     { ...props, ticks },
     fontSize,
     letterSpacing
   )
  , [
    textAnchor,
    verticalAnchor
  ] = getTickAnchors(orientation, mirror)
  , axisProps = filterProps(props)
  , customTickProps = filterProps(tick)
  , tickLineProps = {
      ...axisProps,
      fill: 'none',
      ...filterProps(tickLine),
  };
  return (
    <g className={CL_AXIS_TICKS}>
      {finalTicks.map((entry, i) => {
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
              visibleTicksCount: finalTicks.length,
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
