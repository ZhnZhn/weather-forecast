"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderMap = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _CartesianAxis = require("../cartesian/CartesianAxis");
var _Tooltip = require("../component/Tooltip");
var _Curve = require("../shape/Curve");
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _CL = require("../CL");
var _renderActivePoints = require("./renderActivePoints");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _react = require("react");
const _excluded = ["key"];
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
  }, element.key || displayName + "-" + index);
};
const _axesTicksGenerator = axis => (0, _ChartUtils.getTicksOfAxis)(axis, true);
/**
 * Draw axis
 * @param {Object} axisOptions The options of axis
 * @param {Object} element      The axis element
 * @param {String} displayName  The display name of axis
 * @param {Number} index        The index of element
 * @return {ReactElement}       The instance of x-axes
 */
const _renderAxis = (axisOptions, element, displayName, index, props) => {
  const {
      width,
      height
    } = props,
    {
      axisType,
      className
    } = axisOptions;
  return /*#__PURE__*/(0, _react.createElement)(_CartesianAxis.CartesianAxis, Object.assign({}, axisOptions, {
    key: element.key || displayName + "-" + index,
    className: (0, _styleFn.crCn)((0, _CL.crAxisCl)(axisType), className),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    },
    ticksGenerator: _axesTicksGenerator
  }));
};
const renderXAxis = _ref3 => {
  let {
    chartInst,
    element,
    displayName,
    index
  } = _ref3;
  const {
      xAxisMap
    } = chartInst.state,
    axisObj = xAxisMap[element.props.xAxisId];
  return _renderAxis(axisObj, element, displayName, index, chartInst.props);
};
const renderYAxis = _ref4 => {
  let {
    chartInst,
    element,
    displayName,
    index
  } = _ref4;
  const {
      yAxisMap
    } = chartInst.state,
    axisObj = yAxisMap[element.props.yAxisId];
  return _renderAxis(axisObj, element, displayName, index, chartInst.props);
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
const renderGraphicChild = _ref5 => {
  let {
    chartInst,
    element,
    displayName,
    index
  } = _ref5;
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
      onClick: element.props.onClick
    } : tooltipEventType !== 'axis' ? {
      onMouseLeave: element.props.onMouseLeave,
      onMouseEnter: element.props.onMouseEnter
    } : {},
    _item$props = item.props,
    {
      key
    } = _item$props,
    itemProps = (0, _objectWithoutPropertiesLoose2.default)(_item$props, _excluded),
    graphicalItem = (0, _uiApi.cloneUiElement)(element, Object.assign({}, itemProps, itemEvents), key);
  function findWithPayload(entry) {
    return (0, _isTypeFn.isFn)(tooltipAxis.dataKey) ? tooltipAxis.dataKey(entry.payload) : null;
  }
  if (hasActive) {
    let activePoint, basePoint;
    if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
      // number transform to string
      const specifiedKey = (0, _isTypeFn.isFn)(tooltipAxis.dataKey) ? findWithPayload : 'payload.'.concat(tooltipAxis.dataKey.toString());
      activePoint = (0, _DataUtils.findEntryInArray)(points, specifiedKey, activeLabel);
      basePoint = isRange && baseLine && (0, _DataUtils.findEntryInArray)(baseLine, specifiedKey, activeLabel);
    } else {
      activePoint = points[activeTooltipIndex];
      basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
    }
    if (!(0, _isTypeFn.isNullOrUndef)(activePoint)) {
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
const renderCursor = _ref6 => {
  let {
    chartInst,
    element
  } = _ref6;
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
    cursorProps = Object.assign({
      stroke: '#ccc',
      pointerEvents: 'none'
    }, offset, restProps, {
      key,
      className: CL_TOOLTIP_CURSOR,
      payload: activePayload,
      payloadIndex: activeTooltipIndex
    });
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