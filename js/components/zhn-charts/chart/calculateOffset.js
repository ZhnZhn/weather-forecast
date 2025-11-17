"use strict";

exports.__esModule = true;
exports.calculateOffset = void 0;
var _ChartUtils = require("../util/ChartUtils");
const _getObjectKeys = Object.keys;
const _calcOffset = (axisMap, getEntryValue, initialValue) => _getObjectKeys(axisMap).reduce((result, id) => {
  const entry = axisMap[id],
    {
      orientation
    } = entry;
  return !entry.mirror && !entry.hide ? Object.assign({}, result, {
    [orientation]: (orientation && result[orientation] || 0) + getEntryValue(entry)
  }) : result;
}, initialValue);

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
    props,
    graphicalItems,
    xAxisMap = {},
    yAxisMap = {}
  } = _ref;
  const margin = props.margin || {},
    offsetH = _calcOffset(yAxisMap, entry => entry.width, {
      left: margin.left || 0,
      right: margin.right || 0
    }),
    offsetV = _calcOffset(xAxisMap, entry => entry.height, {
      top: margin.top || 0,
      bottom: margin.bottom || 0
    });
  let offset = Object.assign({}, offsetV, offsetH);
  const brushBottom = offset.bottom;
  if (legendItem && prevLegendBBox) {
    offset = (0, _ChartUtils.appendOffsetOfLegend)(offset, graphicalItems, props, prevLegendBBox);
  }
  return Object.assign({
    brushBottom
  }, offset, {
    width: props.width - offset.left - offset.right,
    height: props.height - offset.top - offset.bottom
  });
};
exports.calculateOffset = calculateOffset;
//# sourceMappingURL=calculateOffset.js.map