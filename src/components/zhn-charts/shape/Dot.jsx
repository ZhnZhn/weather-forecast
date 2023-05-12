import { memo } from '../../uiApi';

import classNames from 'classnames';

import { adaptEventHandlers } from '../util/types';
import { filterProps } from '../util/ReactUtils';

const CL_DOT = "recharts-dot";

export const Dot = memo((props) => {
  const {
    cx,
    cy,
    r,
    className
  } = props
  , layerClass = classNames(CL_DOT, className);

  return cx === +cx && cy === +cy && r === +r
    ? (
        <circle
          {...filterProps(props)}
          {...adaptEventHandlers(props)}
          className={layerClass}
          cx={cx} cy={cy} r={r}
          />
      )
    : null;
})
