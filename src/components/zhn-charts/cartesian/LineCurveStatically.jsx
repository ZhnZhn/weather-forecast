import { filterProps } from '../util/ReactUtils';

import { Curve } from '../shape/Curve';
import { CL_LINE_CURVE } from '../CL';

export const LineCurveStatically = ({
  points,
  clipPathProps,
  props,
  refPath,
  options
}) => {
  /*eslint-disable no-unused-vars*/
   const {
     type,
     layout,
     connectNulls,
     ref,
     key,
     ...restProps
   } = props;
   //ref
   /*eslint-enable no-unused-vars*/
   const curveProps = {
     ...filterProps(restProps, true),
     fill: 'none',
     className: CL_LINE_CURVE,
     ...clipPathProps,
     points,
     ...options,
     type,
     layout,
     connectNulls
   };
   return (
     <Curve
       key={key}
       {...curveProps}
       pathRef={refPath}
     />
   );
}
