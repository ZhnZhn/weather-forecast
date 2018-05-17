import { ACTION } from './actions';

const reducer = function(state = {}, action){
  switch(action.type){
    case ACTION.PLACE_REQUESTED_OK:{
       const { forecast={} } = action;
       const { id='id' } = forecast;
       state.recent = id;
       state[id] = forecast;
       return { ...state };
    }
    default: return state;
  }
};

export const recent = (state) => state.recent
export const byId = (state, id) => state[id]

export default reducer
