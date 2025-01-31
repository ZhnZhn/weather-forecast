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
, _mathMin = Math.min
, _mathAbs = Math.abs;

const _calcSmallestDistanceBetweenValues = (
  axis
) => axis.categoricalDomain
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
  axis,
  offset,
  props
) => {
  const diff = axis.domain[1] - axis.domain[0]
  , smallestDistanceBetweenValues = _calcSmallestDistanceBetweenValues(axis)
  , smallestDistanceInPercent = smallestDistanceBetweenValues / diff
  , rangeWidth = isLayoutVertical(axis.layout)
     ? offset.height
     : offset.width;
  if (axis.padding === 'gap') {
    return (smallestDistanceInPercent * rangeWidth) / 2;
  }
  if (axis.padding === 'no-gap') {
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
  layout,
  axis,
  reversed
) => {
  let range;
  if (isAxisTypeX(axisType)) {
    range = [
      offset.left + (padding.left || 0) + calculatedPadding,
      offset.left + offset.width - (padding.right || 0) - calculatedPadding,
    ];
  } else if (isAxisTypeY(axisType)) {
    range = isLayoutHorizontal(layout)
      ? [
          offset.top + offset.height - (padding.bottom || 0),
          offset.top + (padding.top || 0)
        ]
      : [
          offset.top + (padding.top || 0) + calculatedPadding,
          offset.top + offset.height - (padding.bottom || 0) - calculatedPadding,
        ];
  } else {
    ({ range } = axis);
  }
  if (reversed) {
    range = [range[1], range[0]];
  }
  return range;
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
      mirror,
      reversed
    } = axis
    , offsetKey = `${orientation}${mirror ? 'Mirror' : ''}`
    , calculatedPadding = axis.type === 'number'
        && (axis.padding === 'gap' || axis.padding === 'no-gap')
        ? _getCalculatedPadding(axis, offset, props) || 0
        : 0
    , range = _getRange(
       axisType,
       offset,
       padding,
       calculatedPadding,
       layout,
       axis,
       reversed
    )
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
};

export const rectWithPoints = (
  { x: x1, y: y1 },
  { x: x2, y: y2 }
) => ({
  x: _mathMin(x1, x2),
  y: _mathMin(y1, y2),
  width: _mathAbs(x2 - x1),
  height: _mathAbs(y2 - y1)
});

/**
 * Compute the x, y, width, and height of a box from two reference points.
 * @param  {Object} coords     x1, x2, y1, and y2
 * @return {Object} object
 */
export const rectWithCoords = ({
  x1,
  y1,
  x2,
  y2
}) => rectWithPoints({ x: x1, y: y1 }, { x: x2, y: y2 });

export class ScaleHelper {
  static create(obj) {
    return new ScaleHelper(obj);
  }
  constructor(scale) {
    this.scale = scale;
  }
  get domain() {
    return this.scale.domain;
  }
  get range() {
    return this.scale.range;
  }
  get rangeMin() {
    return this.range()[0];
  }
  get rangeMax() {
    return this.range()[1];
  }
  get bandwidth() {
    return this.scale.bandwidth;
  }
  apply(value, { bandAware, position } = {}) {
    if (value === undefined) {
      return;
    }
    if (position) {
      switch (position) {
        case 'start': {
          return this.scale(value);
        }
        case 'middle': {
          const offset = this.bandwidth
            ? this.bandwidth() / 2
            : 0;
          return this.scale(value) + offset;
        }
        case 'end': {
          const offset = this.bandwidth
            ? this.bandwidth()
            : 0;
          return this.scale(value) + offset;
        }
        default: {
          return this.scale(value);
        }
      }
    }
    if (bandAware) {
      const offset = this.bandwidth ? this.bandwidth() / 2 : 0;
      return this.scale(value) + offset;
    }
    return this.scale(value);
  }
  isInRange(value) {
    const range = this.range()
    , first = range[0]
    , last = range[range.length - 1];
    return first <= last
      ? value >= first && value <= last
      : value >= last && value <= first;
  }
}

ScaleHelper.EPS = 1e-4;

export const createLabeledScales = (options) => {
  const scales = _getObjectKeys(options).
    reduce((res, key) => ({
      ...res,
      [key]: ScaleHelper.create(options[key])
    }), {});
  return {
    ...scales,
    apply(coord, { bandAware, position } = {}) {
      //return _mapValues(coord, (value, label) => scales[label].apply(value, { bandAware, position }));
      return coord.map((value, label) => scales[label].apply(value, { bandAware, position }));
    },
    isInRange(coord) {
      return coord.every((value, label) => scales[label].isInRange(value));
    }
  };
};
