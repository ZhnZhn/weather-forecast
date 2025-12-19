import {
  isNullOrUndef
} from '../../../utils/isTypeFn';

import { _range } from '../util/FnUtils';
import { hasDuplicate } from '../util/DataUtils';

import {
  isCategoricalAxis,
  getDomainOfItemsWithSameAxis,
  getDomainOfDataByKey,
  parseSpecifiedDomain
} from '../util/ChartUtils';

import {
  detectReferenceElementsDomain
} from '../util/DetectReferenceElementsDomain';

import {
  getDisplayedData,
  getDefaultDomainByAxisType
} from './chartFn';

const _fIsValueEqual = (str) => (value) => value === str;
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
export const getAxisMapByAxes = (
  props, {
  axes,
  graphicalItems,
  axisType,
  axisIdKey,
  dataStartIndex,
  dataEndIndex
}) => {
  const {
    layout,
    children
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

      // if the domain is defaulted we need this for `originalDomain` as well
      const defaultDomain = getDefaultDomainByAxisType(type)
      , childDomain = child.props.domain ?? defaultDomain;
      if (dataKey) {
          // has dataKey in <Axis />
          domain = getDomainOfDataByKey(displayedData, dataKey, type);
          if (_isValueCategory(type) && isCategorical) {
            // the field type is category data and this axis is categorical axis
            if (hasDuplicate(domain)) {
              duplicateDomain = domain;
              // When category axis has duplicated text, serial numbers are used to generate scale
              domain = _range(0, len);
            }
          } else if (_isValueCategory(type)) {
              // the field type is category data and this axis is numerical axis
              domain = domain
                .filter((entry) => entry !== '' && !isNullOrUndef(entry));
          }
          if (isCategorical && (_isValueNumber(type) || scale !== 'auto')) {
              categoricalDomain = getDomainOfDataByKey(displayedData, dataKey, 'category');
          }
      } else if (isCategorical) {
          // the axis is a categorical axis
          domain = _range(0, len);
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
