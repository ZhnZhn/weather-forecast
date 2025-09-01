import {
  isFn,
  isNumber,
  isNotEmptyArr
} from '../../../utils/isTypeFn';

import { getTicks } from './getTicks';

export const getClassName = (
  obj
) => obj
  ? obj.className
  : void 0

const _crFinalTicks = (
  props
) => {
  const {
    ticks,
    ticksGenerator,
    ...noTicksProps
  } = props;

  return isFn(ticksGenerator)
    ? ticks && ticks.length > 0
       ? ticksGenerator(props)
       : ticksGenerator(noTicksProps)
    : ticks;
}

export const getCartesianAxisTicks = (
  props,
  fontSize,
  letterSpacing
) => {
  const finalTicks = _crFinalTicks(props);
  return isNotEmptyArr(finalTicks) ? getTicks(
    {...props, ticks: finalTicks},
    fontSize,
    letterSpacing
  ) : void 0;
}

//[textAnchor, verticalAnchor]
export const getTickAnchors = (
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
export const getTickLineCoord = (
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
