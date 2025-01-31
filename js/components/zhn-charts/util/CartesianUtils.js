"use strict";

exports.__esModule = true;
exports.rectWithPoints = exports.rectWithCoords = exports.formatAxisMap = exports.createLabeledScales = exports.ScaleHelper = void 0;
var _ChartUtils = require("./ChartUtils");
var _ReactUtils = require("./ReactUtils");
var _DataUtils = require("./DataUtils");
var _Bar = require("../cartesian/Bar");
const _getObjectKeys = Object.keys,
  _mathMin = Math.min,
  _mathAbs = Math.abs;
const _calcSmallestDistanceBetweenValues = axis => axis.categoricalDomain.sort().reduce((smallestDistance, value, index, sortedValues) => {
  if (index > 0) {
    smallestDistance = _mathMin((value || 0) - (sortedValues[index - 1] || 0), smallestDistance);
  }
  return smallestDistance;
}, Infinity);
const _getCalculatedPadding = (axis, offset, props) => {
  const diff = axis.domain[1] - axis.domain[0],
    smallestDistanceBetweenValues = _calcSmallestDistanceBetweenValues(axis),
    smallestDistanceInPercent = smallestDistanceBetweenValues / diff,
    rangeWidth = (0, _ChartUtils.isLayoutVertical)(axis.layout) ? offset.height : offset.width;
  if (axis.padding === 'gap') {
    return smallestDistanceInPercent * rangeWidth / 2;
  }
  if (axis.padding === 'no-gap') {
    const gap = (0, _DataUtils.getPercentValue)(props.barCategoryGap, smallestDistanceInPercent * rangeWidth),
      halfBand = smallestDistanceInPercent * rangeWidth / 2;
    return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
  }
};
const _getRange = (axisType, offset, padding, calculatedPadding, layout, axis, reversed) => {
  let range;
  if (axisType === 'xAxis') {
    range = [offset.left + (padding.left || 0) + calculatedPadding, offset.left + offset.width - (padding.right || 0) - calculatedPadding];
  } else if (axisType === 'yAxis') {
    range = (0, _ChartUtils.isLayoutHorizontal)(layout) ? [offset.top + offset.height - (padding.bottom || 0), offset.top + (padding.top || 0)] : [offset.top + (padding.top || 0) + calculatedPadding, offset.top + offset.height - (padding.bottom || 0) - calculatedPadding];
  } else {
    ({
      range
    } = axis);
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
const formatAxisMap = (props, axisMap, offset, axisType, chartName) => {
  const {
      width,
      height,
      layout,
      children
    } = props,
    ids = _getObjectKeys(axisMap),
    steps = {
      left: offset.left,
      leftMirror: offset.left,
      right: width - offset.right,
      rightMirror: width - offset.right,
      top: offset.top,
      topMirror: offset.top,
      bottom: height - offset.bottom,
      bottomMirror: height - offset.bottom
    },
    hasBar = !!(0, _ReactUtils.findChildByType)(children, _Bar.Bar);
  return ids.reduce((result, id) => {
    const axis = axisMap[id],
      {
        orientation,
        domain,
        padding = {},
        mirror,
        reversed
      } = axis,
      offsetKey = `${orientation}${mirror ? 'Mirror' : ''}`,
      calculatedPadding = axis.type === 'number' && (axis.padding === 'gap' || axis.padding === 'no-gap') ? _getCalculatedPadding(axis, offset, props) || 0 : 0,
      range = _getRange(axisType, offset, padding, calculatedPadding, layout, axis, reversed),
      {
        scale,
        realScaleType
      } = (0, _ChartUtils.parseScale)(axis, chartName, hasBar);
    scale.domain(domain).range(range);
    (0, _ChartUtils.checkDomainOfScale)(scale);
    const ticks = (0, _ChartUtils.getTicksOfScale)(scale, {
      ...axis,
      realScaleType
    });
    let x, y, needSpace;
    if (axisType === 'xAxis') {
      needSpace = orientation === 'top' && !mirror || orientation === 'bottom' && mirror;
      x = offset.left;
      y = steps[offsetKey] - needSpace * axis.height;
    } else if (axisType === 'yAxis') {
      needSpace = orientation === 'left' && !mirror || orientation === 'right' && mirror;
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
      height: axisType === 'yAxis' ? offset.height : axis.height
    };
    finalAxis.bandSize = (0, _ChartUtils.getBandSizeOfAxis)(finalAxis, ticks);
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
exports.formatAxisMap = formatAxisMap;
const rectWithPoints = (_ref, _ref2) => {
  let {
    x: x1,
    y: y1
  } = _ref;
  let {
    x: x2,
    y: y2
  } = _ref2;
  return {
    x: _mathMin(x1, x2),
    y: _mathMin(y1, y2),
    width: _mathAbs(x2 - x1),
    height: _mathAbs(y2 - y1)
  };
};

/**
 * Compute the x, y, width, and height of a box from two reference points.
 * @param  {Object} coords     x1, x2, y1, and y2
 * @return {Object} object
 */
exports.rectWithPoints = rectWithPoints;
const rectWithCoords = _ref3 => {
  let {
    x1,
    y1,
    x2,
    y2
  } = _ref3;
  return rectWithPoints({
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  });
};
exports.rectWithCoords = rectWithCoords;
class ScaleHelper {
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
  apply(value, _temp) {
    let {
      bandAware,
      position
    } = _temp === void 0 ? {} : _temp;
    if (value === undefined) {
      return;
    }
    if (position) {
      switch (position) {
        case 'start':
          {
            return this.scale(value);
          }
        case 'middle':
          {
            const offset = this.bandwidth ? this.bandwidth() / 2 : 0;
            return this.scale(value) + offset;
          }
        case 'end':
          {
            const offset = this.bandwidth ? this.bandwidth() : 0;
            return this.scale(value) + offset;
          }
        default:
          {
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
    const range = this.range(),
      first = range[0],
      last = range[range.length - 1];
    return first <= last ? value >= first && value <= last : value >= last && value <= first;
  }
}
exports.ScaleHelper = ScaleHelper;
ScaleHelper.EPS = 1e-4;
const createLabeledScales = options => {
  const scales = _getObjectKeys(options).reduce((res, key) => ({
    ...res,
    [key]: ScaleHelper.create(options[key])
  }), {});
  return {
    ...scales,
    apply(coord, _temp2) {
      let {
        bandAware,
        position
      } = _temp2 === void 0 ? {} : _temp2;
      //return _mapValues(coord, (value, label) => scales[label].apply(value, { bandAware, position }));
      return coord.map((value, label) => scales[label].apply(value, {
        bandAware,
        position
      }));
    },
    isInRange(coord) {
      return coord.every((value, label) => scales[label].isInRange(value));
    }
  };
};
exports.createLabeledScales = createLabeledScales;
//# sourceMappingURL=CartesianUtils.js.map