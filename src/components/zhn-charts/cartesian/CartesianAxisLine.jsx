import { crCn } from '../../styleFn';

import { getClassName } from './CartesianAxisRenderFn';

const _needDimension = (
  orientation,
  value1,
  value2,
  mirror
) => +((orientation === value1 && !mirror) || (orientation === value2 && mirror));

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
  } = props;

  let _y, _x;
  const _lineProps = orientation === 'top' || orientation === 'bottom'
    ? (_y = y + height * _needDimension(orientation, 'top', 'bottom', mirror), {
        x1: x,
        y1: _y,
        x2: x + width,
        y2: _y
      })
    : (_x = x + width * _needDimension(orientation, 'left', 'right', mirror), {
        x1: _x,
        y1: y,
        x2: _x,
        y2: y + height
      });
  return (
    <line
      className={crCn(className, getClassName(axisLine))}
      stroke={(axisLine && axisLine.stroke) || props.stroke}
      fill="none"
      {..._lineProps}
    />
  );
}
