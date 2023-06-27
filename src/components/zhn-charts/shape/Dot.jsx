import { memo } from '../../uiApi';
import crCn from '../../zhn-utils/crCn';

import { adaptEventHandlers } from '../util/types';
import { filterProps } from '../util/ReactUtils';
import { CL_DOT } from '../CL';

export const Dot = memo((props) => {
  const {
    cx,
    cy,
    r,
    className
  } = props;
  
  return cx === +cx && cy === +cy && r === +r
    ? (
        <circle
          {...filterProps(props)}
          {...adaptEventHandlers(props)}
          className={crCn(CL_DOT, className)}
          cx={cx} cy={cy} r={r}
        />
      )
    : null;
})
