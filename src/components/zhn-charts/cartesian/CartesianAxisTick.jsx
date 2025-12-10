import { isFn } from '../../../utils/isTypeFn';
import { crCn } from '../../styleFn';

import { adaptEventsOfChild } from '../util/types';

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
  } = props;

  return (
    <Layer
       className={CL_AXIS_TICK}
       {...adaptEventsOfChild(props, entry, i)}
    >
      {tickLine && (
         <line
            {...tickLineProps}
            {...lineCoord}
            className={crCn(CL_AXIS_TICK_LINE, getClassName(tickLine))}
         />
       )}
      {tick && _renderTickItem(
         tick,
         tickProps,
         `${isFn(tickFormatter) ? tickFormatter(entry.value, i) : entry.value}${unit || ''}`
       )}
    </Layer>
  );
}
