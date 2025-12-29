"use strict";

exports.__esModule = true;
exports.isOrientationTop = exports.isOrientationRight = exports.isOrientationLeft = exports.isOrientationBottom = exports.formatAxisMap = void 0;
var _ChartUtils = require("./ChartUtils");
var _ReactUtils = require("./ReactUtils");
var _DataUtils = require("./DataUtils");
var _Bar = require("../cartesian/Bar");
const _getObjectKeys = Object.keys,
  _mathMin = Math.min;
const isOrientationLeft = orientation => orientation === 'left';
exports.isOrientationLeft = isOrientationLeft;
const isOrientationRight = orientation => orientation === 'right';
exports.isOrientationRight = isOrientationRight;
const isOrientationTop = orientation => orientation === 'top';
exports.isOrientationTop = isOrientationTop;
const isOrientationBottom = orientation => orientation === 'bottom';
exports.isOrientationBottom = isOrientationBottom;
const _calcSmallestDistanceBetweenValues = categoricalDomain => categoricalDomain.sort().reduce((smallestDistance, value, index, sortedValues) => {
  if (index > 0) {
    smallestDistance = _mathMin((value || 0) - (sortedValues[index - 1] || 0), smallestDistance);
  }
  return smallestDistance;
}, Infinity);
const _getCalculatedPadding = (type, padding, domain, categoricalDomain, layout, offset, props) => {
  if (!(type === 'number' && (padding === 'gap' || padding === 'no-gap'))) {
    return 0;
  }
  const diff = domain[1] - domain[0],
    smallestDistanceBetweenValues = _calcSmallestDistanceBetweenValues(categoricalDomain),
    smallestDistanceInPercent = smallestDistanceBetweenValues / diff,
    rangeWidth = (0, _ChartUtils.isLayoutVertical)(layout) ? offset.height : offset.width;
  if (padding === 'gap') {
    return smallestDistanceInPercent * rangeWidth / 2;
  }
  if (padding === 'no-gap') {
    const gap = (0, _DataUtils.getPercentValue)(props.barCategoryGap, smallestDistanceInPercent * rangeWidth),
      halfBand = smallestDistanceInPercent * rangeWidth / 2;
    return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
  }
};
const _getRange = (axisType, offset, padding, calculatedPadding, layout) => {
  if ((0, _ChartUtils.isAxisTypeX)(axisType)) {
    return [offset.left + (padding.left || 0) + calculatedPadding, offset.left + offset.width - (padding.right || 0) - calculatedPadding];
  }
  if ((0, _ChartUtils.isAxisTypeY)(axisType)) {
    const _range1 = offset.top + offset.height - (padding.bottom || 0),
      _range2 = offset.top + (padding.top || 0);
    return (0, _ChartUtils.isLayoutHorizontal)(layout) ? [_range1, _range2] : [_range2 + calculatedPadding, _range1 - calculatedPadding];
  }
};
const _crSteps = (offset, width, height) => {
  const left = offset.left,
    right = width - offset.right,
    top = offset.top,
    bottom = height - offset.bottom;
  return {
    left,
    leftMirror: left,
    right,
    rightMirror: right,
    top,
    topMirror: top,
    bottom,
    bottomMirror: bottom
  };
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
      layout
    } = props,
    hasBar = !!(0, _ReactUtils.findChildByType)(props.children, _Bar.Bar),
    steps = _crSteps(offset, props.width, props.height),
    ids = _getObjectKeys(axisMap);
  return ids.reduce((result, id) => {
    const axis = axisMap[id],
      {
        orientation,
        domain,
        padding = {},
        mirror
      } = axis,
      offsetKey = `${orientation}${mirror ? 'Mirror' : ''}`,
      calculatedPadding = _getCalculatedPadding(axis.type, padding, domain, axis.categoricalDomain, layout, offset, props) || 0,
      _range = _getRange(axisType, offset, padding, calculatedPadding, layout) || axis.range,
      range = axis.reversed ? [_range[1], _range[0]] : _range,
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
    if ((0, _ChartUtils.isAxisTypeX)(axisType)) {
      needSpace = isOrientationTop(orientation) && !mirror || isOrientationBottom(orientation) && mirror;
      x = offset.left;
      y = steps[offsetKey] - needSpace * axis.height;
    } else if ((0, _ChartUtils.isAxisTypeY)(axisType)) {
      needSpace = isOrientationLeft(orientation) && !mirror || isOrientationRight(orientation) && mirror;
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
      width: (0, _ChartUtils.isAxisTypeX)(axisType) ? offset.width : axis.width,
      height: (0, _ChartUtils.isAxisTypeY)(axisType) ? offset.height : axis.height
    };
    finalAxis.bandSize = (0, _ChartUtils.getBandSizeOfAxis)(finalAxis, ticks);
    if (!axis.hide && (0, _ChartUtils.isAxisTypeX)(axisType)) {
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
//# sourceMappingURL=CartesianUtils.js.map