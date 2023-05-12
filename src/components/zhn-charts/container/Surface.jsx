import classNames from 'classnames';

import { filterProps } from '../util/ReactUtils';

const CL_RECHARTS_SURFACE = 'recharts-surface';

const _crViewBox = (
  svgView
) => `${svgView.x} ${svgView.y} ${svgView.width} ${svgView.height}`;

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
  , svgView = viewBox || { width, height, x: 0, y: 0 }
  , layerClass = classNames(CL_RECHARTS_SURFACE, className);
  return (
    <svg
      {...filterProps(restProps, true, 'svg')}
      className={layerClass}
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
