"use strict";

exports.__esModule = true;
exports.findAllByType = findAllByType;
exports.findChildByType = findChildByType;
exports.validateWidthHeight = exports.toArray = exports.renderByMap = exports.parseChildIndex = exports.isValidSpreadableProp = exports.isSingleChildEqual = exports.isChildrenEqual = exports.getReactEventByType = exports.getDisplayName = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _ShallowEqual = require("./ShallowEqual");
var _types = require("./types");
const _getElementType = element => {
  const _elementType = element && element.type;
  return _elementType ? _elementType.displayName || _elementType.name : void 0;
};
const REACT_ELEMENT_TYPE = Symbol.for('react.element'),
  REACT_FRAGMENT_TYPE = Symbol.for('react.fragment'),
  typeOf = object => typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE ? object.type : void 0,
  isFragment = object => typeOf(object) === REACT_FRAGMENT_TYPE;
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
const getDisplayName = Comp => typeof Comp === 'string' ? Comp : Comp ? Comp.displayName || Comp.name || 'Component' : '';

// `toArray` gets called multiple times during the render
// so we can memoize last invocation (since reference to `children` is the same)
exports.getDisplayName = getDisplayName;
let lastChildren = null;
let lastResult = null;
const toArray = children => {
  if (children === lastChildren && (0, _isTypeFn.isArr)(lastResult)) {
    return lastResult;
  }
  let result = [];
  _uiApi.Children.forEach(children, child => {
    if ((0, _isTypeFn.isNullOrUndef)(child)) return;
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
exports.toArray = toArray;
function findAllByType(children, type) {
  const result = [],
    types = (0, _isTypeFn.isArr)(type) ? type.map(t => getDisplayName(t)) : [getDisplayName(type)];
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
function findChildByType(children, type) {
  const result = findAllByType(children, type);
  return result && result[0];
}

/**
 * validate the width and height props of a chart element
 * @param  {Object} el A chart element
 * @return {Boolean}   true If the props width and height are number, and greater than 0
 */
const validateWidthHeight = el => {
  if (!el || !el.props) {
    return false;
  }
  const {
    width,
    height
  } = el.props;
  return !(0, _isTypeFn.isNumber)(width) || width <= 0 || !(0, _isTypeFn.isNumber)(height) || height <= 0 ? false : true;
};

/*
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
*/

/*
const isSvgElement = (
  child
) => child
  && isStr(child.type)
  && SVG_TAGS.indexOf(child.type) >= 0;
*/

/**
 * Checks if the property is valid to spread onto an SVG element or onto a specific component
 * @param {unknown} property property value currently being compared
 * @param {string} key property key currently being compared
 * @param {boolean} includeEvents if events are included in spreadable props
 * @param {boolean} svgElementType checks against map of SVG element types to attributes
 * @returns {boolean} is prop valid
 */
exports.validateWidthHeight = validateWidthHeight;
const isValidSpreadableProp = (property, key, includeEvents, svgElementType) => {
  /**
   * If the svg element type is explicitly included, check against the filtered element key map
   * to determine if there are attributes that should only exist on that element type.
   * @todo Add an internal cjs version of https://github.com/wooorm/svg-element-attributes for full coverage.
   */
  const matchingElementTypeKeys = _types.FilteredElementKeyMap?.[svgElementType] ?? [];
  return !!(!(0, _isTypeFn.isFn)(property) && (svgElementType && matchingElementTypeKeys.includes(key) || _types.SVGElementPropKeys.includes(key)) || includeEvents && (0, _types.isLikelyOnEventProperty)(key));
};
exports.isValidSpreadableProp = isValidSpreadableProp;
const isSingleChildEqual = (nextChild, prevChild) => {
  if (!(0, _isTypeFn.isNullOrUndef)(nextChild) && !(0, _isTypeFn.isNullOrUndef)(prevChild)) {
    const {
        children: nextChildren,
        ...nextProps
      } = nextChild.props || {},
      {
        children: prevChildren,
        ...prevProps
      } = prevChild.props || {};
    return nextChildren && prevChildren ? (0, _ShallowEqual.shallowEqual)(nextProps, prevProps) && isChildrenEqual(nextChildren, prevChildren) : !nextChildren && !prevChildren ? (0, _ShallowEqual.shallowEqual)(nextProps, prevProps) : false;
  }
  return (0, _isTypeFn.isNullOrUndef)(nextChild) && (0, _isTypeFn.isNullOrUndef)(prevChild);
};
exports.isSingleChildEqual = isSingleChildEqual;
const _getElementFromChildren = children => (0, _isTypeFn.isArr)(children) ? children[0] : children;

/**
 * Wether props of children changed
 * @param  {Object} nextChildren The latest children
 * @param  {Object} prevChildren The prev children
 * @return {Boolean}             equal or not
 */
const isChildrenEqual = (nextChildren, prevChildren) => {
  if (nextChildren === prevChildren) {
    return true;
  }
  const count = _uiApi.Children.count(nextChildren);
  if (count !== _uiApi.Children.count(prevChildren)) {
    return false;
  }
  if (count === 0) {
    return true;
  }
  if (count === 1) {
    return isSingleChildEqual(_getElementFromChildren(nextChildren), _getElementFromChildren(prevChildren));
  }
  for (let i = 0; i < count; i++) {
    const nextChild = nextChildren[i],
      prevChild = prevChildren[i];
    if (((0, _isTypeFn.isArr)(nextChild) || (0, _isTypeFn.isArr)(prevChild)) && !isChildrenEqual(nextChild, prevChild)) {
      return false;
    } else if (!isSingleChildEqual(nextChild, prevChild)) {
      return false;
    }
  }
  return true;
};
exports.isChildrenEqual = isChildrenEqual;
const renderByMap = (chartInst, renderMap) => {
  const {
      props
    } = chartInst,
    {
      children
    } = props,
    elements = [],
    record = {};
  toArray(children).forEach((child, index) => {
    //if (isSvgElement(child)) {
    //  elements.push(child);
    //} else if (child) {
    if (child) {
      const displayName = getDisplayName(child.type),
        {
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
exports.renderByMap = renderByMap;
const getReactEventByType = e => {
  const type = e && e.type;
  return (0, _isTypeFn.isStr)(type) && REACT_BROWSER_EVENT_MAP[type] || null;
};
exports.getReactEventByType = getReactEventByType;
const parseChildIndex = (child, children) => toArray(children).indexOf(child);
exports.parseChildIndex = parseChildIndex;
//# sourceMappingURL=ReactUtils.js.map