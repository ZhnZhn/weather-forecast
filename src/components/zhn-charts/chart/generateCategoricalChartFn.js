import {
  _isFn
} from '../util/FnUtils';

import {
  calculateActiveTickIndex,
  getTicksOfAxis,
  getBandSizeOfAxis
} from '../util/ChartUtils';

import {
  getAnyElementOfObject
} from '../util/DataUtils';

import {
  getDisplayName
} from '../util/ReactUtils';

import {
  originCoordinate,
  isLayoutHorizontal,
  isLayoutVertical,
  isLayoutCentric
} from './chartFn';

import {
  getTooltipContent
} from './getTooltipContent';

export const defer = _isFn(requestAnimationFrame)
  ? requestAnimationFrame
  : _isFn(window.setImmediate)
      ? window.setImmediate
      : setTimeout;

export const deferClear = _isFn(cancelAnimationFrame)
  ? cancelAnimationFrame
  : _isFn(window.clearImmediate)
      ? window.clearImmediate
      : clearTimeout;

const calculateTooltipPos = (
  rangeObj,
  layout
) => isLayoutHorizontal(layout)
  ? rangeObj.x
  : isLayoutVertical(layout)
      ? rangeObj.y
      : isLayoutCentric(layout)
          ? rangeObj.angle
          : rangeObj.radius;

const getActiveCoordinate = (
  layout,
  tooltipTicks,
  activeIndex,
  rangeObj
) => {
  const entry = tooltipTicks
    .find(tick => tick && tick.index === activeIndex);

  if (!entry) {
    return originCoordinate;
  }

  return isLayoutHorizontal(layout)
    ? {
       x: entry.coordinate,
       y: rangeObj.y
      }
    //vertical layout case
    : {
       x: rangeObj.x,
       y: entry.coordinate
     };
};

/**
 * Returns tooltip data based on a mouse position (as a parameter or in state)
 * @param  {Object} state     current state
 * @param  {Array}  chartData the data defined in chart
 * @param  {String} layout     The layout type of chart
 * @param  {Object} rangeObj  { x, y } coordinates
 * @return {Object}           Tooltip data data
 */
export const getTooltipData = (
  state,
  chartData,
  layout,
  rangeObj
) => {
  const rangeData = rangeObj || {
    x: state.chartX,
    y: state.chartY
  }
  , pos = calculateTooltipPos(
      rangeData,
      layout
    )
  , {
    orderedTooltipTicks: ticks,
    tooltipAxis: axis,
    tooltipTicks
  } = state
  , activeIndex = calculateActiveTickIndex(
     pos,
     ticks,
     tooltipTicks,
     axis
  );
  if (activeIndex >= 0 && tooltipTicks) {
    const activeLabel = tooltipTicks[activeIndex] && tooltipTicks[activeIndex].value
    , activePayload = getTooltipContent(
        state,
        chartData,
        activeIndex,
        activeLabel
      )
    , activeCoordinate = getActiveCoordinate(
        layout,
        ticks,
        activeIndex,
        rangeData
      );
    return {
      activeTooltipIndex: activeIndex,
      activeLabel,
      activePayload,
      activeCoordinate,
    };
  }
  return null;
};

export const tooltipTicksGenerator = (
  axisMap
) => {
  const axis = getAnyElementOfObject(axisMap)
  , tooltipTicks = getTicksOfAxis(axis, false, true);
  return {
    tooltipTicks,
    //orderedTooltipTicks: _sortBy(tooltipTicks, o => o.coordinate),
    orderedTooltipTicks: tooltipTicks.sort(o => o.coordinate),
    tooltipAxis: axis,
    tooltipAxisBandSize: getBandSizeOfAxis(axis, tooltipTicks),
  };
};

export const hasGraphicalBarItem = (
  graphicalItems
) => !graphicalItems || !graphicalItems.length
  ? false
  : graphicalItems.some(item => {
      const name = getDisplayName(item && item.type);
      return name && name.indexOf('Bar') >= 0;
    });

export const getAxisNameByLayout = (
  layout
) => isLayoutHorizontal(layout)
  ? { numericAxisName: 'yAxis', cateAxisName: 'xAxis' }
  : isLayoutVertical(layout)
      ? { numericAxisName: 'xAxis', cateAxisName: 'yAxis' }
      : isLayoutCentric(layout)
          ? { numericAxisName: 'radiusAxis', cateAxisName: 'angleAxis' }
          : { numericAxisName: 'angleAxis', cateAxisName: 'radiusAxis' };
