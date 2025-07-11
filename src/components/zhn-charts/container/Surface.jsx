import { crCn } from '../../styleFn';
import { filterProps } from '../util/ReactUtils';

import { CL_RECHARTS_SURFACE } from '../CL';

const _crViewBox = ({
  x,
  y,
  width,
  height
}) => `${x} ${y} ${width} ${height}`;

export const Surface = (
  props
) => {
  const {
    children,
    width,
    height,
    viewBox,
    className,
    style,
    ...restProps
  } = props
  , svgView = viewBox
     || { x: 0, y: 0, width, height };
  return (
    <svg
      {...filterProps(restProps, true, 'svg')}
      className={crCn(CL_RECHARTS_SURFACE, className)}
      width={width}
      height={height}
      style={style}
      viewBox={_crViewBox(svgView)}
    >
      <title>{props.title}</title>
      <desc>{props.desc}</desc>
      {children}
    </svg>
  );
}
