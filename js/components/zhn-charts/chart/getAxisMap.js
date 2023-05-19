"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getAxisMap = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _range2 = _interopRequireDefault(require("lodash/range"));
var _ChartUtils = require("../util/ChartUtils");
var _ReactUtils = require("../util/ReactUtils");
var _DetectReferenceElementsDomain = require("../util/DetectReferenceElementsDomain");
var _chartFn = require("./chartFn");
var _getAxisMapByAxes = require("./getAxisMapByAxes");
var ORIENT_MAP = {
  xAxis: ['bottom', 'top'],
  yAxis: ['left', 'right']
};
var _getOrientMapValue = function _getOrientMapValue(propName, index) {
  var _axis = propName && ORIENT_MAP[propName];
  return _axis && index - index === 0 ? _axis[index] || null : null;
};
var _isNotEmpty = function _isNotEmpty(arr) {
  return arr && arr.length;
};

/**
 * Get the configuration of axis by the options of item,
 * this kind of axis does not display in chart
 * @param  {Object} props         Latest props
 * @param  {Array} graphicalItems The instances of item
 * @param  {ReactElement} Axis    Axis Component
 * @param  {String} axisType      The type of axis, xAxis - x-axis, yAxis - y-axis
 * @param  {String} axisIdKey     The unique id of an axis
 * @param  {Object} stackGroups   The items grouped by axisId and stackId
 * @param {Number} dataStartIndex The start index of the data series when a brush is applied
 * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
 * @return {Object}               Configuration
 */
var getAxisMapByItems = function getAxisMapByItems(props, _ref) {
  var graphicalItems = _ref.graphicalItems,
    Axis = _ref.Axis,
    axisType = _ref.axisType,
    axisIdKey = _ref.axisIdKey,
    stackGroups = _ref.stackGroups,
    dataStartIndex = _ref.dataStartIndex,
    dataEndIndex = _ref.dataEndIndex;
  var layout = props.layout,
    children = props.children,
    displayedData = (0, _chartFn.getDisplayedData)(props.data, {
      graphicalItems: graphicalItems,
      dataStartIndex: dataStartIndex,
      dataEndIndex: dataEndIndex
    }),
    len = displayedData.length,
    isCategorical = (0, _ChartUtils.isCategoricalAxis)(layout, axisType);
  var index = -1;
  // The default type of x-axis is category axis,
  // The default contents of x-axis is the serial numbers of data
  // The default type of y-axis is number axis
  // The default contents of y-axis is the domain of data
  var axisMap = graphicalItems.reduce(function (result, child) {
    var axisId = child.props[axisIdKey],
      originalDomain = (0, _chartFn.getDefaultDomainByAxisType)('number');
    if (!result[axisId]) {
      var _extends2;
      index++;
      var domain;
      if (isCategorical) {
        domain = (0, _range2["default"])(0, len);
      } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack) {
        domain = (0, _ChartUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
        domain = (0, _DetectReferenceElementsDomain.detectReferenceElementsDomain)(children, domain, axisId, axisType);
      } else {
        domain = (0, _ChartUtils.parseSpecifiedDomain)(originalDomain, (0, _ChartUtils.getDomainOfItemsWithSameAxis)(displayedData, graphicalItems.filter(function (item) {
          return item.props[axisIdKey] === axisId && !item.props.hide;
        }), 'number', layout), Axis.defaultProps.allowDataOverflow);
        domain = (0, _DetectReferenceElementsDomain.detectReferenceElementsDomain)(children, domain, axisId, axisType);
      }
      return (0, _extends3["default"])({}, result, (_extends2 = {}, _extends2[axisId] = (0, _extends3["default"])({
        axisType: axisType
      }, Axis.defaultProps, {
        hide: true,
        orientation: _getOrientMapValue("" + axisType, "" + index % 2),
        domain: domain,
        originalDomain: originalDomain,
        isCategorical: isCategorical,
        layout: layout
        // specify scale when no Axis
        // scale: isCategorical ? 'band' : 'linear',
      }), _extends2));
    }
    return result;
  }, {});
  return axisMap;
};

/**
 * Get the configuration of all x-axis or y-axis
 * @param  {Object} props          Latest props
 * @param  {String} axisType       The type of axis
 * @param  {Array}  graphicalItems The instances of item
 * @param  {Object} stackGroups    The items grouped by axisId and stackId
 * @param {Number} dataStartIndex  The start index of the data series when a brush is applied
 * @param {Number} dataEndIndex    The end index of the data series when a brush is applied
 * @return {Object}          Configuration
 */
var getAxisMap = function getAxisMap(props, _ref2) {
  var _ref2$axisType = _ref2.axisType,
    axisType = _ref2$axisType === void 0 ? 'xAxis' : _ref2$axisType,
    AxisComp = _ref2.AxisComp,
    graphicalItems = _ref2.graphicalItems,
    stackGroups = _ref2.stackGroups,
    dataStartIndex = _ref2.dataStartIndex,
    dataEndIndex = _ref2.dataEndIndex;
  var _axisOptions = {
      axisIdKey: axisType + "Id",
      graphicalItems: graphicalItems,
      axisType: axisType,
      stackGroups: stackGroups,
      dataStartIndex: dataStartIndex,
      dataEndIndex: dataEndIndex
    }
    // Get all the instance of Axis
    ,
    axes = (0, _ReactUtils.findAllByType)(props.children, AxisComp);
  return _isNotEmpty(axes) ? (0, _getAxisMapByAxes.getAxisMapByAxes)(props, (0, _extends3["default"])({}, _axisOptions, {
    axes: axes
  })) : _isNotEmpty(graphicalItems) ? getAxisMapByItems(props, (0, _extends3["default"])({}, _axisOptions, {
    Axis: AxisComp
  })) : {};
};
exports.getAxisMap = getAxisMap;
//# sourceMappingURL=getAxisMap.js.map