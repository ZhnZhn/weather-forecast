import {
  useSelector,
  useMemo
} from '../uiApi';

const _isArr = Array.isArray
, INITIAL_DATA = [];

const useSelectorData = (
  selector,
  transform
) => {
  const data = useSelector(selector)
  /*eslint-disable react-hooks/exhaustive-deps */
  return useMemo(() => _isArr(data)
     ? transform(data)
     : INITIAL_DATA, [data])
  // transform
  /*eslint-enable react-hooks/exhaustive-deps */
};

export default useSelectorData
