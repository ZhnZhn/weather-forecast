import { useReducer } from '../uiApi';

const _reducer = () => ({});
const useForceUpdate = () => useReducer(_reducer)[1];

export default useForceUpdate
