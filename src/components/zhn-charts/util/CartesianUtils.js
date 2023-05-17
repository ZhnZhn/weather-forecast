import _mapValues from 'lodash/mapValues';

import {
  getTicksOfScale,
  parseScale,
  checkDomainOfScale,
  getBandSizeOfAxis
} from './ChartUtils';
import { findChildByType } from './ReactUtils';
import { getPercentValue } from './DataUtils';
import { Bar } from '../cartesian/Bar';

const _getObjectKeys = Object.keys;

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
    , offsetKey = `${orientation}${mirror ? 'Mirror' : ''}`;
    let calculatedPadding, range, x, y, needSpace;
    if (axis.type === 'number' && (axis.padding === 'gap' || axis.padding === 'no-gap')) {
      const diff = domain[1] - domain[0];
      let smallestDistanceBetweenValues = Infinity;
      const sortedValues = axis.categoricalDomain.sort();
      sortedValues.forEach((value, index) => {
        if (index > 0) {
          smallestDistanceBetweenValues = Math.min((value || 0) - (sortedValues[index - 1] || 0), smallestDistanceBetweenValues);
        }
      });
      const smallestDistanceInPercent = smallestDistanceBetweenValues / diff
      , rangeWidth = axis.layout === 'vertical'
         ? offset.height
         : offset.width;
      if (axis.padding === 'gap') {
        calculatedPadding = (smallestDistanceInPercent * rangeWidth) / 2;
      }
      if (axis.padding === 'no-gap') {
        const gap = getPercentValue(props.barCategoryGap, smallestDistanceInPercent * rangeWidth)
        , halfBand = (smallestDistanceInPercent * rangeWidth) / 2;
        calculatedPadding = halfBand - gap - ((halfBand - gap) / rangeWidth) * gap;
      }
    }
    if (axisType === 'xAxis') {
      range = [
        offset.left + (padding.left || 0) + (calculatedPadding || 0),
        offset.left + offset.width - (padding.right || 0) - (calculatedPadding || 0),
      ];
    } else if (axisType === 'yAxis') {
      range = layout === 'horizontal'
        ? [
            offset.top + offset.height - (padding.bottom || 0),
            offset.top + (padding.top || 0)
          ]
        : [
            offset.top + (padding.top || 0) + (calculatedPadding || 0),
            offset.top + offset.height - (padding.bottom || 0) - (calculatedPadding || 0),
          ];
    } else {
      ({ range } = axis);
    }
    if (reversed) {
      range = [range[1], range[0]];
    }
    const {
      scale,
      realScaleType
    } = parseScale(axis, chartName, hasBar);
    scale.domain(domain).range(range);
    checkDomainOfScale(scale);
    const ticks = getTicksOfScale(scale, { ...axis, realScaleType });
    if (axisType === 'xAxis') {
      needSpace = (orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror);
      x = offset.left;
      y = steps[offsetKey] - needSpace * axis.height;
    } else if (axisType === 'yAxis') {
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
      width: axisType === 'xAxis' ? offset.width : axis.width,
      height: axisType === 'yAxis' ? offset.height : axis.height,
    };
    finalAxis.bandSize = getBandSizeOfAxis(finalAxis, ticks);
    if (!axis.hide && axisType === 'xAxis') {
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
  x: Math.min(x1, x2),
  y: Math.min(y1, y2),
  width: Math.abs(x2 - x1),
  height: Math.abs(y2 - y1)
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
      return _mapValues(coord, (value, label) => scales[label].apply(value, { bandAware, position }));
    },
    isInRange(coord) {
      return coord.every((value, label) => scales[label].isInRange(value));
    }
  };
};
