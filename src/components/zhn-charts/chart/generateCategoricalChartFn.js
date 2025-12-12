import {
  isLayoutHorizontal,
  calculateActiveTickIndex,
  getTicksOfAxis
} from '../util/ChartUtils';

import {
  getAnyElementOfObject
} from '../util/DataUtils';

import { getDisplayName } from '../util/ReactUtils';

import { getBarComposedData } from '../cartesian/Bar';
import { getLineComposedData } from '../cartesian/Line';

import { originCoordinate } from './chartFn';
import { getTooltipContent } from './getTooltipContent';

const _calculateTooltipPos = (
  rangeObj,
  layout
) => isLayoutHorizontal(layout)
  ? rangeObj.x
  : rangeObj.y;

const _getActiveCoordinate = (
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
  orderedTooltipTicks,
  graphicalItems,
  chartData,
  layout,
  rangeObj
) => {
  const rangeData = rangeObj || {
    x: 0,
    y: 0
  }
  , pos = _calculateTooltipPos(
      rangeData,
      layout
    )
  , activeIndex = calculateActiveTickIndex(
     pos,
     orderedTooltipTicks
  );
  if (activeIndex >= 0 && orderedTooltipTicks) {
    const activeLabel = orderedTooltipTicks[activeIndex] && orderedTooltipTicks[activeIndex].value
    , activePayload = getTooltipContent(
        graphicalItems,
        chartData,
        activeIndex,
        activeLabel
      )
    , activeCoordinate = _getActiveCoordinate(
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

export const getOrderedTooltipTicks = (
  axisMap
) => getTicksOfAxis(
  getAnyElementOfObject(axisMap),
  false,
  true
).sort(o => o.coordinate)

const _fIsItemType = (
  strType
) => (
  item
) => (getDisplayName(item && item.type) || '')
  .indexOf(strType) >= 0

export const isItemTypeBar = _fIsItemType('Bar')
const _isItemTypeLine = _fIsItemType('Line');

export const getBarSizeList = (
  graphicalItems,
  barSize
) => (graphicalItems || [])
 .filter(isItemTypeBar)
 .map(item => ({
   item,
   barSize: item.props.barSize ?? barSize,
   stackList: []
 }))

export const getComposedDataFn = (
  item
) => isItemTypeBar(item)
  ? getBarComposedData
  : _isItemTypeLine(item)
  ? getLineComposedData
  : void 0

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
  : _crAxisName('xAxis','yAxis')
