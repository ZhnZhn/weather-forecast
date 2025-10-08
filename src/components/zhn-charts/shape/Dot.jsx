import { memo } from '../../uiApi';
import { crCn } from '../../styleFn';

//import { adaptEventHandlers } from '../util/types';
import { CL_DOT } from '../CL';

export const Dot = memo((props) => {
  const {
    cx,
    cy,
    r
  } = props;
  return cx === +cx && cy === +cy && r === +r
    ? (
        <circle
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
          strokeDasharray={props.strokeDasharray}
          //{...adaptEventHandlers(props)}
          className={crCn(CL_DOT, props.className)}
          cx={cx} cy={cy} r={r}
        />
      )
    : null;
})
