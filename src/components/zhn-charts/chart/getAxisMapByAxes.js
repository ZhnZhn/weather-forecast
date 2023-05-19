import {
  _isArr,
  _isNil,
  _range
} from '../util/FnUtils';

import {
  isNumber,
  hasDuplicate
} from '../util/DataUtils';

import {
  isCategoricalAxis,
  getDomainOfItemsWithSameAxis,
  getDomainOfStackGroups,
  getDomainOfDataByKey,
  parseErrorBarsOfAxis,
  parseSpecifiedDomain,
  parseDomainOfCategoryAxis
} from '../util/ChartUtils';

import {
  detectReferenceElementsDomain
} from '../util/DetectReferenceElementsDomain';

import {
  getDisplayedData,
  getDefaultDomainByAxisType
} from './chartFn';

const _isValueCategory = value => value === 'category';
const _isValueNumber = value => value === 'number';

/**
 * Takes a domain and user props to determine whether he provided the domain via props or if we need to calculate it.
 * @param   {AxisDomain}  domain              The potential domain from props
 * @param   {Boolean}     allowDataOverflow   from props
 * @param   {String}      axisType            from props
 * @returns {Boolean}                         `true` if domain is specified by user
 */
const isDomainSpecifiedByUser = (
  domain,
  allowDataOverflow,
  axisType
) => {
  if (_isValueNumber(axisType)
      && allowDataOverflow === true
      && _isArr(domain)
  ) {
    const domainStart = domain?.[0]
    , domainEnd = domain?.[1];
    /*
     * The `isNumber` check is needed because the user could also provide strings like "dataMin" via the domain props.
     * In such case, we have to compute the domain from the data.
     */
    if (!!domainStart && !!domainEnd && isNumber(domainStart) && isNumber(domainEnd)) {
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
export const getAxisMapByAxes = (
  props, {
  axes,
  graphicalItems,
  axisType,
  axisIdKey,
  stackGroups,
  dataStartIndex,
  dataEndIndex
}) => {
  const {
    layout,
    children,
    stackOffset
  } = props
  , isCategorical = isCategoricalAxis(
    layout,
    axisType
  );
  // Eliminate duplicated axes
  const axisMap = axes.reduce((result, child) => {
      const {
        type,
        dataKey,
        allowDataOverflow,
        allowDuplicatedCategory,
        scale,
        ticks,
        includeHidden
      } = child.props
      , axisId = child.props[axisIdKey];
      if (result[axisId]) {
        return result;
      }
      const displayedData = getDisplayedData(props.data, {
        graphicalItems: graphicalItems
          .filter(item => item.props[axisIdKey] === axisId),
        dataStartIndex,
        dataEndIndex
      });
      const len = displayedData.length;
      let domain
      , duplicateDomain
      , categoricalDomain;
      /*
       * This is a hack to short-circuit the domain creation here to enhance performance.
       * Usually, the data is used to determine the domain, but when the user specifies
       * a domain upfront (via props), there is no need to calculate the domain start and end,
       * which is very expensive for a larger amount of data.
       * The only thing that would prohibit short-circuiting is when the user doesn't allow data overflow,
       * because the axis is supposed to ignore the specified domain that way.
       */
      if (isDomainSpecifiedByUser(child.props.domain, allowDataOverflow, type)) {
        domain = parseSpecifiedDomain(
          child.props.domain,
          null,
          allowDataOverflow
        );

        /* The chart can be categorical and have the domain specified in numbers
         * we still need to calculate the categorical domain
         * TODO: refactor this more
         */
        if (isCategorical && (_isValueNumber(type) || scale !== 'auto')) {
          categoricalDomain = getDomainOfDataByKey(
            displayedData,
            dataKey,
            'category'
          );
        }
      }
      // if the domain is defaulted we need this for `originalDomain` as well
      const defaultDomain = getDefaultDomainByAxisType(type);

      // we didn't create the domain from user's props above, so we need to calculate it
      if (!domain || domain.length === 0) {
          const childDomain = child.props.domain ?? defaultDomain;
          if (dataKey) {
              // has dataKey in <Axis />
              domain = getDomainOfDataByKey(displayedData, dataKey, type);
              if (_isValueCategory(type) && isCategorical) {
                // the field type is category data and this axis is categorical axis
                const duplicate = hasDuplicate(domain);
                if (allowDuplicatedCategory && duplicate) {
                  duplicateDomain = domain;
                  // When category axis has duplicated text, serial numbers are used to generate scale
                  domain = _range(0, len);
                } else if (!allowDuplicatedCategory) {
                  // remove duplicated category
                  domain = parseDomainOfCategoryAxis(childDomain, domain, child).reduce((finalDomain, entry) => finalDomain.indexOf(entry) >= 0 ? finalDomain : [...finalDomain, entry], []);
                }
              } else if (_isValueCategory(type)) {
                  // the field type is category data and this axis is numerical axis
                  if (!allowDuplicatedCategory) {
                    domain = parseDomainOfCategoryAxis(childDomain, domain, child).reduce((finalDomain, entry) => finalDomain.indexOf(entry) >= 0 || entry === '' || _isNil(entry)
                      ? finalDomain
                      : [...finalDomain, entry], []);
                  } else {
                    // eliminate undefined or null or empty string
                    domain = domain.filter((entry) => entry !== '' && !_isNil(entry));
                  }
              } else if (_isValueNumber(type)) {
                  // the field type is numerical
                  const errorBarsDomain = parseErrorBarsOfAxis(
                    displayedData,
                    graphicalItems
                      .filter(item => item.props[axisIdKey] === axisId && (includeHidden || !item.props.hide)),
                    dataKey,
                    axisType,
                    layout
                  );
                  if (errorBarsDomain) {
                    domain = errorBarsDomain;
                  }
              }
              if (isCategorical && (_isValueNumber(type) || scale !== 'auto')) {
                  categoricalDomain = getDomainOfDataByKey(displayedData, dataKey, 'category');
              }
          } else if (isCategorical) {
              // the axis is a categorical axis
              domain = _range(0, len);
          } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && _isValueNumber(type)) {
              // when stackOffset is 'expand', the domain may be calculated as [0, 1.000000000002]
              domain = stackOffset === 'expand'
                ? [0, 1]
                : getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
          } else {
              domain = getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter((item) => item.props[axisIdKey] === axisId && (includeHidden || !item.props.hide)), type, layout, true);
          }

          if (_isValueNumber(type)) {
             // To detect wether there is any reference lines whose props alwaysShow is true
             domain = detectReferenceElementsDomain(children, domain, axisId, axisType, ticks);
             if (childDomain) {
                 domain = parseSpecifiedDomain(childDomain, domain, allowDataOverflow);
             }
          } else if (_isValueCategory(type) && childDomain) {
             const axisDomain = childDomain
             , isDomainValid = domain.
                 every(entry => axisDomain.indexOf(entry) >= 0);
             if (isDomainValid) {
                 domain = axisDomain;
             }
          }
      }
      return {
        ...result,
        [axisId]: {
          ...child.props,
          isCategorical,
          axisType,
          domain,
          categoricalDomain,
          duplicateDomain,
          layout,
          originalDomain: child.props.domain ?? defaultDomain,
        },
      };
  }, {});
  return axisMap;
};
