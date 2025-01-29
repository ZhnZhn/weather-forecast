import crCn from '../../zhn-utils/crCn';

import { filterProps } from '../util/ReactUtils';

import { Dot } from '../shape/Dot';
import { Layer } from '../container/Layer';

import { fCreateElement } from './cartesianFn';

import {
  CL_LINE_DOT,
  CL_LINE_DOTS
} from '../CL';

const _crDotItem = (
  { key, ...restProps },
  option
) => (
  <Dot
    key={key}
    {...restProps}
    className={crCn(
      CL_LINE_DOT,
      option && option.className
    )}
  />
);

const _renderDotItem = fCreateElement(_crDotItem);

export const LineDots = ({
  clipPathProps,
  props
}) => {
  const {
    dot,
    points,
    dataKey
  } = props
  , lineProps = filterProps(props)
  , customDotProps = filterProps(dot, true);
  return (
    <Layer
       className={CL_LINE_DOTS}
       key="dots"
       {...clipPathProps}
       role="img"
    >
      {points.map((entry, i) => _renderDotItem(dot, {
         key: `dot-${i}`,
         r: 3,
         ...lineProps,
         ...customDotProps,
         value: entry.value,
         dataKey,
         cx: entry.x,
         cy: entry.y,
         index: i,
         payload: entry.payload
      }))}
    </Layer>
  );
}
