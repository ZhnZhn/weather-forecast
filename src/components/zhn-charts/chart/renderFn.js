import {
  isValidElement,
  cloneUiElement,
  createElement
} from '../../uiApi';

import { Tooltip } from '../component/Tooltip';
import { Curve } from '../shape/Curve';

import {
  _isNil,
  _isFn
} from '../util/FnUtils';

import {
  combineEventHandlers
} from '../util/ChartUtils';

import {
  isNumber,
  getAnyElementOfObject,
  findEntryInArray
} from '../util/DataUtils';

import {
  getDisplayName,
  findChildByType,
  filterProps
} from '../util/ReactUtils';

import { renderActivePoints } from './renderActivePoints';

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
  chartInst,
  element
}) => {
    const {
      props,
      state
    } = chartInst
    , {
      width,
      height
    } = props
    , {
      xAxisMap,
      yAxisMap,
      offset
    } = state
    , xAxis = getAnyElementOfObject(xAxisMap);

    //const yAxisWithFiniteDomain = _find(yAxisMap, axis => _every(axis.domain, isFinit));
    //const yAxisWithFiniteDomain = _find(yAxisMap, axis => axis.domain.every(isFinit))
    const yAxisWithFiniteDomain = _crArrFromObjByKeys(yAxisMap)
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
      verticalCoordinatesGenerator: _props.verticalCoordinatesGenerator || chartInst.verticalCoordinatesGenerator,
      horizontalCoordinatesGenerator: _props.horizontalCoordinatesGenerator || chartInst.horizontalCoordinatesGenerator,
    }, element.key || 'grid');
};

const renderReferenceElement = ({
  chartInst,
  element,
  displayName,
  index
}) => {
  if (!element) {
    return null;
  }

  const {
    clipPathId,
    state
  } = chartInst
  , {
    xAxisMap,
    yAxisMap,
    offset
  } = state
  , {
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

const renderXAxis = ({
  chartInst,
  element,
  displayName,
  index
}) => {
  const {
    state
  } = chartInst
  , { xAxisMap } = state
  , axisObj = xAxisMap[element.props.xAxisId];
  return chartInst.renderAxis(
     axisObj,
     element,
     displayName,
     index
   );
};

const renderYAxis = ({
  chartInst,
  element,
  displayName,
  index
}) => {
  const { state } = chartInst
  , { yAxisMap } = state
  , axisObj = yAxisMap[element.props.yAxisId];
  return chartInst.renderAxis(
     axisObj,
     element,
     displayName,
     index
   );
};

const renderBrush = ({
  chartInst,
  element
}) => {
  const {
    props,
    state
  } = chartInst
  , {
    margin,
    data
  } = props
  , {
    offset,
    dataStartIndex,
    dataEndIndex,
    updateId
  } = state
  , {
    props: elementProps
  } = element || {};
  // TODO: update brush when children update
  return cloneUiElement(element, {
    onChange: combineEventHandlers(chartInst.handleBrushChange, null, element.props.onChange),
    data,
    x: _getNumberValue(elementProps.x, offset.left),
    y: _getNumberValue(
      elementProps.y,
      offset.top + offset.height + offset.brushBottom - (margin.bottom || 0)
    ),
    width: _getNumberValue(elementProps.width, offset.width),
    startIndex: dataStartIndex,
    endIndex: dataEndIndex,
    updateId: `brush-${updateId}`
  }, element.key || '_recharts-brush');
}

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
  chartInst,
  element,
  displayName,
  index
}) => {
  const {
    props,
    state
  } = chartInst
  , item = _filterFormatItem(
    element,
    displayName,
    index,
    state.formattedGraphicalItems
  );
  if (!item) {
    return null;
  }

  const tooltipEventType = chartInst.getTooltipEventType()
  , {
    isTooltipActive,
    tooltipAxis,
    activeTooltipIndex,
    activeLabel
  } = state
  , { children } = props
  , tooltipItem = findChildByType(children, Tooltip)
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
  , itemEvents = tooltipEventType !== 'axis' && tooltipItem && tooltipItem.props.trigger === 'click'
      ? {
          onClick: combineEventHandlers(chartInst.handleItemMouseEnter, null, element.props.onCLick)
        }
      : tooltipEventType !== 'axis'
          ? {
              onMouseLeave: combineEventHandlers(chartInst.handleItemMouseLeave, null, element.props.onMouseLeave),
              onMouseEnter: combineEventHandlers(chartInst.handleItemMouseEnter, null, element.props.onMouseEnter),
            }
          : {}
  , graphicalItem = cloneUiElement(
      element, {
      ...item.props,
      ...itemEvents
    });

  function findWithPayload(entry) {
    return _isFn(tooltipAxis.dataKey)
      ? tooltipAxis.dataKey(entry.payload)
      : null;
  }

  if (hasActive) {
    let activePoint, basePoint;
    if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
      // number transform to string
      const specifiedKey = _isFn(tooltipAxis.dataKey)
        ? findWithPayload
        : 'payload.'.concat(tooltipAxis.dataKey.toString());
      activePoint = findEntryInArray(points, specifiedKey, activeLabel);
      basePoint = isRange && baseLine && findEntryInArray(baseLine, specifiedKey, activeLabel);
    } else {
      activePoint = points[activeTooltipIndex];
      basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
    }

    if (!_isNil(activePoint)) {
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

//[restProps, cursorComp]
const _crCursorComp = (
  chartInst
) => [
  { points: chartInst.getCursorPoints() },
  Curve
];


const renderCursor = ({
  chartInst,
  element
}) => {
  const {
    props,
    state,
    _chartName
  } = chartInst
  , {
    isTooltipActive,
    activeCoordinate,
    activePayload,
    offset,
    activeTooltipIndex
  } = state
  , tooltipEventType = chartInst.getTooltipEventType()
  , _elementPropsCursor = ((element || {})
      .props || {})
      .cursor;

  if (!_elementPropsCursor
    || !isTooltipActive
    || !activeCoordinate
    || (_chartName !== 'ScatterChart' && tooltipEventType !== 'axis')) {
    return null;
  }

  const { layout } = props
  , [
    restProps,
    cursorComp
  ] = _crCursorComp(
    chartInst,
    _chartName,
    activeCoordinate,
    layout
  )
  , key = element.key || '_recharts-cursor'
  , cursorProps = {
      stroke: '#ccc',
      pointerEvents: 'none',
      ...offset,
      ...restProps,
      ...filterProps(_elementPropsCursor),
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
  Brush: { handler: renderBrush, once: true },
  Bar: { handler: renderGraphicChild },
  Line: { handler: renderGraphicChild },
  Area: { handler: renderGraphicChild },
  Tooltip: { handler: renderCursor, once: true }
}
