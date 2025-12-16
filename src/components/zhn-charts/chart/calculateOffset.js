import {
  isNumber
} from '../../../utils/isTypeFn';

import {
  isLayoutHorizontal,
  isLayoutVertical
} from '../util/ChartUtils';

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

const _appendOffsetOfLegend = (
  offset,
  legendBox,
  legendProps
) => {
  const {
    align,
    verticalAlign,
    layout
  } = legendProps;
  if (isLayoutVertical(layout)
    || (isLayoutHorizontal(layout) && verticalAlign === 'middle')
    && isNumber(offset[align])) {
    offset[align] += legendBox.width || 0
  }
  if (isLayoutHorizontal(layout)
    || (isLayoutVertical(layout) && align === 'center')
    && isNumber(offset[verticalAlign])) {
    offset[verticalAlign] += legendBox.height || 0
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
      offset = _appendOffsetOfLegend(
        offset,
        prevLegendBBox,
        legendItem.props
      );
    }

    offset.width = width - offset.left - offset.right
    offset.height = height - offset.top - offset.bottom

    return offset;
}
