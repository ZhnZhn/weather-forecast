import { ACTION as A } from './actions'

const reducer = function(state={}, action){
  switch(action.type){
    case A.UV_REQUESTED_OK: {
      state.recent = action.id
      state[action.id] = action.json
      return { ...state };
    }
    default: return state;
  }
}

export const recent = (state) => state.recent;
export const byId = (state, id) => state[id];

export default reducer
