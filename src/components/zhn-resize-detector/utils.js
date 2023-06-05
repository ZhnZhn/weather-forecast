import _debounce from '../../utils/debounceFn';
import _throttle from '../../utils/throttleFn';

export const patchResizeCallback = (
  resizeCallback,
  refreshMode,
  refreshRate,
  refreshOptions
) => refreshMode === 'debounce'
  ? _debounce(resizeCallback, refreshRate, refreshOptions)
  : refreshMode === 'throttle'
     ? _throttle(resizeCallback, refreshRate, refreshOptions)
     : resizeCallback;

export const isFunction = (fn) => typeof fn === 'function'

export const isSSR = () => typeof window === 'undefined'

export const isDOMElement = (element) => element instanceof Element
  || element instanceof HTMLDocument
