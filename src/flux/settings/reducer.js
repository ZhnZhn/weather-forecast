
import { ACTION } from './actions'

const INIT_STATE = {
  isApiKey: false  
};

const reducer = function(state=INIT_STATE, action){
  switch(action.type){
    case ACTION.SETTINGS_SET_APIKEY: {
      state.isApiKey = true
      return { ...state };
    }
    default: return state;
  }
}

export const isApiKey = (state) => state.isApiKey

export default reducer
