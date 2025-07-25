"use strict";

exports.__esModule = true;
exports.useStore = exports.useState = exports.useSelector = exports.useRef = exports.useReducer = exports.useMemo = exports.useLayoutEffect = exports.useImperativeHandle = exports.useId = exports.useEffect = exports.useContext = exports.useCallback = exports.stopDefaultFor = exports.setRefValue = exports.safeMap = exports.memo = exports.isValidElement = exports.getRefValue = exports.getClientY = exports.getClientX = exports.focusRefElement = exports.focusElementById = exports.createRef = exports.createElement = exports.createContext = exports.cloneUiElement = exports.bindTo = exports.PureComponent = exports.KEY_TAB = exports.KEY_ESCAPE = exports.KEY_ENTER = exports.KEY_DELETE = exports.KEY_ARROW_UP = exports.KEY_ARROW_DOWN = exports.Component = exports.Children = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _jsxRuntime = require("react/jsx-runtime");
var _reactRedux = require("react-redux");
exports.useSelector = _reactRedux.useSelector;
exports.useStore = _reactRedux.useStore;
var _react = require("react");
exports.isValidElement = _react.isValidElement;
exports.Component = _react.Component;
exports.PureComponent = _react.PureComponent;
exports.Children = _react.Children;
exports.createContext = _react.createContext;
exports.createRef = _react.createRef;
exports.memo = _react.memo;
exports.useId = _react.useId;
exports.useRef = _react.useRef;
exports.useState = _react.useState;
exports.useReducer = _react.useReducer;
exports.useContext = _react.useContext;
exports.useCallback = _react.useCallback;
exports.useMemo = _react.useMemo;
exports.useEffect = _react.useEffect;
exports.useLayoutEffect = _react.useLayoutEffect;
exports.useImperativeHandle = _react.useImperativeHandle;
const KEY_ARROW_DOWN = exports.KEY_ARROW_DOWN = "ArrowDown";
const KEY_ARROW_UP = exports.KEY_ARROW_UP = "ArrowUp";
const KEY_ENTER = exports.KEY_ENTER = "Enter";
const KEY_ESCAPE = exports.KEY_ESCAPE = "Escape";
const KEY_TAB = exports.KEY_TAB = "Tab";
const KEY_DELETE = exports.KEY_DELETE = "Delete";
const bindTo = function (fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return fn.bind(null, ...args);
};
exports.bindTo = bindTo;
const safeMap = (items, crElement) => (0, _isTypeFn.isArr)(items) ? items.map(crElement) : null;
exports.safeMap = safeMap;
const createElement = (Comp, _ref) => {
  let {
    key,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
    ...restProps
  }, key);
};
exports.createElement = createElement;
const _isElementKey = v => (0, _isTypeFn.isStr)(v) || (0, _isTypeFn.isNumber)(v);
const cloneUiElement = function (Element, overrideProps, key) {
  if (key === void 0) {
    key = Element.key;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Element.type, {
    ...Element.props,
    ...overrideProps
  }, _isElementKey(key) ? key : void 0);
};
exports.cloneUiElement = cloneUiElement;
const getRefValue = ref => (ref || {}).current;
exports.getRefValue = getRefValue;
const setRefValue = (ref, value) => {
  if (ref) {
    ref.current = value;
  }
};
exports.setRefValue = setRefValue;
const focusElementById = id => {
  _focusHtmlElement(document.getElementById(id));
};
exports.focusElementById = focusElementById;
const _focusHtmlElement = element => {
  if (element && (0, _isTypeFn.isFn)(element.focus)) {
    element.focus();
  }
  return element;
};
const _getValueFromFnOrRef = fnOrRef => (0, _isTypeFn.isFn)(fnOrRef) ? fnOrRef() : getRefValue(fnOrRef);
const focusRefElement = (fnOrRef1, fnOrRef2) => _focusHtmlElement(_getValueFromFnOrRef(fnOrRef1) || _getValueFromFnOrRef(fnOrRef2));
exports.focusRefElement = focusRefElement;
const stopDefaultFor = evt => {
  evt.stopPropagation();
  evt.nativeEvent.stopImmediatePropagation();
  evt.preventDefault();
};
exports.stopDefaultFor = stopDefaultFor;
const _getFirstTouches = touches => touches && touches[0] || {};
const _getTouchClientX = touches => _getFirstTouches(touches).clientX;
const _getTouchClientY = touches => _getFirstTouches(touches).clientY;
const getClientX = evt => evt.clientX || _getTouchClientX(evt.targetTouches) || _getTouchClientX(evt.changedTouches) || 0;
exports.getClientX = getClientX;
const getClientY = evt => evt.clientY || _getTouchClientY(evt.targetTouches) || _getTouchClientY(evt.changedTouches) || 0;
exports.getClientY = getClientY;
//# sourceMappingURL=uiApi.js.map