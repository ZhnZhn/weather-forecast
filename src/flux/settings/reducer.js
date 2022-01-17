
import {
  ACTION_SETTINGS_SET_APIKEY,
  ACTION_SETTINGS_SET_AIR
} from './actions';

const INITIAL_STATE = {
  isApiKey: false,
  isAir: false
};

const reducer = function(state=INITIAL_STATE, action){
  switch(action.type){
    case ACTION_SETTINGS_SET_APIKEY: {
      return {
        ...state,
        isApiKey: true
      };
    }
    case ACTION_SETTINGS_SET_AIR: {
      return {
        ...state,
        isAir: action.is
      };
    }
    default: return state;
  }
}

export const isApiKey = (state) => state.isApiKey
export const isAir = (state) => state.isAir

export default reducer
