import {
  isValidElement,
  cloneElement
} from '../../uiApi';

import { getValueByDataKey } from '../util/ChartUtils';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import { _isFn } from '../util/FnUtils';

export const DF_AXIS_PROPS = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  hide: false,
  mirror: false,
  tickCount: 5,
  scale: 'auto',
  reversed: false
};

export const isNeedClip = ({
 xAxis,
 yAxis
}) => (xAxis && xAxis.allowDataOverflow)
  || (yAxis && yAxis.allowDataOverflow);

export const crClipPathIdIf = (
  props
) => ifOverflowMatches(props, 'hidden')
  ? `url(#${props.clipPathId})`
  : void 0

export const fCreateElement = (
  crElement
) => (
  option,
  props,
  value
) => isValidElement(option)
  ? cloneElement(option, props)
  : _isFn(option)
     ? option(props)
     : crElement(props, option, value)

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
