import {
  memo,
  crProps
} from '../../uiApi';

import { crCn } from '../../styleFn';

import { CL_RECTANGLE } from '../CL';
import { getRectanglePath } from './RectangleFn';

const DF_PROPS = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0
}
, _isNotNumber = v => v !== +v


export const Rectangle = memo((props) => {
  const _props = crProps(DF_PROPS, props)
  , {
    x,
    y,
    width,
    height,
    radius,
    className
  } = _props

  if (_isNotNumber(x)
      || _isNotNumber(y)
      || _isNotNumber(width)
      || _isNotNumber(height)
      || width === 0
      || height === 0) {
    return null;
  }

  return (
    <path
      fill={_props.fill}
      className={crCn(CL_RECTANGLE, className)}
      d={getRectanglePath(x, y, width, height, radius)}
    />
  );
})
