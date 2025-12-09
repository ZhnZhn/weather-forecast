import {
  getTicksOfScale,
  parseScale,
  checkDomainOfScale,
  getBandSizeOfAxis,
  isAxisTypeX,
  isAxisTypeY,
  isLayoutHorizontal,
  isLayoutVertical,
} from './ChartUtils';

import { findChildByType } from './ReactUtils';
import { getPercentValue } from './DataUtils';

import { Bar } from '../cartesian/Bar';

const _getObjectKeys = Object.keys
, _mathMin = Math.min;

const _calcSmallestDistanceBetweenValues = (
  categoricalDomain
) => categoricalDomain
  .sort()
  .reduce((smallestDistance, value, index, sortedValues) => {
    if (index > 0) {
      smallestDistance = _mathMin(
        (value || 0) - (sortedValues[index - 1] || 0),
        smallestDistance
      );
    }
    return smallestDistance;
  }, Infinity);

const _getCalculatedPadding = (
  type,
  padding,
  domain,
  categoricalDomain,
  layout,
  offset,
  props
) => {
  if ( !(type === 'number' && (padding === 'gap' || padding === 'no-gap')) ) {
    return 0;
  }

  const diff = domain[1] - domain[0]
  , smallestDistanceBetweenValues = _calcSmallestDistanceBetweenValues(categoricalDomain)
  , smallestDistanceInPercent = smallestDistanceBetweenValues / diff
  , rangeWidth = isLayoutVertical(layout)
     ? offset.height
     : offset.width;

  if (padding === 'gap') {
    return (smallestDistanceInPercent * rangeWidth) / 2;
  }

  if (padding === 'no-gap') {
    const gap = getPercentValue(props.barCategoryGap, smallestDistanceInPercent * rangeWidth)
    , halfBand = (smallestDistanceInPercent * rangeWidth) / 2;
    return halfBand - gap - ((halfBand - gap) / rangeWidth) * gap;
  }
};

const _getRange = (
  axisType,
  offset,
  padding,
  calculatedPadding,
  layout
) => {
  if (isAxisTypeX(axisType)) {
    return [
      offset.left + (padding.left || 0) + calculatedPadding,
      offset.left + offset.width - (padding.right || 0) - calculatedPadding,
    ];
  }

  if (isAxisTypeY(axisType)) {
    const _range1 = offset.top + offset.height - (padding.bottom || 0)
    , _range2 = offset.top + (padding.top || 0)
    return isLayoutHorizontal(layout)
      ? [_range1, _range2]
      : [_range2 + calculatedPadding, _range1 - calculatedPadding]
  }
};

/**
 * Calculate the scale function, position, width, height of axes
 * @param  {Object} props     Latest props
 * @param  {Object} axisMap   The configuration of axes
 * @param  {Object} offset    The offset of main part in the svg element
 * @param  {String} axisType  The type of axes, x-axis or y-axis
 * @param  {String} chartName The name of chart
 * @return {Object} Configuration
 */
export const formatAxisMap = (
  props,
  axisMap,
  offset,
  axisType,
  chartName
) => {
  const {
    width,
    height,
    layout,
    children
  } = props
  , ids = _getObjectKeys(axisMap)
  , steps = {
     left: offset.left,
     leftMirror: offset.left,
     right: width - offset.right,
     rightMirror: width - offset.right,
     top: offset.top,
     topMirror: offset.top,
     bottom: height - offset.bottom,
     bottomMirror: height - offset.bottom
  }
  , hasBar = !!findChildByType(children, Bar);
  return ids.reduce((result, id) => {
    const axis = axisMap[id]
    , {
      orientation,
      domain,
      padding = {},
      mirror
    } = axis
    , offsetKey = `${orientation}${mirror ? 'Mirror' : ''}`
    , calculatedPadding = _getCalculatedPadding(
        axis.type,
        padding,
        domain,
        axis.categoricalDomain,
        layout,
        offset,
        props
      ) || 0
    , _range = _getRange(
       axisType,
       offset,
       padding,
       calculatedPadding,
       layout
    ) || axis.range
    , range = axis.reversed
       ? [_range[1], _range[0]]
       : _range
    , {
      scale,
      realScaleType
    } = parseScale(axis, chartName, hasBar);

    scale.domain(domain).range(range);
    checkDomainOfScale(scale);

    const ticks = getTicksOfScale(
      scale,
      { ...axis, realScaleType }
    );
    let x, y, needSpace;
    if (isAxisTypeX(axisType)) {
      needSpace = (orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror);
      x = offset.left;
      y = steps[offsetKey] - needSpace * axis.height;
    } else if (isAxisTypeY(axisType)) {
      needSpace = (orientation === 'left' && !mirror) || (orientation === 'right' && mirror);
      x = steps[offsetKey] - needSpace * axis.width;
      y = offset.top;
    }
    const finalAxis = {
      ...axis,
      ...ticks,
      realScaleType,
      x,
      y,
      scale,
      width: isAxisTypeX(axisType)
        ? offset.width
        : axis.width,
      height: isAxisTypeY(axisType)
        ? offset.height
        : axis.height,
    };
    finalAxis.bandSize = getBandSizeOfAxis(finalAxis, ticks);
    if (!axis.hide && isAxisTypeX(axisType)) {
      steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.height;
    } else if (!axis.hide) {
      steps[offsetKey] += (needSpace ? -1 : 1) * finalAxis.width;
    }
    return {
      ...result,
      [id]: finalAxis
    };
  }, {});
}
