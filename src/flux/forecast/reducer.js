import { ACTION } from './actions';

const reducer = (state={}, action={}) => {
   switch(action.type){
     case ACTION.FORECAST_REQUESTED_OK:{
       state.recent = action.id;
       state[action.id] = action.forecast;
       return { ...state };
     }
     case ACTION.FORECAST_REQUESTED_INCACHE:{
       state.recent = action.id;
       return { ...state };
     }
     default: return state;
   }
}

export const byId = (state, id) => state[id]
export const recent = (state) => state.recent
export const listById = (state, id) => state[id].list
export const cityCoordById = (state, id) => state[id].city.coord

export default reducer
