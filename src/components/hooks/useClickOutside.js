import {
  useRef,
  useCallback,
  useEffect,
  getRefValue,
  setRefValue
} from '../uiApi';

const _removeClickListener = (
  listener,
  ref
) => {
  if (getRefValue(ref)) {
    document.removeEventListener('click', listener, !0);
    setRefValue(ref, null)
  }
};

const FN_NOOP = () => {};

const useClickOutside = (
  isShow,
  onClickOutside=FN_NOOP
) => {
  const _ref = useRef(null)
  , _refIs = useRef(null)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClickOutside = useCallback(evt => {
      const _el = getRefValue(_ref);
      if ( _el && _el.contains
        && !_el.contains(evt.target)
      ){
        evt.stopPropagation()
        onClickOutside(evt)
      }
  }, [])
  // onClickOutside
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (isShow && !getRefValue(_refIs)) {
      document.addEventListener('click', _hClickOutside, !0)
      setRefValue(_refIs, !0)
    } else if (!isShow) {
      _removeClickListener(_hClickOutside, _refIs)
    }
  })

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    return () => _removeClickListener(_hClickOutside, _refIs);
  }, [])
  // _hClickOutside
  /*eslint-enable react-hooks/exhaustive-deps */

  return _ref;
};

export default useClickOutside
