"use strict";

exports.__esModule = true;
exports.findAllByType = findAllByType;
exports.findChildByType = findChildByType;
exports.validateWidthHeight = exports.toArray = exports.renderByMap = exports.parseChildIndex = exports.getDisplayName = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
const _getElementType = element => {
  const _elementType = element && element.type;
  return _elementType ? _elementType.displayName || _elementType.name : void 0;
};
const REACT_ELEMENT_TYPE = Symbol.for('react.element'),
  REACT_FRAGMENT_TYPE = Symbol.for('react.fragment'),
  typeOf = object => typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE ? object.type : void 0,
  isFragment = object => typeOf(object) === REACT_FRAGMENT_TYPE;

/**
 * Get the display name of a component
 * @param  {Object} Comp Specified Component
 * @return {String}      Display name of Component
 */
const getDisplayName = Comp => (0, _isTypeFn.isStr)(Comp) ? Comp : Comp ? Comp.displayName || Comp.name || 'Component' : '';

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
const validateWidthHeight = (width, height) => (0, _isTypeFn.isNumber)(width) && (0, _isTypeFn.isNumber)(height) && width > 0 && height > 0;
exports.validateWidthHeight = validateWidthHeight;
const renderByMap = (children, handlerOptions, renderMap) => {
  const elements = [],
    record = {};
  toArray(children).forEach((child, index) => {
    if (child) {
      const displayName = getDisplayName(child.type),
        {
          handler,
          once
        } = renderMap[displayName] || {};
      if (handler && (!once || !record[displayName])) {
        const results = handler(Object.assign({}, handlerOptions, {
          element: child,
          displayName,
          index
        }));
        elements.push(results);
        record[displayName] = true;
      }
    }
  });
  return elements;
};
exports.renderByMap = renderByMap;
const parseChildIndex = (child, children) => toArray(children).indexOf(child);
exports.parseChildIndex = parseChildIndex;
//# sourceMappingURL=ReactUtils.js.map