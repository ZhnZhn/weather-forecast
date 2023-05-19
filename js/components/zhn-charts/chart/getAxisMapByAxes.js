"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getAxisMapByAxes = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _FnUtils = require("../util/FnUtils");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _DetectReferenceElementsDomain = require("../util/DetectReferenceElementsDomain");
var _chartFn = require("./chartFn");
var _isValueCategory = function _isValueCategory(value) {
  return value === 'category';
};
var _isValueNumber = function _isValueNumber(value) {
  return value === 'number';
};

/**
 * Takes a domain and user props to determine whether he provided the domain via props or if we need to calculate it.
 * @param   {AxisDomain}  domain              The potential domain from props
 * @param   {Boolean}     allowDataOverflow   from props
 * @param   {String}      axisType            from props
 * @returns {Boolean}                         `true` if domain is specified by user
 */
var isDomainSpecifiedByUser = function isDomainSpecifiedByUser(domain, allowDataOverflow, axisType) {
  if (_isValueNumber(axisType) && allowDataOverflow === true && (0, _FnUtils._isArr)(domain)) {
    var domainStart = domain == null ? void 0 : domain[0],
      domainEnd = domain == null ? void 0 : domain[1];
    /*
     * The `isNumber` check is needed because the user could also provide strings like "dataMin" via the domain props.
     * In such case, we have to compute the domain from the data.
     */
    if (!!domainStart && !!domainEnd && (0, _DataUtils.isNumber)(domainStart) && (0, _DataUtils.isNumber)(domainEnd)) {
      return true;
    }
  }
  return false;
};

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
var getAxisMapByAxes = function getAxisMapByAxes(props, _ref) {
  var axes = _ref.axes,
    graphicalItems = _ref.graphicalItems,
    axisType = _ref.axisType,
    axisIdKey = _ref.axisIdKey,
    stackGroups = _ref.stackGroups,
    dataStartIndex = _ref.dataStartIndex,
    dataEndIndex = _ref.dataEndIndex;
  var layout = props.layout,
    children = props.children,
    stackOffset = props.stackOffset,
    isCategorical = (0, _ChartUtils.isCategoricalAxis)(layout, axisType);
  // Eliminate duplicated axes
  var axisMap = axes.reduce(function (result, child) {
    var _child$props$domain2, _extends2;
    var _child$props = child.props,
      type = _child$props.type,
      dataKey = _child$props.dataKey,
      allowDataOverflow = _child$props.allowDataOverflow,
      allowDuplicatedCategory = _child$props.allowDuplicatedCategory,
      scale = _child$props.scale,
      ticks = _child$props.ticks,
      includeHidden = _child$props.includeHidden,
      axisId = child.props[axisIdKey];
    if (result[axisId]) {
      return result;
    }
    var displayedData = (0, _chartFn.getDisplayedData)(props.data, {
      graphicalItems: graphicalItems.filter(function (item) {
        return item.props[axisIdKey] === axisId;
      }),
      dataStartIndex: dataStartIndex,
      dataEndIndex: dataEndIndex
    });
    var len = displayedData.length;
    var domain, duplicateDomain, categoricalDomain;
    /*
     * This is a hack to short-circuit the domain creation here to enhance performance.
     * Usually, the data is used to determine the domain, but when the user specifies
     * a domain upfront (via props), there is no need to calculate the domain start and end,
     * which is very expensive for a larger amount of data.
     * The only thing that would prohibit short-circuiting is when the user doesn't allow data overflow,
     * because the axis is supposed to ignore the specified domain that way.
     */
    if (isDomainSpecifiedByUser(child.props.domain, allowDataOverflow, type)) {
      domain = (0, _ChartUtils.parseSpecifiedDomain)(child.props.domain, null, allowDataOverflow);

      /* The chart can be categorical and have the domain specified in numbers
       * we still need to calculate the categorical domain
       * TODO: refactor this more
       */
      if (isCategorical && (_isValueNumber(type) || scale !== 'auto')) {
        categoricalDomain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, 'category');
      }
    }
    // if the domain is defaulted we need this for `originalDomain` as well
    var defaultDomain = (0, _chartFn.getDefaultDomainByAxisType)(type);

    // we didn't create the domain from user's props above, so we need to calculate it
    if (!domain || domain.length === 0) {
      var _child$props$domain;
      var childDomain = (_child$props$domain = child.props.domain) != null ? _child$props$domain : defaultDomain;
      if (dataKey) {
        // has dataKey in <Axis />
        domain = (0, _ChartUtils.getDomainOfDataByKey)(displayedData, dataKey, type);
        if (_isValueCategory(type) && isCategorical) {
          // the field type is category data and this axis is categorical axis
          var duplicate = (0, _DataUtils.hasDuplicate)(domain);
          if (allowDuplicatedCategory && duplicate) {
            duplicateDomain = domain;
            // When category axis has duplicated text, serial numbers are used to generate scale
            domain = (0, _FnUtils._range)(0, len);
          } else if (!allowDuplicatedCategory) {
            // remove duplicated category
            domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(childDomain, domain, child).reduce(function (finalDomain, entry) {
              return finalDomain.indexOf(entry) >= 0 ? finalDomain : [].concat(finalDomain, [entry]);
            }, []);
          }
        } else if (_isValueCategory(type)) {
          // the field type is category data and this axis is numerical axis
          if (!allowDuplicatedCategory) {
            domain = (0, _ChartUtils.parseDomainOfCategoryAxis)(childDomain, domain, child).reduce(function (finalDomain, entry) {
              return finalDomain.indexOf(entry) >= 0 || entry === '' || (0, _FnUtils._isNil)(entry) ? finalDomain : [].concat(finalDomain, [entry]);
            }, []);
          } else {
            // eliminate undefined or null or empty string
            domain = domain.filter(function (entry) {
              return entry !== '' && !(0, _FnUtils._isNil)(entry);
            });
          }
        } else if (_isValueNumber(type)) {
          // the field type is numerical
          var errorBarsDomain = (0, _ChartUtils.parseErrorBarsOfAxis)(displayedData, graphicalItems.filter(function (item) {
            return item.props[axisIdKey] === axisId && (includeHidden || !item.props.hide);
          }), dataKey, axisType, layout);
          if (errorBarsDomain) {
            domain = errorBarsDomain;
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
        domain = (0, _ChartUtils.getDomainOfItemsWithSameAxis)(displayedData, graphicalItems.filter(function (item) {
          return item.props[axisIdKey] === axisId && (includeHidden || !item.props.hide);
        }), type, layout, true);
      }
      if (_isValueNumber(type)) {
        // To detect wether there is any reference lines whose props alwaysShow is true
        domain = (0, _DetectReferenceElementsDomain.detectReferenceElementsDomain)(children, domain, axisId, axisType, ticks);
        if (childDomain) {
          domain = (0, _ChartUtils.parseSpecifiedDomain)(childDomain, domain, allowDataOverflow);
        }
      } else if (_isValueCategory(type) && childDomain) {
        var axisDomain = childDomain,
          isDomainValid = domain.every(function (entry) {
            return axisDomain.indexOf(entry) >= 0;
          });
        if (isDomainValid) {
          domain = axisDomain;
        }
      }
    }
    return (0, _extends3["default"])({}, result, (_extends2 = {}, _extends2[axisId] = (0, _extends3["default"])({}, child.props, {
      isCategorical: isCategorical,
      axisType: axisType,
      domain: domain,
      categoricalDomain: categoricalDomain,
      duplicateDomain: duplicateDomain,
      layout: layout,
      originalDomain: (_child$props$domain2 = child.props.domain) != null ? _child$props$domain2 : defaultDomain
    }), _extends2));
  }, {});
  return axisMap;
};
exports.getAxisMapByAxes = getAxisMapByAxes;
//# sourceMappingURL=getAxisMapByAxes.js.map