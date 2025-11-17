import { appendOffsetOfLegend } from '../util/ChartUtils';

const _getObjectKeys = Object.keys;
const _calcOffset = (
  axisMap,
  getEntryValue,
  initialValue
) => _getObjectKeys(axisMap)
  .reduce((result, id) => {
     const entry = axisMap[id]
     , { orientation } = entry;
     return !entry.mirror && !entry.hide
       ? {
           ...result,
           [orientation]: ((orientation && result[orientation]) || 0) + getEntryValue(entry)
         }
       : result;
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
export const calculateOffset = ({
  props,
  graphicalItems,
  xAxisMap = {},
  yAxisMap = {}
}, prevLegendBBox, legendItem) => {
    const margin = props.margin || {}
    , offsetH = _calcOffset(
       yAxisMap,
       (entry) => entry.width,
       {
         left: margin.left || 0,
         right: margin.right || 0
       }
    )
    , offsetV = _calcOffset(
       xAxisMap,
       entry => entry.height,
       {
         top: margin.top || 0,
         bottom: margin.bottom || 0
       }
    )

    let offset = { ...offsetV, ...offsetH };
    const brushBottom = offset.bottom;

    if (legendItem && prevLegendBBox) {
      offset = appendOffsetOfLegend(offset, graphicalItems, props, prevLegendBBox);
    }

    return {
      brushBottom,
      ...offset,
      width: props.width - offset.left - offset.right,
      height: props.height - offset.top - offset.bottom
    };
}
