import { ACTION as M } from '../modal/actions';
import { ACTION } from './actions';


const INIT_STATE = {
  themeName: 'GREY',
  isPopupForecast: true,
  isSettings: false,
  isPushMenu: false
};

const reducer = function(state=INIT_STATE, action){
  switch(action.type){
    case M.MODAL_SHOW:
      return action.id === 'SETTINGS'
        ? { ...state, ...{ isSettings: true }}
        : state;          
    case ACTION.TOGGLE_LAYOUT : {
      const { key } = action;
      state[key] = !state[key]
      return { ...state };
    }
    case ACTION.SET_THEME_NAME : {
      state.themeName = action.themeName
      return { ...state };
    }
    default: return state;
  }
}

export default reducer
