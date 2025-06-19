import {
  isStr,
  isNumber
} from "../utils/isTypeFn";

export {
  useSelector,
  useStore
} from "react-redux";

export {
  isValidElement,
  Component,
  PureComponent,
  Children,
  createContext,
  createRef,
  memo,
  useId,
  useRef,
  useState,
  useReducer,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useLayoutEffect,
  useImperativeHandle
} from "react";

export const createElement = (
  Comp,
  {key, ...restProps}
) => (<Comp key={key} {...restProps} />)

const _isElementKey = v => isStr(v) || isNumber(v);

export const cloneUiElement = (
  Element,
  overrideProps,
  key=Element.key
) => (<Element.type
  key={_isElementKey(key) ? key : void 0}
  {...Element.props}
  {...overrideProps}
/>)

export const getRefValue = ref => (ref || {}).current

export const setRefValue = (
  ref,
  value
) => {
  if (ref) {
    ref.current = value
  }
}

export const stopDefaultFor = (evt) => {
  evt.stopPropagation()
  evt.nativeEvent.stopImmediatePropagation()
  evt.preventDefault()
}

const _getFirstTouches = (
  touches
) => (touches && touches[0]) || {};

const _getTouchClientX = (
  touches
) => _getFirstTouches(touches).clientX;

const _getTouchClientY = (
  touches
) => _getFirstTouches(touches).clientY;

export const getClientX = (
  evt
) => evt.clientX
  || _getTouchClientX(evt.targetTouches)
  || _getTouchClientX(evt.changedTouches)
  || 0;

export const getClientY = (
  evt
) => evt.clientY
  || _getTouchClientY(evt.targetTouches)
  || _getTouchClientY(evt.changedTouches)
  || 0;
