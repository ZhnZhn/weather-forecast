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
     if (!entry.mirror && !entry.hide) {
       result[orientation] = ((orientation && result[orientation]) || 0) + getEntryValue(entry)
     }
     return result;
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
  xAxisMap = {},
  yAxisMap = {},
  width,
  height,
  margin
}, prevLegendBBox, legendItem) => {
    const offsetH = _calcOffset(
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

    if (legendItem && prevLegendBBox) {
      offset = appendOffsetOfLegend(
        offset,
        margin,
        width,
        prevLegendBBox,
        legendItem
      );
    }

    return {
      brushBottom: offset.bottom,
      ...offset,
      width: width - offset.left - offset.right,
      height: height - offset.top - offset.bottom
    };
}
