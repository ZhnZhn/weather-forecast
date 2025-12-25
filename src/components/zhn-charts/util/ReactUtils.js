import {
  isArr,
  isNumber,
  isStr,
  isFn
} from '../../../utils/isTypeFn';

import {
  isValidElement,
  cloneUiElement,
  Fragment,
  Children
} from '../../uiApi';

export const fCreateElement = (
  crElement
) => (
  option,
  props,
  value
) => isValidElement(option)
  ? cloneUiElement(option, props)
  : isFn(option)
  ? option(props)
  : crElement(props, option, value)

const _getElementType = (
  element
) => {
  const _elementType = element && element.type;
  return _elementType
   ? _elementType.displayName || _elementType.name
   : void 0
};

const _isFragment = (
  object
) => isValidElement(object)
  && object.type === Fragment;

/**
 * Get the display name of a component
 * @param  {Object} Comp Specified Component
 * @return {String}      Display name of Component
 */
export const getDisplayName = (
  Comp
) => isStr(Comp)
  ? Comp
  : Comp
      ? Comp.displayName || Comp.name || 'Component'
      : ''

// `toArray` gets called multiple times during the render
// so we can memoize last invocation (since reference to `children` is the same)
let lastChildren = null;
let lastResult = null;
export const _toArray = (
  children
) => {
  if (children === lastChildren && isArr(lastResult)) {
    return lastResult;
  }
  let result = [];
  Children.forEach(children, child => {
    if (child == null)
      return;
    if (_isFragment(child)) {
      result = result.concat(_toArray(child.props.children));
    } else {
      result.push(child);
    }
  });
  lastResult = result;
  lastChildren = children;
  return result;
};

/*
 * Find and return all matched children by type.
 * `type` must be a React.ComponentType
 */
export function findAllByType(children, type) {
  const result = []
  , types = isArr(type)
     ? type.map(t => getDisplayName(t))
     : [getDisplayName(type)];

  _toArray(children).forEach(child => {
    const childType = _getElementType(child);
    if (types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });
  return result;
}

/*
 * Return the first matched child by type, return null otherwise.
 * `type` must be a React.ComponentType
 */
export function findChildByType(children, type) {
  const result = findAllByType(children, type);
  return result && result[0];
}

export const validateWidthHeight = (
  width,
  height
) => isNumber(width)
  && isNumber(height)
  && width > 0
  && height > 0


export const renderByMap = (
  children,
  handlerOptions,
  renderMap,
) => {
  const elements = []
  , record = {};
  _toArray(children).forEach((child, index) => {
    if (child) {
       const displayName = getDisplayName(child.type)
       , {
         handler,
         once
       } = renderMap[displayName] || {};
       if (handler && (!once || !record[displayName])) {
         const results = handler({
           ...handlerOptions,
           element: child,
           displayName,
           index
         });
         elements.push(results);
         record[displayName] = true;
       }
    }
  });
  return elements;
};

export const parseChildIndex = (
  child,
  children
) => _toArray(children).indexOf(child);
