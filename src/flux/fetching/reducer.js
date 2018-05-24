import { ACTION as P } from '../place/actions';
import { ACTION as F } from '../forecast/actions';
import { ACTION as H } from '../hourly/actions';
import { ACTION as U } from '../uv/actions';
import { ACTION as M } from '../modal/actions';

import { FETCH } from './constants';

const reducer = function(state='', action){
  switch(action.type){
    case M.MODAL_SHOW :
      return action.id === 'ERROR'
        ? FETCH.FAILED
        : state;

    case P.PLACE_REQUESTED :
    case F.FORECAST_REQUESTED :
    case H.HOURLY_REQUESTED :
    case U.UV_REQUESTED :
      return FETCH.LOADING;

    case P.PLACE_REQUESTED_OK :
    case F.FORECAST_REQUESTED_OK :
    case F.FORECAST_REQUESTED_INCACHE :
    case H.HOURLY_REQUESTED_OK :
    case H.HOURLY_REQUESTED_INCACHE :
    case U.UV_REQUESTED_OK :
    case U.UV_REQUESTED_INCACHE :
      return FETCH.SUCCESS;

    default: return state;
  }
}

export default reducer
