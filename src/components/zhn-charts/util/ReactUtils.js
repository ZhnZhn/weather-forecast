import {
  isNullOrUndef,
  isArr,
  isFn,
  isNumber,
  isStr,
  isBool,
  isObj
} from '../../../utils/isTypeFn';

import {
  isValidElement,
  Children
} from '../../uiApi';

import { shallowEqual } from './ShallowEqual';
import {
  FilteredElementKeyMap,
  SVGElementPropKeys,
  isLikelyOnEventProperty
} from './types';

const _getObjectKeys = Object.keys;
const _getElementType = (
  element
) => {
  const _elementType = element && element.type;
  return _elementType
   ? _elementType.displayName || _elementType.name
   : void 0
};

const REACT_ELEMENT_TYPE = Symbol.for('react.element')
, REACT_FRAGMENT_TYPE = Symbol.for('react.fragment')
, typeOf = (
  object
) => typeof object === 'object' && object !== null
  && object.$$typeof === REACT_ELEMENT_TYPE
  ? object.type
  : void 0
, isFragment = (
  object
) => typeOf(object) === REACT_FRAGMENT_TYPE;



const REACT_BROWSER_EVENT_MAP = {
  click: 'onClick',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mouseover: 'onMouseOver',
  mousemove: 'onMouseMove',
  mouseout: 'onMouseOut',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  touchcancel: 'onTouchCancel',
  touchend: 'onTouchEnd',
  touchmove: 'onTouchMove',
  touchstart: 'onTouchStart'
};

/**
 * Get the display name of a component
 * @param  {Object} Comp Specified Component
 * @return {String}      Display name of Component
 */
export const getDisplayName = (
  Comp
) => typeof Comp === 'string'
  ? Comp
  : Comp
      ? Comp.displayName || Comp.name || 'Component'
      : ''

// `toArray` gets called multiple times during the render
// so we can memoize last invocation (since reference to `children` is the same)
let lastChildren = null;
let lastResult = null;
export const toArray = (
  children
) => {
  if (children === lastChildren && isArr(lastResult)) {
    return lastResult;
  }
  let result = [];
  Children.forEach(children, child => {
    if (isNullOrUndef(child))
      return;
    if (isFragment(child)) {
      result = result.concat(toArray(child.props.children));
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

  toArray(children).forEach(child => {
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

/**
 * validate the width and height props of a chart element
 * @param  {Object} el A chart element
 * @return {Boolean}   true If the props width and height are number, and greater than 0
 */
export const validateWidthHeight = (el) => {
  if (!el || !el.props) {
    return false;
  }
  const {
    width,
    height
  } = el.props;

  return !isNumber(width)
    || width <= 0
    || !isNumber(height)
    || height <= 0
    ? false
    : true;
};

const SVG_TAGS = [
  'a',
  'altGlyph',
  'altGlyphDef',
  'altGlyphItem',
  'animate',
  'animateColor',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'color-profile',
  'cursor',
  'defs',
  'desc',
  'ellipse',
  /*
  'feBlend',
  'feColormatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  */
  'filter',
  'font',
  'font-face',
  'font-face-format',
  'font-face-name',
  'font-face-url',
  'foreignObject',
  'g',
  'glyph',
  'glyphRef',
  'hkern',
  'image',
  'line',
  'lineGradient',
  'marker',
  'mask',
  'metadata',
  'missing-glyph',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'script',
  'set',
  'stop',
  'style',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'title',
  'tref',
  'tspan',
  'use',
  'view',
  'vkern'
];

const isSvgElement = (
  child
) => child
  && isStr(child.type)
  && SVG_TAGS.indexOf(child.type) >= 0;

/**
 * Checks if the property is valid to spread onto an SVG element or onto a specific component
 * @param {unknown} property property value currently being compared
 * @param {string} key property key currently being compared
 * @param {boolean} includeEvents if events are included in spreadable props
 * @param {boolean} svgElementType checks against map of SVG element types to attributes
 * @returns {boolean} is prop valid
 */
export const isValidSpreadableProp = (
  property,
  key,
  includeEvents,
  svgElementType
) => {
  /**
   * If the svg element type is explicitly included, check against the filtered element key map
   * to determine if there are attributes that should only exist on that element type.
   * @todo Add an internal cjs version of https://github.com/wooorm/svg-element-attributes for full coverage.
   */
  const matchingElementTypeKeys = FilteredElementKeyMap?.[svgElementType] ?? [];
  return !!(( !isFn(property) && ((svgElementType && matchingElementTypeKeys.includes(key)) || SVGElementPropKeys.includes(key)) )
    || (includeEvents && isLikelyOnEventProperty(key)));
};

export const filterProps = (
  props,
  includeEvents,
  svgElementType
) => {
  if (!props || isFn(props) || isBool(props)) {
    return null;
  }
  const inputProps = isValidElement(props)
    ? props.props
    : props;
  if (!isObj(inputProps)) {
    return null;
  }
  const filteredProps = {};
  /**
   * Props are blindly spread onto SVG elements. This loop filters out properties that we don't want to spread.
   * Items filtered out are as follows:
   *   - functions in properties that are SVG attributes (functions are included when includeEvents is true)
   *   - props that are SVG attributes but don't matched the passed svgElementType
   *   - any prop that is not in SVGElementPropKeys (or in EventKeys if includeEvents is true)
   */
  _getObjectKeys(inputProps).forEach(key => {
    if (isValidSpreadableProp(inputProps[key], key, includeEvents, svgElementType)) {
      filteredProps[key] = inputProps[key];
    }
  });
  return filteredProps;
};


export const isSingleChildEqual = (
  nextChild,
  prevChild
) => {
  if (!isNullOrUndef(nextChild) && !isNullOrUndef(prevChild)) {
    const {
      children: nextChildren,
      ...nextProps
    } = nextChild.props || {}
    , {
      children: prevChildren,
      ...prevProps
    } = prevChild.props || {};
    return nextChildren && prevChildren
      ? shallowEqual(nextProps, prevProps) && isChildrenEqual(nextChildren, prevChildren)
      : !nextChildren && !prevChildren
          ? shallowEqual(nextProps, prevProps)
          : false;
  }

  return isNullOrUndef(nextChild) && isNullOrUndef(prevChild);
}

const _getElementFromChildren = (
  children
) => isArr(children)
  ? children[0]
  : children;

/**
 * Wether props of children changed
 * @param  {Object} nextChildren The latest children
 * @param  {Object} prevChildren The prev children
 * @return {Boolean}             equal or not
 */
export const isChildrenEqual = (
  nextChildren,
  prevChildren
) => {
  if (nextChildren === prevChildren) {
    return true;
  }
  const count = Children.count(nextChildren);
  if (count !== Children.count(prevChildren)) {
    return false;
  }
  if (count === 0) {
    return true;
  }
  if (count === 1) {
    return isSingleChildEqual(
      _getElementFromChildren(nextChildren),
      _getElementFromChildren(prevChildren)
    );
  }

  for (let i = 0; i < count; i++) {
    const nextChild = nextChildren[i]
    , prevChild = prevChildren[i];
    if ((isArr(nextChild) || isArr(prevChild))
       && !isChildrenEqual(nextChild, prevChild)
    ) {
      return false;
    } else if (!isSingleChildEqual(nextChild, prevChild)) {
      return false;
    }
  }

  return true;
};

export const renderByMap = (
  chartInst,
  renderMap,
) => {
  const { props } = chartInst
  , { children } = props
  , elements = []
  , record = {};
  toArray(children).forEach((child, index) => {
    if (isSvgElement(child)) {
      elements.push(child);
    } else if (child) {
       const displayName = getDisplayName(child.type)
       , {
         handler,
         once
       } = renderMap[displayName] || {};
       if (handler && (!once || !record[displayName])) {
         const results = handler({
           chartInst,
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

export const getReactEventByType = (e) => {
  const type = e && e.type;
  return (isStr(type) && REACT_BROWSER_EVENT_MAP[type])
    || null;
};

export const parseChildIndex = (
  child,
  children
) => toArray(children).indexOf(child);

export const crProps = (
  dfProps,
  props
) => ({
  ...dfProps,
  ...props
})
