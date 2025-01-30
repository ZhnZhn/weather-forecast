import crCn from '../../zhn-utils/crCn';

import { adaptEventsOfChild } from '../util/types';
import { _isFn } from '../util/FnUtils';

import { Layer } from '../container/Layer';
import { Text } from '../component/Text';

import { fCreateElement } from './cartesianFn';
import { getClassName } from './CartesianAxisRenderFn';

import {
  CL_AXIS_TICK,
  CL_AXIS_TICK_LINE,
  CL_AXIS_TICK_VALUE
} from '../CL';

const _crTextElement = (
  props,
  option,
  value
) => (
  <Text {...props} className={CL_AXIS_TICK_VALUE}>
    {value}
  </Text>
);
const _renderTickItem = fCreateElement(_crTextElement);

export const CartesianAxisTick = ({
  props,
  entry,
  i,
  tickProps,
  tickLineProps,
  lineCoord
}) => {
  const {
    tick,
    tickLine,
    tickFormatter,
    unit
  } = props
  , _tickLineClassName = getClassName(tickLine);
  return (
    <Layer
       className={CL_AXIS_TICK}
       {...adaptEventsOfChild(props, entry, i)}
    >
      {tickLine && (
         <line
            {...tickLineProps}
            {...lineCoord}
            className={crCn(CL_AXIS_TICK_LINE, _tickLineClassName)}
         />
       )}
      {tick && _renderTickItem(tick, tickProps, `${_isFn(tickFormatter) ? tickFormatter(entry.value, i) : entry.value}${unit || ''}`)}
    </Layer>
  );
}
