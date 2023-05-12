import classNames from 'classnames';
import { forwardRef } from '../../uiApi';

import { filterProps } from '../util/ReactUtils';

const CL_RECHARTS_LAYER = 'recharts-layer';

export const Layer = forwardRef((props, ref) => {
  const {
    children,
    className,
    ...restProps
  } = props
  , layerClass = classNames(
     CL_RECHARTS_LAYER,
     className
   );
  return (
   <g
      className={layerClass}
      {...filterProps(restProps, true)}
      ref={ref}
    >
      {children}
   </g>);
});
