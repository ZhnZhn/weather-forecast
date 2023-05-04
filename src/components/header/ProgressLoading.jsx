import { useSelector } from '../uiApi';
import memoEqual from '../hoc/memoEqual';

import { sApp } from '../../flux/selectors';
import { FETCH } from '../../flux/fetching/constants';
import ProgressLine from '../zhn-atoms/ProgressLine';

const COLOR_LOADING = '#2f7ed8'
, COLOR_FAILED = '#ed5813'
, _getDerivedState = (
  fetching
) => fetching === FETCH.LOADING
  ? [35, COLOR_LOADING]
  : fetching === FETCH.SUCCESS
      ? [100, COLOR_LOADING]
      : fetching === FETCH.FAILED
          ? [100, COLOR_FAILED]
          : [0, COLOR_LOADING];

const ProgressLoading = () => {
  const fetching = useSelector(sApp.fetching)
  , [
    completed,
    color
  ] = _getDerivedState(fetching);

  return (
    <ProgressLine
       color={color}
       completed={completed}
    />
  );
};

export default memoEqual(ProgressLoading)
