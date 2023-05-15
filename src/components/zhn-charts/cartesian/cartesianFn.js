import {
  isValidElement,
  cloneElement
} from '../../uiApi';

import { getValueByDataKey } from '../util/ChartUtils';
import { _isFn } from '../util/FnUtils';

export const isNeedClip = ({
 xAxis,
 yAxis
}) => (xAxis && xAxis.allowDataOverflow)
  || (yAxis && yAxis.allowDataOverflow);

export const fCreateElement = (
  crElement
) => (
  option,
  props
) => isValidElement(option)
  ? cloneElement(option, props)
  : _isFn(option)
     ? option(props)
     : crElement(props, option)

export const dataPointFormatter = (
  dataPoint,
  dataKey
) => ({
  x: dataPoint.x,
  y: dataPoint.y,
  value: dataPoint.value,
  errorVal: getValueByDataKey(dataPoint, dataKey)
})

export const crClipPathProps = (
  needClip,
  clipPathId
)=> ({
  clipPath: needClip
    ? `url(#clipPath-${clipPathId})`
    : null
})
