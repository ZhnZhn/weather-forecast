
import { ACTION } from './actions'

const INIT_STATE = {
  id: undefined
};

const reducer = function(state=INIT_STATE, action) {
  switch(action.type){
    case ACTION.MODAL_SHOW: {
      const { id, errMsg } = action;
      state.id = id
      state.errMsg = errMsg
      return { ...state };
    }
    default:
       return state;
  }
}

export const errMsg = (state) => state.errMsg

export default reducer
