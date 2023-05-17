"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.filterProps = void 0;
exports.findAllByType = findAllByType;
exports.findChildByType = findChildByType;
exports.validateWidthHeight = exports.toArray = exports.renderByMap = exports.parseChildIndex = exports.isValidSpreadableProp = exports.isSingleChildEqual = exports.isChildrenEqual = exports.getReactEventByType = exports.getDisplayName = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _uiApi = require("../../uiApi");
var _get2 = _interopRequireDefault(require("lodash/get"));
var _FnUtils = require("./FnUtils");
var _DataUtils = require("./DataUtils");
var _ShallowEqual = require("./ShallowEqual");
var _types = require("./types");
var _excluded = ["children"],
  _excluded2 = ["children"];
var _getObjectKeys = Object.keys;
var REACT_ELEMENT_TYPE = Symbol["for"]('react.element'),
  REACT_FRAGMENT_TYPE = Symbol["for"]('react.fragment'),
  typeOf = function typeOf(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE ? object.type : void 0;
  },
  isFragment = function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  };
var REACT_BROWSER_EVENT_MAP = {
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
var getDisplayName = function getDisplayName(Comp) {
  return typeof Comp === 'string' ? Comp : !Comp ? '' : Comp.displayName || Comp.name || 'Component';
};

// `toArray` gets called multiple times during the render
// so we can memoize last invocation (since reference to `children` is the same)
exports.getDisplayName = getDisplayName;
var lastChildren = null;
var lastResult = null;
var toArray = function toArray(children) {
  if (children === lastChildren && (0, _FnUtils._isArr)(lastResult)) {
    return lastResult;
  }
  var result = [];
  _uiApi.Children.forEach(children, function (child) {
    if ((0, _FnUtils._isNil)(child)) return;
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
  var result = [];
  var types = [];
  if ((0, _FnUtils._isArr)(type)) {
    types = type.map(function (t) {
      return getDisplayName(t);
    });
  } else {
    types = [getDisplayName(type)];
  }
  toArray(children).forEach(function (child) {
    var childType = (0, _get2["default"])(child, 'type.displayName') || (0, _get2["default"])(child, 'type.name');
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
  var result = findAllByType(children, type);
  return result && result[0];
}

/**
 * validate the width and height props of a chart element
 * @param  {Object} el A chart element
 * @return {Boolean}   true If the props width and height are number, and greater than 0
 */
var validateWidthHeight = function validateWidthHeight(el) {
  if (!el || !el.props) {
    return false;
  }
  var _el$props = el.props,
    width = _el$props.width,
    height = _el$props.height;
  return !(0, _DataUtils.isNumber)(width) || width <= 0 || !(0, _DataUtils.isNumber)(height) || height <= 0 ? false : true;
};
exports.validateWidthHeight = validateWidthHeight;
var SVG_TAGS = ['a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColormatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-url', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'lineGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];
var isSvgElement = function isSvgElement(child) {
  return child && child.type && (0, _FnUtils._isStr)(child.type) && SVG_TAGS.indexOf(child.type) >= 0;
};

/**
 * Checks if the property is valid to spread onto an SVG element or onto a specific component
 * @param {unknown} property property value currently being compared
 * @param {string} key property key currently being compared
 * @param {boolean} includeEvents if events are included in spreadable props
 * @param {boolean} svgElementType checks against map of SVG element types to attributes
 * @returns {boolean} is prop valid
 */
var isValidSpreadableProp = function isValidSpreadableProp(property, key, includeEvents, svgElementType) {
  var _FilteredElementKeyMa;
  /**
   * If the svg element type is explicitly included, check against the filtered element key map
   * to determine if there are attributes that should only exist on that element type.
   * @todo Add an internal cjs version of https://github.com/wooorm/svg-element-attributes for full coverage.
   */
  var matchingElementTypeKeys = (_FilteredElementKeyMa = _types.FilteredElementKeyMap == null ? void 0 : _types.FilteredElementKeyMap[svgElementType]) != null ? _FilteredElementKeyMa : [];
  return !(0, _FnUtils._isFn)(property) && (svgElementType && matchingElementTypeKeys.includes(key) || _types.SVGElementPropKeys.includes(key)) || includeEvents && _types.EventKeys.includes(key);
};
exports.isValidSpreadableProp = isValidSpreadableProp;
var filterProps = function filterProps(props, includeEvents, svgElementType) {
  if (!props || (0, _FnUtils._isFn)(props) || (0, _FnUtils._isBool)(props)) {
    return null;
  }
  var inputProps = props;
  if ((0, _uiApi.isValidElement)(props)) {
    inputProps = props.props;
  }
  if (!(0, _FnUtils._isObject)(inputProps)) {
    return null;
  }
  var out = {};
  /**
   * Props are blindly spread onto SVG elements. This loop filters out properties that we don't want to spread.
   * Items filtered out are as follows:
   *   - functions in properties that are SVG attributes (functions are included when includeEvents is true)
   *   - props that are SVG attributes but don't matched the passed svgElementType
   *   - any prop that is not in SVGElementPropKeys (or in EventKeys if includeEvents is true)
   */
  _getObjectKeys(inputProps).forEach(function (key) {
    var _inputProps;
    if (isValidSpreadableProp((_inputProps = inputProps) == null ? void 0 : _inputProps[key], key, includeEvents, svgElementType)) {
      out[key] = inputProps[key];
    }
  });
  return out;
};

/**
 * Wether props of children changed
 * @param  {Object} nextChildren The latest children
 * @param  {Object} prevChildren The prev children
 * @return {Boolean}             equal or not
 */
exports.filterProps = filterProps;
var isChildrenEqual = function isChildrenEqual(nextChildren, prevChildren) {
  if (nextChildren === prevChildren) {
    return true;
  }
  var count = _uiApi.Children.count(nextChildren);
  if (count !== _uiApi.Children.count(prevChildren)) {
    return false;
  }
  if (count === 0) {
    return true;
  }
  if (count === 1) {
    return isSingleChildEqual((0, _FnUtils._isArr)(nextChildren) ? nextChildren[0] : nextChildren, (0, _FnUtils._isArr)(prevChildren) ? prevChildren[0] : prevChildren);
  }
  for (var i = 0; i < count; i++) {
    var nextChild = nextChildren[i],
      prevChild = prevChildren[i];
    if ((0, _FnUtils._isArr)(nextChild) || (0, _FnUtils._isArr)(prevChild)) {
      if (!isChildrenEqual(nextChild, prevChild)) {
        return false;
      }
    } else if (!isSingleChildEqual(nextChild, prevChild)) {
      return false;
    }
  }
  return true;
};
exports.isChildrenEqual = isChildrenEqual;
var isSingleChildEqual = function isSingleChildEqual(nextChild, prevChild) {
  if ((0, _FnUtils._isNil)(nextChild) && (0, _FnUtils._isNil)(prevChild)) {
    return true;
  }
  if (!(0, _FnUtils._isNil)(nextChild) && !(0, _FnUtils._isNil)(prevChild)) {
    var _ref = nextChild.props || {},
      nextChildren = _ref.children,
      nextProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded),
      _ref2 = prevChild.props || {},
      prevChildren = _ref2.children,
      prevProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref2, _excluded2);
    if (nextChildren && prevChildren) {
      return (0, _ShallowEqual.shallowEqual)(nextProps, prevProps) && isChildrenEqual(nextChildren, prevChildren);
    }
    if (!nextChildren && !prevChildren) {
      return (0, _ShallowEqual.shallowEqual)(nextProps, prevProps);
    }
    return false;
  }
  return false;
};
exports.isSingleChildEqual = isSingleChildEqual;
var renderByMap = function renderByMap(chartInst, renderMap) {
  var props = chartInst.props,
    children = props.children,
    elements = [],
    record = {};
  toArray(children).forEach(function (child, index) {
    if (isSvgElement(child)) {
      elements.push(child);
    } else if (child) {
      var displayName = getDisplayName(child.type),
        _ref3 = renderMap[displayName] || {},
        handler = _ref3.handler,
        once = _ref3.once;
      if (handler && (!once || !record[displayName])) {
        var results = handler({
          chartInst: chartInst,
          element: child,
          displayName: displayName,
          index: index
        });
        elements.push(results);
        record[displayName] = true;
      }
    }
  });
  return elements;
};
exports.renderByMap = renderByMap;
var getReactEventByType = function getReactEventByType(e) {
  var type = e && e.type;
  return type && REACT_BROWSER_EVENT_MAP[type] ? REACT_BROWSER_EVENT_MAP[type] : null;
};
exports.getReactEventByType = getReactEventByType;
var parseChildIndex = function parseChildIndex(child, children) {
  return toArray(children).indexOf(child);
};
exports.parseChildIndex = parseChildIndex;
//# sourceMappingURL=ReactUtils.js.map