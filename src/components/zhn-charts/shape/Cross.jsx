import classNames from 'classnames';

import { isNumber } from '../util/DataUtils';
import { filterProps } from '../util/ReactUtils';

const CL_CROSS = 'recharts-cross';

const getPath = (
  x,
  y,
  width,
  height,
  top,
  left
) => `M${x},${top}v${height}M${left},${y}h${width}`;

export const Cross = props => {
    const {
      x,
      y,
      width,
      height,
      top,
      left,
      className
    } = props;

    return (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left))
      ? null
      : (
          <path
            {...filterProps(props, true)}
            className={classNames(CL_CROSS, className)}
            d={getPath(x, y, width, height, top, left)}
          />
      );
};

Cross.defaultProps = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0
};
