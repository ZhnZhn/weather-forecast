import {
  useSelector,
  useCallback
} from '../uiApi';

const useLayoutButton = (
  storeKey,
  onClick
) => {
  const _layoutSelector = useCallback(
    state => state.layout[storeKey],
    [storeKey]
  );
  return [
    useSelector(_layoutSelector),
    useCallback(() => {
       onClick(storeKey)
    }, [storeKey, onClick])
  ];
}

export default useLayoutButton
