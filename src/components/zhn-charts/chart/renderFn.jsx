import {
  isNullOrUndef,
  isFn
} from '../../../utils/isTypeFn';

import {
  isValidElement,
  cloneUiElement,
  createElement
} from '../../uiApi';

import { crCn } from '../../styleFn';

import { CartesianAxis } from '../cartesian/CartesianAxis';
import { Tooltip } from '../component/Tooltip';
import { Curve } from '../shape/Curve';

import {
  isLayoutHorizontal,
  isLayoutVertical,
  getTicksOfAxis
} from '../util/ChartUtils';

import {
  isNumber,
  getAnyElementOfObject,
  findEntryInArray
} from '../util/DataUtils';

import {
  getDisplayName,
  findChildByType
} from '../util/ReactUtils';

import { crAxisCl } from '../CL';

import { renderActivePoints } from './renderActivePoints';
import {
  verticalCoordinatesGenerator,
  horizontalCoordinatesGenerator
} from './generateCategoricalChartFn';

const CL_TOOLTIP_CURSOR = "recharts-tooltip-cursor"

const isFinit = Number.isFinite || isFinite;
const _getObjectKeys = Object.keys;
const _crArrFromObjByKeys = (
  obj
) => obj && typeof obj === 'object'
   ? _getObjectKeys(obj)
       .reduce((arr, key) => {
          arr.push(obj[key])
          return arr
        }, [])
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
    , yAxisWithFiniteDomain = _crArrFromObjByKeys(yAxisMap)
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

const renderReferenceElement = ({
  clipPathId,

  xAxisMap,
  yAxisMap,
  offset,

  element,
  displayName,
  index
}) => {
  if (!element) {
    return null;
  }
  const {
    xAxisId,
    yAxisId
  } = element.props;
  return cloneUiElement(element, {
    xAxis: xAxisMap[xAxisId],
    yAxis: yAxisMap[yAxisId],
    viewBox: {
      x: offset.left,
      y: offset.top,
      width: offset.width,
      height: offset.height
    },
    clipPathId
  }, element.key || `${displayName}-${index}`);
}

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
  const item = _filterFormatItem(
    element,
    displayName,
    index,
    formattedGraphicalItems
  );
  if (!item) {
    return null;
  }

  const tooltipItem = findChildByType(children, Tooltip)
  , {
    points,
    isRange,
    baseLine
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
      element, {
      ...itemProps
    }, key);

  function findWithPayload(entry) {
    return isFn(tooltipAxis.dataKey)
      ? tooltipAxis.dataKey(entry.payload)
      : null;
  }

  if (hasActive) {
    let activePoint, basePoint;
    if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
      // number transform to string
      const specifiedKey = isFn(tooltipAxis.dataKey)
        ? findWithPayload
        : 'payload.'.concat(tooltipAxis.dataKey.toString());
      activePoint = findEntryInArray(points, specifiedKey, activeLabel);
      basePoint = isRange && baseLine && findEntryInArray(baseLine, specifiedKey, activeLabel);
    } else {
      activePoint = points[activeTooltipIndex];
      basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
    }

    if (!isNullOrUndef(activePoint)) {
      return [
        graphicalItem,
        ...renderActivePoints({
            isRange,
            item,
            activePoint,
            basePoint,
            childIndex: activeTooltipIndex
        })
      ];
    }
  }

  return isRange
    ? [graphicalItem, null, null]
    : [graphicalItem, null];
}

const _getCursorPoints = (
  layout,
  activeCoordinate,
  offset
) => {
  let x1, y1, x2, y2;
  if (isLayoutHorizontal(layout)) {
    x1 = activeCoordinate.x;
    x2 = x1;
    y1 = offset.top;
    y2 = offset.top + offset.height;
  } else if (isLayoutVertical(layout)) {
    y1 = activeCoordinate.y;
    y2 = y1;
    x1 = offset.left;
    x2 = offset.left + offset.width;
  }
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 }
  ];
};

const renderCursor = ({
  layout,

  isTooltipActive,
  activePayload,
  activeTooltipIndex,

  activeCoordinate,
  offset,
  element
}) => {
  const _elementPropsCursor = ((element || {})
   .props || {})
   .cursor;

  if (!_elementPropsCursor
    || !isTooltipActive
    || !activeCoordinate) {
    return null;
  }

  const restProps = {
    points: _getCursorPoints(
      layout,
      activeCoordinate,
      offset
    )
  }
  , cursorComp = Curve
  , key = element.key || '_recharts-cursor'
  , cursorProps = {
      stroke: '#ccc',
      pointerEvents: 'none',
      ...offset,
      ...restProps,
      key,
      className: CL_TOOLTIP_CURSOR,
      payload: activePayload,
      payloadIndex: activeTooltipIndex
  };

  return isValidElement(_elementPropsCursor)
    ? cloneUiElement(_elementPropsCursor, cursorProps)
    : createElement(cursorComp, cursorProps);
};

export const renderMap = {
  CartesianGrid: { handler: renderGrid, once: true },
  ReferenceArea: { handler: renderReferenceElement },
  ReferenceLine: { handler: renderReferenceElement },
  ReferenceDot: { handler: renderReferenceElement },
  XAxis: { handler: renderXAxis },
  YAxis: { handler: renderYAxis },
  Bar: { handler: renderGraphicChild },
  Line: { handler: renderGraphicChild },
  Area: { handler: renderGraphicChild },
  Tooltip: { handler: renderCursor, once: true }
}
