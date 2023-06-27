import { forwardRef } from '../../uiApi';
import crCn from '../../zhn-utils/crCn';

import { filterProps } from '../util/ReactUtils';
import { CL_RECHARTS_LAYER } from '../CL';

export const Layer = forwardRef((props, ref) => {
  const {
    children,
    className,
    ...restProps
  } = props;
  return (
   <g
      className={crCn(CL_RECHARTS_LAYER, className)}
      {...filterProps(restProps, true)}
      ref={ref}
    >
      {children}
   </g>);
});
