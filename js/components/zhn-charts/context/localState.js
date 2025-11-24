"use strict";

exports.__esModule = true;
exports.useLocalStateTuple = void 0;
var _uiApi = require("../../uiApi");
const crLocalState = initialValue => {
  const subscribers = new Set();
  let state = initialValue;
  const notifySubscribers = () => {
      subscribers.forEach(subscriber => subscriber(state));
    },
    setState = nextState => {
      state = Object.assign({}, state, nextState);
      notifySubscribers();
    },
    subscribe = callback => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    };
  return {
    getState: () => state,
    setState,
    subscribe
  };
};
const fUseLocalState = localState => () => {
  const [state, setState] = (0, _uiApi.useState)(localState.getState);
  (0, _uiApi.useEffect)(() => localState.subscribe(nextState => setState(nextState)), []);
  return state;
};
const useLocalStateTuple = initialValue => {
  const localState = crLocalState(initialValue),
    useLocalState = fUseLocalState(localState),
    refLocalState = (0, _uiApi.useRef)([useLocalState, localState.setState]);
  return (0, _uiApi.getRefValue)(refLocalState);
};
exports.useLocalStateTuple = useLocalStateTuple;
//# sourceMappingURL=localState.js.map