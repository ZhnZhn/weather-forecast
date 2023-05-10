import _get from 'lodash/get';
import _range from 'lodash/range';

import {
  isCategoricalAxis,
  getDomainOfItemsWithSameAxis,
  getDomainOfStackGroups,
  parseSpecifiedDomain
} from '../util/ChartUtils';
import { findAllByType } from '../util/ReactUtils';
import {
  detectReferenceElementsDomain
} from '../util/DetectReferenceElementsDomain';

import {
  getDisplayedData,
  getDefaultDomainByAxisType
} from './chartFn';
import { getAxisMapByAxes } from './getAxisMapByAxes';

const ORIENT_MAP = {
  xAxis: ['bottom', 'top'],
  yAxis: ['left', 'right']
};

const _isNotEmpty = arr => arr && arr.length;

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
const getAxisMapByItems = (
  props, {
  graphicalItems,
  Axis,
  axisType,
  axisIdKey,
  stackGroups,
  dataStartIndex,
  dataEndIndex
}) => {
    const {
      layout,
      children
    } = props
    , displayedData = getDisplayedData(props.data, {
        graphicalItems,
        dataStartIndex,
        dataEndIndex,
    })
    , len = displayedData.length
    , isCategorical = isCategoricalAxis(layout, axisType);

    let index = -1;
    // The default type of x-axis is category axis,
    // The default contents of x-axis is the serial numbers of data
    // The default type of y-axis is number axis
    // The default contents of y-axis is the domain of data
    const axisMap = graphicalItems.reduce((result, child) => {
      const axisId = child.props[axisIdKey]
      , originalDomain = getDefaultDomainByAxisType('number');
      if (!result[axisId]) {
        index++;
        let domain;
        if (isCategorical) {
          domain = _range(0, len);
        } else if (stackGroups
            && stackGroups[axisId]
            && stackGroups[axisId].hasStack
        ) {
          domain = getDomainOfStackGroups(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
          domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
        } else {
          domain = parseSpecifiedDomain(originalDomain, getDomainOfItemsWithSameAxis(displayedData, graphicalItems.filter((item) => item.props[axisIdKey] === axisId && !item.props.hide), 'number', layout), Axis.defaultProps.allowDataOverflow);
          domain = detectReferenceElementsDomain(children, domain, axisId, axisType);
        }
        return {
          ...result,
          [axisId]: {
            axisType,
            ...Axis.defaultProps,
            hide: true,
            orientation: _get(ORIENT_MAP, `${axisType}.${index % 2}`, null),
            domain,
            originalDomain,
            isCategorical,
            layout
            // specify scale when no Axis
            // scale: isCategorical ? 'band' : 'linear',
          }
        };
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
export const getAxisMap = (
  props, {
  axisType = 'xAxis',
  AxisComp,
  graphicalItems,
  stackGroups,
  dataStartIndex,
  dataEndIndex
}) => {
  const _axisOptions = {
    axisIdKey: `${axisType}Id`,
    graphicalItems,
    axisType,
    stackGroups,
    dataStartIndex,
    dataEndIndex
  }
  // Get all the instance of Axis
  , axes = findAllByType(props.children, AxisComp);
  return _isNotEmpty(axes)
    ? getAxisMapByAxes(props, {
        ..._axisOptions,
        axes
      })
    : _isNotEmpty(graphicalItems)
       ? getAxisMapByItems(props, {
           ..._axisOptions,
           Axis: AxisComp
         })
       : {};
};
