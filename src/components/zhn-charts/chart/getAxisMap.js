import { isNotEmptyArr } from '../../../utils/isTypeFn';

import { findAllByType } from '../util/ReactUtils';
import { getAxisMapByAxes } from './getAxisMapByAxes';

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
  stackGroups
}) => {
  const _axisOptions = {
    axisIdKey: `${axisType}Id`,
    graphicalItems,
    axisType,
    stackGroups
  }
  // Get all the instance of Axis
  , axes = findAllByType(props.children, AxisComp);
  return isNotEmptyArr(axes)
    ? getAxisMapByAxes(props, {
        ..._axisOptions,
        axes
      })
    : {};
};
