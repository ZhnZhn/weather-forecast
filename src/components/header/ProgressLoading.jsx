import React from '../_react'
import { useSelector } from 'react-redux'

import { FETCH } from '../../flux/fetching/constants';
import ProgressLine from '../zhn-atoms/ProgressLine';

const COLOR = {
  LOADING : '#2f7ed8',
  FAILED : '#ed5813'
};

const _getDerivedState = fetching => {
  switch(fetching){
    case FETCH.LOADING:
      return [ 35, COLOR.LOADING ];
    case FETCH.SUCCESS:
      return  [ 100, COLOR.LOADING ];
    case FETCH.FAILED:
      return [ 100, COLOR.FAILED ];
    default:
      return [ 0, COLOR.LOADING ];
  }
};

const ProgressLoading = () => {
  const fetching = useSelector(state => state.fetching)
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
