import {
  isFn,
  isArr,
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

export const KEY_ARROW_DOWN = "ArrowDown"
export const KEY_ARROW_UP = "ArrowUp"
export const KEY_ENTER = "Enter"
export const KEY_ESCAPE = "Escape"
export const KEY_TAB = "Tab"
export const KEY_DELETE = "Delete"

export const bindTo = (
  fn,
  ...args
) => fn.bind(null, ...args);

export const safeMap = (
  items,
  crElement
) => isArr(items)
  ? items.map(crElement)
  : null

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

export const focusElementById = (
  id
) => {
  _focusHtmlElement(
    document.getElementById(id)
  )
}

const _focusHtmlElement = (
  element
) => {
  if (element && isFn(element.focus)) {
    element.focus()
  }
  return element;
}

const _getValueFromFnOrRef = (
  fnOrRef
) => isFn(fnOrRef)
  ? fnOrRef()
  : getRefValue(fnOrRef);
export const focusRefElement = (
  fnOrRef1,
  fnOrRef2
) => _focusHtmlElement(
  _getValueFromFnOrRef(fnOrRef1)
  || _getValueFromFnOrRef(fnOrRef2)
)


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
