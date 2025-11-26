"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderMap = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _styleFn = require("../../styleFn");
var _CartesianAxis = require("../cartesian/CartesianAxis");
var _ChartUtils = require("../util/ChartUtils");
var _DataUtils = require("../util/DataUtils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["key"];
const isFinit = Number.isFinite || isFinite;
const _getSafeValues = obj => (0, _isTypeFn.isObj)(obj) ? Object.values(obj) : [];
const renderGrid = _ref => {
  let {
    element,
    offset,
    width,
    height,
    xAxisMap,
    yAxisMap
  } = _ref;
  return (0, _uiApi.cloneUiElement)(element, {
    offset,
    chartWidth: width,
    chartHeight: height,
    xAxis: (0, _DataUtils.getAnyElementOfObject)(xAxisMap),
    yAxis: _getSafeValues(yAxisMap).find(axis => axis.domain.every(isFinit)) || (0, _DataUtils.getAnyElementOfObject)(yAxisMap)
  }, element.key || 'grid');
};
const _axesTicksGenerator = axis => (0, _ChartUtils.getTicksOfAxis)(axis, true);
const _crCartesianAxisKey = (element, displayName, index) => element.key || displayName + "-" + index;
/**
 * Draw axis
 * @param {Object} axisOptions The options of axis
 * @return {ReactElement}       The instance of x-axes
 */
const _renderAxis = (axisOptions, width, height, key) => {
  const {
    axisType,
    className
  } = axisOptions || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CartesianAxis.CartesianAxis, Object.assign({}, axisOptions, {
    className: (0, _styleFn.crCn)((0, _CL.crAxisCl)(axisType), className),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    },
    ticksGenerator: _axesTicksGenerator
  }), key);
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
  return _renderAxis(xAxisMap[element.props.xAxisId], width, height, _crCartesianAxisKey(element, displayName, index));
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
  return _renderAxis(yAxisMap[element.props.yAxisId], width, height, _crCartesianAxisKey(element, displayName, index));
};
const renderGraphicChild = _ref4 => {
  let {
    formattedGraphicalItems,
    index
  } = _ref4;
  const item = formattedGraphicalItems.find(item => item.childIndex === index);
  if (!item) {
    return null;
  }
  const _item$props = item.props,
    {
      key
    } = _item$props,
    itemProps = (0, _objectWithoutPropertiesLoose2.default)(_item$props, _excluded);
  return (0, _uiApi.cloneUiElement)(item.item, Object.assign({}, itemProps), key);
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