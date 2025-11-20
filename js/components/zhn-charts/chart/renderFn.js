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
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _ReactUtils = require("../util/ReactUtils");
var _CL = require("../CL");
var _renderActivePoints = require("./renderActivePoints");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _react = require("react");
const _excluded = ["key"];
const isFinit = Number.isFinite || isFinite;
const _getSafeValues = obj => (0, _isTypeFn.isObj)(obj) ? Object.values(obj) : [];
const _getNumberValue = (value, dfValue) => (0, _DataUtils.isNumber)(value) ? value : dfValue;
const renderGrid = _ref => {
  let {
    width,
    height,
    xAxisMap,
    yAxisMap,
    offset,
    element
  } = _ref;
  const xAxis = (0, _DataUtils.getAnyElementOfObject)(xAxisMap),
    yAxisWithFiniteDomain = _getSafeValues(yAxisMap).find(axis => axis.domain.every(isFinit)),
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
const _axesTicksGenerator = axis => (0, _ChartUtils.getTicksOfAxis)(axis, true);
/**
 * Draw axis
 * @param {Object} axisOptions The options of axis
 * @param {Object} element      The axis element
 * @param {String} displayName  The display name of axis
 * @param {Number} index        The index of element
 * @return {ReactElement}       The instance of x-axes
 */
const _renderAxis = (axisOptions, element, displayName, index, width, height) => {
  const {
    axisType,
    className
  } = axisOptions || {};
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
const renderXAxis = _ref2 => {
  let {
    width,
    height,
    xAxisMap,
    element,
    displayName,
    index
  } = _ref2;
  const axisObj = xAxisMap[element.props.xAxisId];
  return _renderAxis(axisObj, element, displayName, index, width, height);
};
const renderYAxis = _ref3 => {
  let {
    width,
    height,
    yAxisMap,
    element,
    displayName,
    index
  } = _ref3;
  const axisObj = yAxisMap[element.props.yAxisId];
  return _renderAxis(axisObj, element, displayName, index, width, height);
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

const renderGraphicChild = _ref4 => {
  let {
    children,
    formattedGraphicalItems,
    isTooltipActive,
    tooltipAxis,
    activeTooltipIndex,
    activeLabel,
    element,
    displayName,
    index
  } = _ref4;
  const item = formattedGraphicalItems.find(item => item.childIndex === index);
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
  const tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip),
    {
      points
    } = item.props,
    {
      activeDot,
      hide
    } = item.item.props,
    hasActive = !hide && isTooltipActive && tooltipItem && activeDot && activeTooltipIndex >= 0,
    _item$props = item.props,
    {
      key
    } = _item$props,
    itemProps = (0, _objectWithoutPropertiesLoose2.default)(_item$props, _excluded),
    graphicalItem = (0, _uiApi.cloneUiElement)(element, Object.assign({}, itemProps), key),
    activePoint = hasActive ? points[activeTooltipIndex] : void 0;
  return (0, _isTypeFn.isNullOrUndef)(activePoint) ? [graphicalItem, null] : [graphicalItem, ...(0, _renderActivePoints.renderActivePoints)({
    item,
    activePoint,
    childIndex: activeTooltipIndex
  })];
};
const renderMap = exports.renderMap = {
  CartesianGrid: {
    handler: renderGrid,
    once: true
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
  }
};
//# sourceMappingURL=renderFn.js.map