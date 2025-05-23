import {
  isValidElement,
  cloneUiElement
} from '../../uiApi';

import { getValueByDataKey } from '../util/ChartUtils';
import { ifOverflowMatches } from '../util/IfOverflowMatches';
import {
  _isArr,
  _isFn
} from '../util/FnUtils';

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

export const isHideOrNoData = (
  { hide },
  data
) => hide || !data || !data.length

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
  ? cloneUiElement(option, props)
  : _isFn(option)
     ? option(props)
     : crElement(props, option, value)

export const dataPointFormatter = (
  dataPoint,
  dataKey
) => ({
   x: dataPoint.x,
   y: dataPoint.y,
   value: _isArr(dataPoint.value)
    ? dataPoint.value[1]
    : dataPoint.value,
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
