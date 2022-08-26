"use strict";

exports.__esModule = true;
exports.useState = exports.useRef = exports.useReducer = exports.useMemo = exports.useImperativeHandle = exports.useEffect = exports.useContext = exports.useCallback = exports.setRefValue = exports.memo = exports.getRefValue = exports.forwardRef = exports.createElement = exports.cloneElement = void 0;

var _react = require("react");

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
//# sourceMappingURL=uiApi.js.map