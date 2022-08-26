export {
  useSelector,
  useStore
} from 'react-redux';

export {
  createElement,
  cloneElement,
  memo,
  forwardRef,
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useContext,
  useImperativeHandle
} from 'react';

export const getRefValue = ref => (ref || {}).current

export const setRefValue = (
  ref,
  value
) => {
  if (ref) {
    ref.current = value
  }
}
