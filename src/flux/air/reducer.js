import { ACTION_AIR_FORECAST_REQ_OK } from './actions';

const reducer = function(state={}, action){
  switch(action.type){
    case ACTION_AIR_FORECAST_REQ_OK : {
       state.recent = action.id
       state[action.id] = action.forecast
       return { ...state };
    }
    default: return state;
  }
}

export const recent = (state) => state.recent
export const byId = (state, id) => state[id]

export default reducer
