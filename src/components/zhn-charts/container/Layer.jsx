import { crCn } from '../../styleFn';

//import { filterProps } from '../util/ReactUtils';
import { CL_RECHARTS_LAYER } from '../CL';

export const Layer = ({
  refEl,
  children,
  className,
  ...restProps
}) => (
  <g
    ref={refEl}
    className={crCn(CL_RECHARTS_LAYER, className)}
    //{...filterProps(restProps, true)}
  >
    {children}
  </g>
);
