export {
  useSelector,
  useStore
} from "react-redux";

export {
  findDOMNode
} from "react-dom";

export {
  isValidElement,
  Component,
  PureComponent,
  Children,
  createContext,
  createRef,
  cloneElement,
  memo,
  useRef,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useContext,
  useImperativeHandle
} from "react";

export const createElement = (
  Comp,
  {key, ...restProps}
) => (<Comp key={key} {...restProps} />)

export const cloneUiElement = (
  Element,
  overrideProps,
  key=Element.key
) => (<Element.type
  key={key}
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
