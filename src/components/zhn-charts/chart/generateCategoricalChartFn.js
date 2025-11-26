import {
  isLayoutHorizontal,
  isLayoutVertical,
  isLayoutCentric,
  calculateActiveTickIndex,
  getTicksOfAxis
} from '../util/ChartUtils';

import {
  getAnyElementOfObject
} from '../util/DataUtils';

import { getDisplayName } from '../util/ReactUtils';

import { originCoordinate } from './chartFn';
import { getTooltipContent } from './getTooltipContent';

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
    x: 0,
    y: 0
  }
  , pos = calculateTooltipPos(
      rangeData,
      layout
    )
  , {
    orderedTooltipTicks
  } = state
  , activeIndex = calculateActiveTickIndex(
     pos,
     orderedTooltipTicks
  );
  if (activeIndex >= 0 && orderedTooltipTicks) {
    const activeLabel = orderedTooltipTicks[activeIndex] && orderedTooltipTicks[activeIndex].value
    , activePayload = getTooltipContent(
        state,
        chartData,
        activeIndex,
        activeLabel
      )
    , activeCoordinate = getActiveCoordinate(
        layout,
        orderedTooltipTicks,
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
    orderedTooltipTicks: tooltipTicks.sort(o => o.coordinate)
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

const _crAxisName = (
  numericAxisName,
  cateAxisName
) => ({
  numericAxisName,
  cateAxisName
});
export const getAxisNameByLayout = (
  layout
) => isLayoutHorizontal(layout)
  ? _crAxisName('yAxis','xAxis')
  : isLayoutVertical(layout)
  ? _crAxisName('xAxis', 'yAxis')
  : isLayoutCentric(layout)
  ? _crAxisName('radiusAxis', 'angleAxis')
  : _crAxisName('angleAxis', 'radiusAxis')
