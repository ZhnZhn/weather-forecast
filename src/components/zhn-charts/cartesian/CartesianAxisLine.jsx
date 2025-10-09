import { crCn } from '../../styleFn';

import { getClassName } from './CartesianAxisRenderFn';

export const CartesianAxisLine = ({
  className,
  props
}) => {
  const {
    x,
    y,
    width,
    height,
    orientation,
    mirror,
    axisLine
  } = props
  , _props = {
    className: props.className,
    orientation: props.orientation,
    stroke: axisLine
      ? axisLine.stroke || props.stroke
      : props.stroke,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    
    fill: 'none'
  };
  let needHeight, needWidth;
  const _lineProps = orientation === 'top' || orientation === 'bottom'
    ? (needHeight = +((orientation === 'top' && !mirror) || (orientation === 'bottom' && mirror)), {
        x1: x,
        y1: y + needHeight * height,
        x2: x + width,
        y2: y + needHeight * height
      })
    : (needWidth = +((orientation === 'left' && !mirror) || (orientation === 'right' && mirror)), {
        x1: x + needWidth * width,
        y1: y,
        x2: x + needWidth * width,
        y2: y + height
      });
  return (
    <line
      {..._props}
      {..._lineProps}
      className={crCn(className, getClassName(axisLine))}
    />
  );
}
