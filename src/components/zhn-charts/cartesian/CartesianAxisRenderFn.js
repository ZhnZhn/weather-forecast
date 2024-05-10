import crCn from '../../zhn-utils/crCn';

import { adaptEventsOfChild } from '../util/types';
import { _isFn } from '../util/FnUtils';
import { isNumber } from '../util/DataUtils';
import { filterProps } from '../util/ReactUtils';

import { Layer } from '../container/Layer';
import { Text } from '../component/Text';

import { getTicks } from './getTicks';
import { fCreateElement } from './cartesianFn';

import {
  //CL_AXIS,
  CL_AXIS_LINE,
  CL_AXIS_TICK,
  CL_AXIS_TICKS,
  CL_AXIS_TICK_LINE,
  CL_AXIS_TICK_VALUE
} from '../CL';

export const crFinalTicks = (
  props
) => {
  const {
    ticks,
    ticksGenerator,
    ...noTicksProps
  } = props;

  return _isFn(ticksGenerator)
    ? ticks && ticks.length > 0
       ? ticksGenerator(props)
       : ticksGenerator(noTicksProps)
    : ticks;
}

//[textAnchor, verticalAnchor]
const getTickAnchors = (
  orientation,
  mirror
) => [
  orientation === 'left'
     ? mirror ? 'start' : 'end'
     : orientation === 'right'
        ? mirror ? 'end' : 'start'
        : 'middle',
  orientation === 'left' || orientation === 'right'
    ? 'middle'
    : orientation === 'top'
       ? mirror ? 'start' : 'end'
       : mirror ? 'end' : 'start'
];

/**
 * Calculate the coordinates of endpoints in ticks
 * @param  {Object} data The data of a simple tick
 * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
 *  (x2, y2): The coordinate of endpoint close to axis
 */
const getTickLineCoord = (
  props,
  data
) => {
  const {
    x,
    y,
    width,
    height,
    orientation,
    tickSize,
    mirror,
    tickMargin
  } = props
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

const _getClassName = (
  obj
) => obj
  ? obj.className
  : void 0;

export const renderAxisLine = (props) => {
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
    ...filterProps(props),
    ...filterProps(axisLine),
    fill: 'none'
  };
  if (orientation === 'top' || orientation === 'bottom') {
    const needHeight = +((orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror));
    _props = {
      ...props,
      x1: x,
      y1: y + needHeight * height,
      x2: x + width,
      y2: y + needHeight * height
    };
  } else {
     const needWidth = +((orientation === 'left' && !mirror) || (orientation === 'right' && mirror));
     _props = {
       ...props,
       x1: x + needWidth * width,
       y1: y,
       x2: x + needWidth * width,
       y2: y + height
     };
  }
  const _axisLineClassName = _getClassName(axisLine);
  return (
    <line
      {..._props}
      className={crCn(CL_AXIS_LINE, _axisLineClassName)}
    />
  );
}

const _crTextElement = (
  props,
  option,
  value
) => (
  <Text {...props} className={CL_AXIS_TICK_VALUE}>
    {value}
  </Text>
);
const _renderTickItem = fCreateElement(_crTextElement);

/**
 * render the ticks
 * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
 * @param {string} fontSize Fontsize to consider for tick spacing
 * @param {string} letterSpacing Letterspacing to consider for tick spacing
 * @return {ReactComponent} renderedTicks
 */
export const renderTicks = (
  props,
  ticks,
  fontSize,
  letterSpacing
) => {
  const {
    tickLine,
    stroke,
    tick,
    tickFormatter,
    unit,
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
  }
  , items = finalTicks.map((entry, i) => {
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
      const _tickLineClassName = _getClassName(tickLine);
      return (
        <Layer className={CL_AXIS_TICK} key={`tick-${i}`}
          {...adaptEventsOfChild(props, entry, i)}>
          {tickLine && (
             <line
                {...tickLineProps}
                {...lineCoord}
                className={crCn(CL_AXIS_TICK_LINE, _tickLineClassName)}
             />
           )}
          {tick && _renderTickItem(tick, tickProps, `${_isFn(tickFormatter) ? tickFormatter(entry.value, i) : entry.value}${unit || ''}`)}
        </Layer>
      );
  });
  return (
    <g className={CL_AXIS_TICKS}>
      {items}
    </g>
  );
}
