import { ACTION } from './actions';


const INIT_STATE = {
  themeName: 'GREY',
  isPopupForecast: true,
  isSettings: false,
  isPushMenu: false
};

const reducer = function(state=INIT_STATE, action){
  switch(action.type){
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
