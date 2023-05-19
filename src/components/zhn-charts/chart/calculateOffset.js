import { findChildByType } from '../util/ReactUtils';
import { appendOffsetOfLegend } from '../util/ChartUtils';

import { Brush } from '../cartesian/Brush';
import { Legend } from '../component/Legend';

const _getObjectKeys = Object.keys;
const _getPropName = (
  obj,
  propName
) => obj && propName
  ? obj[propName] || ''
  : ''

/**
 * Calculate the offset of main part in the svg element
 * @param  {Object} props          Latest props
 * graphicalItems The instances of item
 * xAxisMap       The configuration of x-axis
 * yAxisMap       The configuration of y-axis
 * @param  {Object} prevLegendBBox          the boundary box of legend
 * @return {Object} The offset of main part in the svg element
 */
export const calculateOffset = ({
  props,
  graphicalItems,
  xAxisMap = {},
  yAxisMap = {}
}, prevLegendBBox) => {
    const {
      width,
      height,
      children
    } = props
    , margin = props.margin || {}
    , brushItem = findChildByType(children, Brush)
    , legendItem = findChildByType(children, Legend);

    const offsetH = _getObjectKeys(yAxisMap)
      .reduce((result, id) => {
         const entry = yAxisMap[id]
         , { orientation } = entry;
         return !entry.mirror && !entry.hide
           ? {
               ...result,
               [orientation]: result[orientation] + entry.width
             }
           : result;
    }, {
      left: margin.left || 0,
      right: margin.right || 0
    });

    const offsetV = _getObjectKeys(xAxisMap)
      .reduce((result, id) => {
         const entry = xAxisMap[id]
         , { orientation } = entry;
         return !entry.mirror && !entry.hide
           ? {
               ...result,
               [orientation]: _getPropName(result, `${orientation}`) + entry.height
             }
           : result;
    }, {
      top: margin.top || 0,
      bottom: margin.bottom || 0
    });

    let offset = { ...offsetV, ...offsetH };
    const brushBottom = offset.bottom;
    if (brushItem) {
      offset.bottom += brushItem.props.height || Brush.defaultProps.height;
    }
    if (legendItem && prevLegendBBox) {
      offset = appendOffsetOfLegend(offset, graphicalItems, props, prevLegendBBox);
    }

    return {
      brushBottom,
      ...offset,
      width: width - offset.left - offset.right,
      height: height - offset.top - offset.bottom
    };
}
