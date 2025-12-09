"use strict";

exports.__esModule = true;
exports.getAxisMapByAxes = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _DetectReferenceElementsDomain = require("../util/DetectReferenceElementsDomain");
var _chartFn = require("./chartFn");
const _fIsValueEqual = str => value => value === str;
const _isValueCategory = _fIsValueEqual('category');
const _isValueNumber = _fIsValueEqual('number');

/**
 * Get the configuration of axis by the options of axis instance
 * @param  {Object} props         Latest props
 * @param {Array}  axes           The instance of axes
 * @param  {Array} graphicalItems The instances of item
 * @param  {String} axisType      The type of axis, xAxis - x-axis, yAxis - y-axis
 * @param  {String} axisIdKey     The unique id of an axis
 * @param  {Object} stackGroups   The items grouped by axisId and stackId
 * @param {Number} dataStartIndex The start index of the data series when a brush is applied
 * @param {Number} dataEndIndex   The end index of the data series when a brush is applied
 * @return {Object}      Configuration
 */
const getAxisMapByAxes = (props, _ref) => {
  let {
    axes,
    graphicalItems,
    axisType,
    axisIdKey,
    stackGroups,
    dataStartIndex,
    dataEndIndex
  } = _ref;
  const {
      layout,
      children,
      stackOffset
    } = props,
    isCategorical = (0, _ChartUtils.isCategoricalAxis)(layout, axisType);
  // Eliminate duplicated axes
  const axisMap = axes.reduce((result, child) => {
    var _child$props$domain, _child$props$domain2;
    const {
        type,
        dataKey,
        allowDataOverflow,
        allowDuplicatedCategory,
        scale,
        ticks,
        includeHidden
      } = child.props,
      axisId = child.props[axisIdKey];
    if (result[axisId]) {
      return result;
    }
    const displayedData = (0, _chartFn.getDisplayedData)(props.data, {
      graphicalItems: graphicalItems.filter(item => item.props[axisIdKey] === axisId),
      dataStartIndex,
      dataEndIndex
    });
    const len = displayedData.length;
    let domain, duplicateDomain, categoricalDomain;

    // if the domain is defaulted we need this for `originalDomain` as well
    const defaultDomain = (0, _chartFn.getDefaultDomainByAxisType)(type),
      childDomain = (_child$props$domain = child.props.domain) != null ? _child$props$domain : defaultDomain;
    if (dataKey) {
      // has dataKey in <Axis />
      domain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, type);
      if (_isValueCategory(type) && isCategorical) {
        // the field type is category data and this axis is categorical axis
        const duplicate = (0, _DataUtils.hasDuplicate)(domain);
        if (allowDuplicatedCategory && duplicate) {
          duplicateDomain = domain;
          // When category axis has duplicated text, serial numbers are used to generate scale
          domain = (0, _FnUtils._range)(0, len);
        } else if (!allowDuplicatedCategory) {
          // remove duplicated category
          domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(childDomain, domain, child).reduce((finalDomain, entry) => finalDomain.indexOf(entry) >= 0 ? finalDomain : [...finalDomain, entry], []);
        }
      } else if (_isValueCategory(type)) {
        // the field type is category data and this axis is numerical axis
        if (!allowDuplicatedCategory) {
          domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(childDomain, domain, child).reduce((finalDomain, entry) => finalDomain.indexOf(entry) >= 0 || entry === '' || (0, _isTypeFn.isNullOrUndef)(entry) ? finalDomain : [...finalDomain, entry], []);
        } else {
          // eliminate undefined or null or empty string
          domain = domain.filter(entry => entry !== '' && !(0, _isTypeFn.isNullOrUndef)(entry));
        }
      }
      if (isCategorical && (_isValueNumber(type) || scale !== 'auto')) {
        categoricalDomain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, 'category');
      }
    } else if (isCategorical) {
      // the axis is a categorical axis
      domain = (0, _FnUtils._range)(0, len);
    } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && _isValueNumber(type)) {
      // when stackOffset is 'expand', the domain may be calculated as [0, 1.000000000002]
      domain = stackOffset === 'expand' ? [0, 1] : (0, _ChartUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
    } else {
      domain = (0, _ChartUtils.getDomainOfItemsWithSameAxis)(displayedData, graphicalItems.filter(item => item.props[axisIdKey] === axisId && (includeHidden || !item.props.hide)), type, layout, true);
    }
    if (_isValueNumber(type)) {
      // To detect wether there is any reference lines whose props alwaysShow is true
      domain = (0, _DetectReferenceElementsDomain.detectReferenceElementsDomain)(children, domain, axisId, axisType, ticks);
      if (childDomain) {
        domain = (0, _ChartUtils.parseSpecifiedDomain)(childDomain, domain, allowDataOverflow);
      }
    } else if (_isValueCategory(type) && childDomain) {
      const axisDomain = childDomain,
        isDomainValid = domain.every(entry => axisDomain.indexOf(entry) >= 0);
      if (isDomainValid) {
        domain = axisDomain;
      }
    }
    return Object.assign({}, result, {
      [axisId]: Object.assign({}, child.props, {
        isCategorical,
        axisType,
        domain,
        categoricalDomain,
        duplicateDomain,
        layout,
        originalDomain: (_child$props$domain2 = child.props.domain) != null ? _child$props$domain2 : defaultDomain
      })
    });
  }, {});
  return axisMap;
};
exports.getAxisMapByAxes = getAxisMapByAxes;
//# sourceMappingURL=getAxisMapByAxes.js.map