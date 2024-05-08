import crCn from '../../zhn-utils/crCn';

import { filterProps } from '../util/ReactUtils';
import { CL_RECHARTS_LAYER } from '../CL';

export const Layer = ({
  refEl,
  children,
  className,
  ...restProps
}) => (
  <g
    className={crCn(CL_RECHARTS_LAYER, className)}
    {...filterProps(restProps, true)}
    ref={refEl}
  >
    {children}
  </g>
);
