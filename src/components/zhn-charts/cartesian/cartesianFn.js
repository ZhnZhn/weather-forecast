import { isArr } from '../../../utils/isTypeFn';

import { getValueByDataKey } from '../util/ChartUtils';

export const DF_AXIS_PROPS = {
  allowDataOverflow: false,
  allowDecimals: true,
  hide: false,
  mirror: false,
  tickCount: 5,
  scale: 'auto',
  reversed: false
};

export const isHideOrNoData = (
  { hide },
  data
) => hide || !data || !data.length

const _isAllowDataOverflow = axis => axis
  && axis.allowDataOverflow;
export const isNeedClip = ({
 xAxis,
 yAxis
}) => _isAllowDataOverflow(xAxis)
  || _isAllowDataOverflow(yAxis)

export const dataPointFormatter = (
  dataPoint,
  dataKey
) => ({
   x: dataPoint.x,
   y: dataPoint.y,
   value: isArr(dataPoint.value)
    ? dataPoint.value[1]
    : dataPoint.value,
   errorVal: getValueByDataKey(dataPoint, dataKey)
})

export const crClipPath = (
  needClip,
  clipPathId
) => needClip
  ? `url(#clipPath-${clipPathId})`
  : null
