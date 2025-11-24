import {
  useRef,
  getRefValue,
  useState,
  useEffect
} from '../../uiApi';

const crLocalState = (initialValue) => {
  const subscribers = new Set();
  let state = initialValue;

  const notifySubscribers = () => {
    subscribers.forEach((subscriber) => subscriber(state));
  }
  , setState = (nextState) => {
      state = { ...state, ...nextState };
      notifySubscribers();
  }
  , subscribe = (callback) => {
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
  const [
    state,
    setState
  ] = useState(localState.getState);

  useEffect(() => localState
    .subscribe((nextState) => setState(nextState)),
    []
  );

  return state;
};

export const useLocalStateTuple = (
  initialValue
) => {
  const localState = crLocalState(initialValue)
  , useLocalState = fUseLocalState(localState)
  , refLocalState = useRef([
    useLocalState,
    localState.setState
  ]);
  return getRefValue(refLocalState);
}
