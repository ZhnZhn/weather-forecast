import {
  useRef,
  useEffect
} from '../uiApi';

const usePrevValue = value => {
  const _refPrevValue = useRef();
  useEffect(() => {
    _refPrevValue.current = value
  })
  return _refPrevValue.current;
};

export default usePrevValue
