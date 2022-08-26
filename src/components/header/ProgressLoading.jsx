import { useSelector } from '../uiApi';

import { sApp } from '../../flux/selectors';
import { FETCH } from '../../flux/fetching/constants';
import ProgressLine from '../zhn-atoms/ProgressLine';

const COLOR_LOADING = '#2f7ed8'
, COLOR_FAILED = '#ed5813'
, _getDerivedState = fetching => {
    switch(fetching){
      case FETCH.LOADING:
        return [35, COLOR_LOADING];
      case FETCH.SUCCESS:
        return [100, COLOR_LOADING];
      case FETCH.FAILED:
        return [100, COLOR_FAILED];
      default:
        return [0, COLOR_LOADING];
    }
};

const ProgressLoading = () => {
  const fetching = useSelector(sApp.fetching)
  , [completed, color] = _getDerivedState(fetching);

  return (
    <ProgressLine
       height={3}
       color={color}
       completed={completed}
    />
  );
};

export default ProgressLoading
