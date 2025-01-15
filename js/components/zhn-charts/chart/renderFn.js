"use strict";

exports.__esModule = true;
exports.renderMap = void 0;
var _uiApi = require("../../uiApi");
var _Tooltip = require("../component/Tooltip");
var _Curve = require("../shape/Curve");
var _FnUtils = require("../util/FnUtils");
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _renderActivePoints = require("./renderActivePoints");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
const CL_TOOLTIP_CURSOR = "recharts-tooltip-cursor";
const isFinit = Number.isFinite || isFinite;
const _getObjectKeys = Object.keys;
const _crArrFromObjByKeys = obj => obj && typeof obj === 'object' ? _getObjectKeys(obj).reduce((arr, key) => {
  arr.push(obj[key]);
  return arr;
}, []) : [];
const _getNumberValue = (value, dfValue) => (0, _DataUtils.isNumber)(value) ? value : dfValue;
const renderGrid = _ref => {
  let {
    chartInst,
    element
  } = _ref;
  const {
      props,
      state
    } = chartInst,
    {
      width,
      height
    } = props,
    {
      xAxisMap,
      yAxisMap,
      offset
    } = state,
    xAxis = (0, _DataUtils.getAnyElementOfObject)(xAxisMap);

  //const yAxisWithFiniteDomain = _find(yAxisMap, axis => _every(axis.domain, isFinit));
  //const yAxisWithFiniteDomain = _find(yAxisMap, axis => axis.domain.every(isFinit))
  const yAxisWithFiniteDomain = _crArrFromObjByKeys(yAxisMap).find(axis => axis.domain.every(isFinit)),
    yAxis = yAxisWithFiniteDomain || (0, _DataUtils.getAnyElementOfObject)(yAxisMap),
    _props = element.props || {};
  return (0, _uiApi.cloneUiElement)(element, {
    x: _getNumberValue(_props.x, offset.left),
    y: _getNumberValue(_props.y, offset.top),
    width: _getNumberValue(_props.width, offset.width),
    height: _getNumberValue(_props.height, offset.height),
    xAxis,
    yAxis,
    offset,
    chartWidth: width,
    chartHeight: height,
    verticalCoordinatesGenerator: _props.verticalCoordinatesGenerator || _generateCategoricalChartFn.verticalCoordinatesGenerator,
    horizontalCoordinatesGenerator: _props.horizontalCoordinatesGenerator || _generateCategoricalChartFn.horizontalCoordinatesGenerator
  }, element.key || 'grid');
};
const renderReferenceElement = _ref2 => {
  let {
    chartInst,
    element,
    displayName,
    index
  } = _ref2;
  if (!element) {
    return null;
  }
  const {
      clipPathId,
      state
    } = chartInst,
    {
      xAxisMap,
      yAxisMap,
      offset
    } = state,
    {
      xAxisId,
      yAxisId
    } = element.props;
  return (0, _uiApi.cloneUiElement)(element, {
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
};
const renderXAxis = _ref3 => {
  let {
    chartInst,
    element,
    displayName,
    index
  } = _ref3;
  const {
      state
    } = chartInst,
    {
      xAxisMap
    } = state,
    axisObj = xAxisMap[element.props.xAxisId];
  return chartInst.renderAxis(axisObj, element, displayName, index);
};
const renderYAxis = _ref4 => {
  let {
    chartInst,
    element,
    displayName,
    index
  } = _ref4;
  const {
      state
    } = chartInst,
    {
      yAxisMap
    } = state,
    axisObj = yAxisMap[element.props.yAxisId];
  return chartInst.renderAxis(axisObj, element, displayName, index);
};
const renderBrush = _ref5 => {
  let {
    chartInst,
    element
  } = _ref5;
  const {
      props,
      state
    } = chartInst,
    {
      margin,
      data
    } = props,
    {
      offset,
      dataStartIndex,
      dataEndIndex,
      updateId
    } = state,
    {
      props: elementProps
    } = element || {};
  // TODO: update brush when children update
  return (0, _uiApi.cloneUiElement)(element, {
    onChange: (0, _ChartUtils.combineEventHandlers)(chartInst.handleBrushChange, null, element.props.onChange),
    data,
    x: _getNumberValue(elementProps.x, offset.left),
    y: _getNumberValue(elementProps.y, offset.top + offset.height + offset.brushBottom - (margin.bottom || 0)),
    width: _getNumberValue(elementProps.width, offset.width),
    startIndex: dataStartIndex,
    endIndex: dataEndIndex,
    updateId: `brush-${updateId}`
  }, element.key || '_recharts-brush');
};
const _filterFormatItem = (item, displayName, childIndex, formattedGraphicalItems) => {
  for (let i = 0, len = formattedGraphicalItems.length; i < len; i++) {
    const entry = formattedGraphicalItems[i];
    if (entry.item === item || entry.props.key === item.key || displayName === (0, _ReactUtils.getDisplayName)(entry.item.type) && childIndex === entry.childIndex) {
      return entry;
    }
  }
  return null;
};
const renderGraphicChild = _ref6 => {
  let {
    chartInst,
    element,
    displayName,
    index
  } = _ref6;
  const {
      props,
      state
    } = chartInst,
    item = _filterFormatItem(element, displayName, index, state.formattedGraphicalItems);
  if (!item) {
    return null;
  }
  const tooltipEventType = chartInst.getTooltipEventType(),
    {
      isTooltipActive,
      tooltipAxis,
      activeTooltipIndex,
      activeLabel
    } = state,
    {
      children
    } = props,
    tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip),
    {
      points,
      isRange,
      baseLine
    } = item.props,
    {
      activeDot,
      hide
    } = item.item.props,
    hasActive = !hide && isTooltipActive && tooltipItem && activeDot && activeTooltipIndex >= 0,
    itemEvents = tooltipEventType !== 'axis' && tooltipItem && tooltipItem.props.trigger === 'click' ? {
      onClick: (0, _ChartUtils.combineEventHandlers)(chartInst.handleItemMouseEnter, null, element.props.onCLick)
    } : tooltipEventType !== 'axis' ? {
      onMouseLeave: (0, _ChartUtils.combineEventHandlers)(chartInst.handleItemMouseLeave, null, element.props.onMouseLeave),
      onMouseEnter: (0, _ChartUtils.combineEventHandlers)(chartInst.handleItemMouseEnter, null, element.props.onMouseEnter)
    } : {},
    {
      key,
      ...itemProps
    } = item.props,
    graphicalItem = (0, _uiApi.cloneUiElement)(element, {
      ...itemProps,
      ...itemEvents
    }, key);
  function findWithPayload(entry) {
    return (0, _FnUtils._isFn)(tooltipAxis.dataKey) ? tooltipAxis.dataKey(entry.payload) : null;
  }
  if (hasActive) {
    let activePoint, basePoint;
    if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
      // number transform to string
      const specifiedKey = (0, _FnUtils._isFn)(tooltipAxis.dataKey) ? findWithPayload : 'payload.'.concat(tooltipAxis.dataKey.toString());
      activePoint = (0, _DataUtils.findEntryInArray)(points, specifiedKey, activeLabel);
      basePoint = isRange && baseLine && (0, _DataUtils.findEntryInArray)(baseLine, specifiedKey, activeLabel);
    } else {
      activePoint = points[activeTooltipIndex];
      basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
    }
    if (!(0, _FnUtils._isNil)(activePoint)) {
      return [graphicalItem, ...(0, _renderActivePoints.renderActivePoints)({
        isRange,
        item,
        activePoint,
        basePoint,
        childIndex: activeTooltipIndex
      })];
    }
  }
  return isRange ? [graphicalItem, null, null] : [graphicalItem, null];
};
const _getCursorPoints = (props, state) => {
  const {
      layout
    } = props,
    {
      activeCoordinate,
      offset
    } = state;
  let x1, y1, x2, y2;
  if ((0, _ChartUtils.isLayoutHorizontal)(layout)) {
    x1 = activeCoordinate.x;
    x2 = x1;
    y1 = offset.top;
    y2 = offset.top + offset.height;
  } else if ((0, _ChartUtils.isLayoutVertical)(layout)) {
    y1 = activeCoordinate.y;
    y2 = y1;
    x1 = offset.left;
    x2 = offset.left + offset.width;
  }
  return [{
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  }];
};
const renderCursor = _ref7 => {
  let {
    chartInst,
    element
  } = _ref7;
  const {
      props,
      state,
      _chartName
    } = chartInst,
    {
      isTooltipActive,
      activeCoordinate,
      activePayload,
      offset,
      activeTooltipIndex
    } = state,
    tooltipEventType = chartInst.getTooltipEventType(),
    _elementPropsCursor = ((element || {}).props || {}).cursor;
  if (!_elementPropsCursor || !isTooltipActive || !activeCoordinate || _chartName !== 'ScatterChart' && tooltipEventType !== 'axis') {
    return null;
  }
  const restProps = {
      points: _getCursorPoints(props, state)
    },
    cursorComp = _Curve.Curve,
    key = element.key || '_recharts-cursor',
    cursorProps = {
      stroke: '#ccc',
      pointerEvents: 'none',
      ...offset,
      ...restProps,
      ...(0, _ReactUtils.filterProps)(_elementPropsCursor),
      key,
      className: CL_TOOLTIP_CURSOR,
      payload: activePayload,
      payloadIndex: activeTooltipIndex
    };
  return (0, _uiApi.isValidElement)(_elementPropsCursor) ? (0, _uiApi.cloneUiElement)(_elementPropsCursor, cursorProps) : (0, _uiApi.createElement)(cursorComp, cursorProps);
};
const renderMap = exports.renderMap = {
  CartesianGrid: {
    handler: renderGrid,
    once: true
  },
  ReferenceArea: {
    handler: renderReferenceElement
  },
  ReferenceLine: {
    handler: renderReferenceElement
  },
  ReferenceDot: {
    handler: renderReferenceElement
  },
  XAxis: {
    handler: renderXAxis
  },
  YAxis: {
    handler: renderYAxis
  },
  Brush: {
    handler: renderBrush,
    once: true
  },
  Bar: {
    handler: renderGraphicChild
  },
  Line: {
    handler: renderGraphicChild
  },
  Area: {
    handler: renderGraphicChild
  },
  Tooltip: {
    handler: renderCursor,
    once: true
  }
};
//# sourceMappingURL=renderFn.js.map