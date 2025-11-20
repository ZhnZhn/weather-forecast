import {
  isObj,
  isNullOrUndef,
  //isFn
} from '../../../utils/isTypeFn';

import { cloneUiElement } from '../../uiApi';
import { crCn } from '../../styleFn';

import { CartesianAxis } from '../cartesian/CartesianAxis';
import { Tooltip } from '../component/Tooltip';

import { getTicksOfAxis } from '../util/ChartUtils';

import {
  isNumber,
  getAnyElementOfObject,
  //findEntryInArray
} from '../util/DataUtils';

import { findChildByType } from '../util/ReactUtils';

import { crAxisCl } from '../CL';

import { renderActivePoints } from './renderActivePoints';
import {
  verticalCoordinatesGenerator,
  horizontalCoordinatesGenerator
} from './generateCategoricalChartFn';

const isFinit = Number.isFinite || isFinite;
const _getSafeValues = (
  obj
) => isObj(obj)
  ? Object.values(obj)
  : [];

const _getNumberValue = (
  value,
  dfValue
) => isNumber(value)
   ? value
   : dfValue;

const renderGrid = ({
  width,
  height,

  xAxisMap,
  yAxisMap,
  offset,

  element
}) => {
    const xAxis = getAnyElementOfObject(xAxisMap)
    , yAxisWithFiniteDomain = _getSafeValues(yAxisMap)
       .find(axis => axis.domain.every(isFinit))
    , yAxis = yAxisWithFiniteDomain || getAnyElementOfObject(yAxisMap)
    , _props = element.props || {};

    return cloneUiElement(element, {
      x: _getNumberValue(_props.x, offset.left),
      y: _getNumberValue(_props.y, offset.top),
      width: _getNumberValue(_props.width, offset.width),
      height: _getNumberValue(_props.height, offset.height),
      xAxis,
      yAxis,
      offset,
      chartWidth: width,
      chartHeight: height,
      verticalCoordinatesGenerator: _props.verticalCoordinatesGenerator || verticalCoordinatesGenerator,
      horizontalCoordinatesGenerator: _props.horizontalCoordinatesGenerator || horizontalCoordinatesGenerator
    }, element.key || 'grid');
};

const _axesTicksGenerator = (axis) => getTicksOfAxis(axis, true)
/**
 * Draw axis
 * @param {Object} axisOptions The options of axis
 * @param {Object} element      The axis element
 * @param {String} displayName  The display name of axis
 * @param {Number} index        The index of element
 * @return {ReactElement}       The instance of x-axes
 */
const _renderAxis = (
  axisOptions,
  element,
  displayName,
  index,
  width,
  height
) => {
  const {
    axisType,
    className
  } = axisOptions || {};
  return (
    <CartesianAxis
       {...axisOptions}
       key={element.key || `${displayName}-${index}`}
       className={crCn(crAxisCl(axisType), className)}
       viewBox={{ x: 0, y: 0, width, height }}
       ticksGenerator={_axesTicksGenerator}
    />
  );
}

const renderXAxis = ({
  width,
  height,
  xAxisMap,
  element,
  displayName,
  index
}) => {
  const axisObj = xAxisMap[element.props.xAxisId];
  return _renderAxis(
    axisObj,
    element,
    displayName,
    index,
    width,
    height
  );
};

const renderYAxis = ({
  width,
  height,
  yAxisMap,
  element,
  displayName,
  index
}) => {
  const axisObj = yAxisMap[element.props.yAxisId];
  return _renderAxis(
    axisObj,
    element,
    displayName,
    index,
    width,
    height
  );
};

/*
const _filterFormatItem = (
  item,
  displayName,
  childIndex,
  formattedGraphicalItems
) => {
  for (let i = 0, len = formattedGraphicalItems.length; i < len; i++) {
    const entry = formattedGraphicalItems[i];
    if (entry.item === item ||
      entry.props.key === item.key ||
      (displayName === getDisplayName(entry.item.type) && childIndex === entry.childIndex)) {
      return entry;
    }
  }
  return null;
};
*/

const renderGraphicChild = ({
  children,

  formattedGraphicalItems,
  isTooltipActive,
  tooltipAxis,
  activeTooltipIndex,
  activeLabel,

  element,
  displayName,
  index
}) => {
  const item = formattedGraphicalItems
    .find(item => item.childIndex === index)
  /*
  const item = _filterFormatItem(
    element,
    displayName,
    index,
    formattedGraphicalItems
  );
  */
  if (!item) {
    return null;
  }

  const tooltipItem = findChildByType(children, Tooltip)
  , {
    points
  } = item.props
  , {
    activeDot,
    hide
  } = item.item.props
  , hasActive = !hide
      && isTooltipActive
      && tooltipItem
      && activeDot
      && activeTooltipIndex >= 0
  , { key, ...itemProps } = item.props
  , graphicalItem = cloneUiElement(
      element, {...itemProps}, key
    )
  , activePoint = hasActive
     ? points[activeTooltipIndex]
     : void 0;

  return isNullOrUndef(activePoint)
    ? [graphicalItem, null]
    : [graphicalItem,
        ...renderActivePoints({
          item,
          activePoint,
          childIndex: activeTooltipIndex
      })
    ];
}

export const renderMap = {
  CartesianGrid: { handler: renderGrid, once: true },
  XAxis: { handler: renderXAxis },
  YAxis: { handler: renderYAxis },
  Bar: { handler: renderGraphicChild },
  Line: { handler: renderGraphicChild },
  Area: { handler: renderGraphicChild }
}
