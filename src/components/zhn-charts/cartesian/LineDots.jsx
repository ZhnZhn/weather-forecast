import { crCn } from '../../styleFn';

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
  } = props;
  return (
    <Layer
       className={CL_LINE_DOTS}
       key="dots"
       {...clipPathProps}
       role="img"
    >
      {points.map((entry, i) => _renderDotItem(dot, {
         key: `dot-${i}`,
         r: dot.r || 3,

         fill: dot.fill || props.fill,
         stroke: dot.stroke || props.stroke,
         strokeWidth: dot.strokeWidth || props.strokeWidth,
         strokeDasharray: dot.strokeDasharray || props.strokeDasharray,
         radius: props.radius,
         width: props.width,
         height: props.height,
         
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
