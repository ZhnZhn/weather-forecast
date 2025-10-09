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
     stroke: restProps.stroke,
     strokeWidth: restProps.strokeWidth,
     strokeDasharray: restProps.strokeDasharray,
     radius: restProps.radius,
     width: restProps.width,
     height: restProps.height,
     
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
