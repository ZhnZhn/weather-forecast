"use strict";

exports.__esModule = true;
exports.calculateOffset = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _ChartUtils = require("../util/ChartUtils");
const _getObjectKeys = Object.keys;
const _calcOffset = (axisMap, getEntryValue, initialValue) => _getObjectKeys(axisMap).reduce((result, id) => {
  const entry = axisMap[id],
    {
      orientation
    } = entry;
  if (!entry.mirror && !entry.hide) {
    result[orientation] = (orientation && result[orientation] || 0) + getEntryValue(entry);
  }
  return result;
}, initialValue);
const _appendOffsetOfLegend = (offset, legendBox, legendProps) => {
  const {
    align,
    verticalAlign,
    layout
  } = legendProps;
  if ((0, _ChartUtils.isLayoutVertical)(layout) || (0, _ChartUtils.isLayoutHorizontal)(layout) && verticalAlign === 'middle' && (0, _isTypeFn.isNumber)(offset[align])) {
    offset[align] += legendBox.width || 0;
  }
  if ((0, _ChartUtils.isLayoutHorizontal)(layout) || (0, _ChartUtils.isLayoutVertical)(layout) && align === 'center' && (0, _isTypeFn.isNumber)(offset[verticalAlign])) {
    offset[verticalAlign] += legendBox.height || 0;
  }
  return offset;
};

/**
 * Calculate the offset of main part in the svg element
 * @param  {Object} props          Latest props
 * graphicalItems The instances of item
 * xAxisMap       The configuration of x-axis
 * yAxisMap       The configuration of y-axis
 * @param  {Object} prevLegendBBox the boundary box of legend
 * @param  {Object} legendItem
 * @return {Object} The offset of main part in the svg element
 */
const calculateOffset = (_ref, prevLegendBBox, legendItem) => {
  let {
    xAxisMap = {},
    yAxisMap = {},
    width,
    height,
    margin
  } = _ref;
  const offsetH = _calcOffset(yAxisMap, entry => entry.width, {
      left: margin.left || 0,
      right: margin.right || 0
    }),
    offsetV = _calcOffset(xAxisMap, entry => entry.height, {
      top: margin.top || 0,
      bottom: margin.bottom || 0
    });
  let offset = Object.assign({}, offsetV, offsetH);
  if (legendItem && prevLegendBBox) {
    offset = _appendOffsetOfLegend(offset, prevLegendBBox, legendItem.props);
  }
  offset.width = width - offset.left - offset.right;
  offset.height = height - offset.top - offset.bottom;
  return offset;
};
exports.calculateOffset = calculateOffset;
//# sourceMappingURL=calculateOffset.js.map