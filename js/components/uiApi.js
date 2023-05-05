"use strict";

exports.__esModule = true;
exports.useStore = exports.useState = exports.useSelector = exports.useRef = exports.useReducer = exports.useMemo = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.stopDefaultFor = exports.setRefValue = exports.memo = exports.getRefValue = exports.getClientY = exports.getClientX = exports.forwardRef = exports.createElement = exports.createContext = exports.cloneElement = void 0;
var _reactRedux = require("react-redux");
exports.useSelector = _reactRedux.useSelector;
exports.useStore = _reactRedux.useStore;
var _react = require("react");
exports.createContext = _react.createContext;
exports.createElement = _react.createElement;
exports.cloneElement = _react.cloneElement;
exports.memo = _react.memo;
exports.forwardRef = _react.forwardRef;
exports.useRef = _react.useRef;
exports.useState = _react.useState;
exports.useReducer = _react.useReducer;
exports.useCallback = _react.useCallback;
exports.useMemo = _react.useMemo;
exports.useEffect = _react.useEffect;
exports.useContext = _react.useContext;
exports.useImperativeHandle = _react.useImperativeHandle;
var getRefValue = function getRefValue(ref) {
  return (ref || {}).current;
};
exports.getRefValue = getRefValue;
var setRefValue = function setRefValue(ref, value) {
  if (ref) {
    ref.current = value;
  }
};
exports.setRefValue = setRefValue;
var stopDefaultFor = function stopDefaultFor(evt) {
  evt.stopPropagation();
  evt.nativeEvent.stopImmediatePropagation();
  evt.preventDefault();
};
exports.stopDefaultFor = stopDefaultFor;
var _getFirstTouches = function _getFirstTouches(touches) {
  return touches && touches[0] || {};
};
var _getTouchClientX = function _getTouchClientX(touches) {
  return _getFirstTouches(touches).clientX;
};
var _getTouchClientY = function _getTouchClientY(touches) {
  return _getFirstTouches(touches).clientY;
};
var getClientX = function getClientX(evt) {
  return evt.clientX || _getTouchClientX(evt.targetTouches) || _getTouchClientX(evt.changedTouches) || 0;
};
exports.getClientX = getClientX;
var getClientY = function getClientY(evt) {
  return evt.clientY || _getTouchClientY(evt.targetTouches) || _getTouchClientY(evt.changedTouches) || 0;
};
exports.getClientY = getClientY;
//# sourceMappingURL=uiApi.js.map