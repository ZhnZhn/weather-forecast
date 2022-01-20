import { useRef, useCallback, useEffect } from '../uiApi';

const _removeClickListener = (listener, ref) => {
  if (ref.current) {
   document.removeEventListener('click', listener, true);
   ref.current = null
  }
};

const ModalPane = ({
  isShow,
  style,
  onClose,
  children,
}) => {
  const _refNode = useRef(null)
  , _refIs = useRef(null)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClickOutside = useCallback(event => {
      if (_refNode?.current?.contains
          && !_refNode.current.contains(event.target)
      ){
        event.stopPropagation()
        onClose(event)
      }
  }, []);
  // onClose
  useEffect(() => {
    if (isShow && !_refIs.current) {
      document.addEventListener('click', _hClickOutside, true)
      _refIs.current = true
    } else if (!isShow) {
      _removeClickListener(_hClickOutside, _refIs)
    }
  })
  useEffect(() => {
    return () => _removeClickListener(_hClickOutside, _refIs)
  }, [])
  // _hClickOutside
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div
       ref={_refNode}
       style={style}
    >
      {children}
    </div>
  );
};

export default ModalPane
