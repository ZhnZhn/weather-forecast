
import { ACTION } from './actions'

const INIT_STATE = {
  id: undefined
};

const reducer = function(state=INIT_STATE, action) {
  switch(action.type){
    case ACTION.MODAL_SHOW:
      state.id = action.id
      return { ...state };
    default:
       return state;
  }
}

export default reducer
