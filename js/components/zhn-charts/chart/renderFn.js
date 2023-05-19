"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderMap = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _Tooltip = require("../component/Tooltip");
var _Curve = require("../shape/Curve");
var _Cross = require("../shape/Cross");
var _Sector = require("../shape/Sector");
var _Rectangle = require("../shape/Rectangle");
var _FnUtils = require("../util/FnUtils");
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _renderActivePoints = require("./renderActivePoints");
var isFinit = Number.isFinite || isFinite;
var _getObjectKeys = Object.keys;
var _crArrFromObjByKeys = function _crArrFromObjByKeys(obj) {
  return obj && typeof obj === 'object' ? _getObjectKeys(obj).reduce(function (arr, key) {
    arr.push(obj[key]);
    return arr;
  }, []) : [];
};
var renderGrid = function renderGrid(_ref) {
  var chartInst = _ref.chartInst,
    element = _ref.element;
  var props = chartInst.props,
    state = chartInst.state,
    width = props.width,
    height = props.height,
    xAxisMap = state.xAxisMap,
    yAxisMap = state.yAxisMap,
    offset = state.offset,
    xAxis = (0, _DataUtils.getAnyElementOfObject)(xAxisMap);

  //const yAxisWithFiniteDomain = _find(yAxisMap, axis => _every(axis.domain, isFinit));
  //const yAxisWithFiniteDomain = _find(yAxisMap, axis => axis.domain.every(isFinit))
  var yAxisWithFiniteDomain = _crArrFromObjByKeys(yAxisMap).find(function (axis) {
      return axis.domain.every(isFinit);
    }),
    yAxis = yAxisWithFiniteDomain || (0, _DataUtils.getAnyElementOfObject)(yAxisMap),
    _props = element.props || {};
  return (0, _uiApi.cloneElement)(element, {
    key: element.key || 'grid',
    x: (0, _DataUtils.isNumber)(_props.x) ? _props.x : offset.left,
    y: (0, _DataUtils.isNumber)(_props.y) ? _props.y : offset.top,
    width: (0, _DataUtils.isNumber)(_props.width) ? _props.width : offset.width,
    height: (0, _DataUtils.isNumber)(_props.height) ? _props.height : offset.height,
    xAxis: xAxis,
    yAxis: yAxis,
    offset: offset,
    chartWidth: width,
    chartHeight: height,
    verticalCoordinatesGenerator: _props.verticalCoordinatesGenerator || chartInst.verticalCoordinatesGenerator,
    horizontalCoordinatesGenerator: _props.horizontalCoordinatesGenerator || chartInst.horizontalCoordinatesGenerator
  });
};
var renderReferenceElement = function renderReferenceElement(_ref2) {
  var chartInst = _ref2.chartInst,
    element = _ref2.element,
    displayName = _ref2.displayName,
    index = _ref2.index;
  if (!element) {
    return null;
  }
  var clipPathId = chartInst.clipPathId,
    state = chartInst.state,
    xAxisMap = state.xAxisMap,
    yAxisMap = state.yAxisMap,
    offset = state.offset,
    _element$props = element.props,
    xAxisId = _element$props.xAxisId,
    yAxisId = _element$props.yAxisId;
  return (0, _uiApi.cloneElement)(element, {
    key: element.key || displayName + "-" + index,
    xAxis: xAxisMap[xAxisId],
    yAxis: yAxisMap[yAxisId],
    viewBox: {
      x: offset.left,
      y: offset.top,
      width: offset.width,
      height: offset.height
    },
    clipPathId: clipPathId
  });
};
var renderXAxis = function renderXAxis(_ref3) {
  var chartInst = _ref3.chartInst,
    element = _ref3.element,
    displayName = _ref3.displayName,
    index = _ref3.index;
  var state = chartInst.state,
    xAxisMap = state.xAxisMap,
    axisObj = xAxisMap[element.props.xAxisId];
  return chartInst.renderAxis(axisObj, element, displayName, index);
};
var renderYAxis = function renderYAxis(_ref4) {
  var chartInst = _ref4.chartInst,
    element = _ref4.element,
    displayName = _ref4.displayName,
    index = _ref4.index;
  var state = chartInst.state,
    yAxisMap = state.yAxisMap,
    axisObj = yAxisMap[element.props.yAxisId];
  return chartInst.renderAxis(axisObj, element, displayName, index);
};
var renderBrush = function renderBrush(_ref5) {
  var chartInst = _ref5.chartInst,
    element = _ref5.element;
  var props = chartInst.props,
    state = chartInst.state,
    margin = props.margin,
    data = props.data,
    offset = state.offset,
    dataStartIndex = state.dataStartIndex,
    dataEndIndex = state.dataEndIndex,
    updateId = state.updateId;
  // TODO: update brush when children update
  return (0, _uiApi.cloneElement)(element, {
    key: element.key || '_recharts-brush',
    onChange: (0, _ChartUtils.combineEventHandlers)(chartInst.handleBrushChange, null, element.props.onChange),
    data: data,
    x: (0, _DataUtils.isNumber)(element.props.x) ? element.props.x : offset.left,
    y: (0, _DataUtils.isNumber)(element.props.y) ? element.props.y : offset.top + offset.height + offset.brushBottom - (margin.bottom || 0),
    width: (0, _DataUtils.isNumber)(element.props.width) ? element.props.width : offset.width,
    startIndex: dataStartIndex,
    endIndex: dataEndIndex,
    updateId: "brush-" + updateId
  });
};
var _filterFormatItem = function _filterFormatItem(item, displayName, childIndex, formattedGraphicalItems) {
  for (var i = 0, len = formattedGraphicalItems.length; i < len; i++) {
    var entry = formattedGraphicalItems[i];
    if (entry.item === item || entry.props.key === item.key || displayName === (0, _ReactUtils.getDisplayName)(entry.item.type) && childIndex === entry.childIndex) {
      return entry;
    }
  }
  return null;
};
var renderGraphicChild = function renderGraphicChild(_ref6) {
  var chartInst = _ref6.chartInst,
    element = _ref6.element,
    displayName = _ref6.displayName,
    index = _ref6.index;
  var props = chartInst.props,
    state = chartInst.state,
    item = _filterFormatItem(element, displayName, index, state.formattedGraphicalItems);
  if (!item) {
    return null;
  }
  var tooltipEventType = chartInst.getTooltipEventType(),
    isTooltipActive = state.isTooltipActive,
    tooltipAxis = state.tooltipAxis,
    activeTooltipIndex = state.activeTooltipIndex,
    activeLabel = state.activeLabel,
    children = props.children,
    tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip),
    _item$props = item.props,
    points = _item$props.points,
    isRange = _item$props.isRange,
    baseLine = _item$props.baseLine,
    _item$item$props = item.item.props,
    activeDot = _item$item$props.activeDot,
    hide = _item$item$props.hide,
    hasActive = !hide && isTooltipActive && tooltipItem && activeDot && activeTooltipIndex >= 0,
    itemEvents = tooltipEventType !== 'axis' && tooltipItem && tooltipItem.props.trigger === 'click' ? {
      onClick: (0, _ChartUtils.combineEventHandlers)(chartInst.handleItemMouseEnter, null, element.props.onCLick)
    } : tooltipEventType !== 'axis' ? {
      onMouseLeave: (0, _ChartUtils.combineEventHandlers)(chartInst.handleItemMouseLeave, null, element.props.onMouseLeave),
      onMouseEnter: (0, _ChartUtils.combineEventHandlers)(chartInst.handleItemMouseEnter, null, element.props.onMouseEnter)
    } : {},
    graphicalItem = (0, _uiApi.cloneElement)(element, (0, _extends2["default"])({}, item.props, itemEvents));
  function findWithPayload(entry) {
    return (0, _FnUtils._isFn)(tooltipAxis.dataKey) ? tooltipAxis.dataKey(entry.payload) : null;
  }
  if (hasActive) {
    var activePoint, basePoint;
    if (tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory) {
      // number transform to string
      var specifiedKey = (0, _FnUtils._isFn)(tooltipAxis.dataKey) ? findWithPayload : 'payload.'.concat(tooltipAxis.dataKey.toString());
      activePoint = (0, _DataUtils.findEntryInArray)(points, specifiedKey, activeLabel);
      basePoint = isRange && baseLine && (0, _DataUtils.findEntryInArray)(baseLine, specifiedKey, activeLabel);
    } else {
      activePoint = points[activeTooltipIndex];
      basePoint = isRange && baseLine && baseLine[activeTooltipIndex];
    }
    if (!(0, _FnUtils._isNil)(activePoint)) {
      return [graphicalItem].concat((0, _renderActivePoints.renderActivePoints)({
        isRange: isRange,
        item: item,
        activePoint: activePoint,
        basePoint: basePoint,
        childIndex: activeTooltipIndex
      }));
    }
  }
  return isRange ? [graphicalItem, null, null] : [graphicalItem, null];
};
var renderCursor = function renderCursor(_ref7) {
  var chartInst = _ref7.chartInst,
    element = _ref7.element;
  var props = chartInst.props,
    state = chartInst.state,
    _chartName = chartInst._chartName,
    isTooltipActive = state.isTooltipActive,
    activeCoordinate = state.activeCoordinate,
    activePayload = state.activePayload,
    offset = state.offset,
    activeTooltipIndex = state.activeTooltipIndex,
    tooltipEventType = chartInst.getTooltipEventType();
  if (!element || !element.props.cursor || !isTooltipActive || !activeCoordinate || _chartName !== 'ScatterChart' && tooltipEventType !== 'axis') {
    return null;
  }
  var layout = props.layout;
  var restProps,
    cursorComp = _Curve.Curve;
  if (_chartName === 'ScatterChart') {
    restProps = activeCoordinate;
    cursorComp = _Cross.Cross;
  } else if (_chartName === 'BarChart') {
    restProps = chartInst.getCursorRectangle();
    cursorComp = _Rectangle.Rectangle;
  } else if (layout === 'radial') {
    var _chartInst$getCursorP = chartInst.getCursorPoints(),
      cx = _chartInst$getCursorP.cx,
      cy = _chartInst$getCursorP.cy,
      radius = _chartInst$getCursorP.radius,
      startAngle = _chartInst$getCursorP.startAngle,
      endAngle = _chartInst$getCursorP.endAngle;
    restProps = {
      cx: cx,
      cy: cy,
      startAngle: startAngle,
      endAngle: endAngle,
      innerRadius: radius,
      outerRadius: radius
    };
    cursorComp = _Sector.Sector;
  } else {
    restProps = {
      points: chartInst.getCursorPoints()
    };
    cursorComp = _Curve.Curve;
  }
  var key = element.key || '_recharts-cursor',
    cursorProps = (0, _extends2["default"])({
      stroke: '#ccc',
      pointerEvents: 'none'
    }, offset, restProps, (0, _ReactUtils.filterProps)(element.props.cursor), {
      key: key,
      className: 'recharts-tooltip-cursor',
      payload: activePayload,
      payloadIndex: activeTooltipIndex
    });
  return (0, _uiApi.isValidElement)(element.props.cursor) ? (0, _uiApi.cloneElement)(element.props.cursor, cursorProps) : (0, _uiApi.createElement)(cursorComp, cursorProps);
};
var renderMap = {
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
exports.renderMap = renderMap;
//# sourceMappingURL=renderFn.js.map