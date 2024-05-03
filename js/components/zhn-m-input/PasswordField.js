"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _useRerender = _interopRequireDefault(require("../hooks/useRerender"));
var _has = require("../has");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SELECT = 'm-select',
  CL_LABEL = CL_SELECT + "__label",
  M_TEXTFIELD = 'm-textfield',
  CL_DIV = M_TEXTFIELD + "-input__div",
  CL_INPUT = M_TEXTFIELD + "-input",
  CL_BT_CLEAR = M_TEXTFIELD + "__bt-clear",
  M_INPUT = 'm-input',
  CL_INPUT_LINE = M_INPUT + "__line",
  CL_INPUT_MSG_ERR = M_INPUT + "__msg-err",
  S_LABEL_TO_INPUT = {
    transform: 'scale(1) translate(0px, -6px)'
  },
  S_LABEL_ON_ERROR = {
    color: '#f44336'
  },
  S_LINE_ERROR = {
    borderBottom: '2px solid #f44336'
  },
  S_LINE_AFTER_ENTER = {
    borderBottom: '2px solid #80c040'
  };
const _crId = name => name + '_' + Math.random().toString(36).substr(2, 6);
const _isValue = input => input ? !!input.value : false;
const FN_NOOP = () => {};
const FN_TRUE = () => true;
const PasswordField = _ref => {
  let {
    refEl,
    style,
    caption,
    name = 'pwd',
    maxLength = "32",
    errorMsg = '',
    onTest = FN_TRUE,
    onEnter = FN_NOOP
  } = _ref;
  const _id = (0, _useRefInit.default)(() => _crId(name)),
    _refInput = (0, _uiApi.useRef)(),
    [setWasEnter, getWasEnter] = (0, _useProperty.default)(false),
    [setIsFocus, getIsFocus] = (0, _useProperty.default)(false),
    [state, setState] = (0, _uiApi.useState)({
      value: ''
    }),
    {
      value
    } = state,
    rerender = (0, _useRerender.default)(),
    _hFocusInput = () => {
      setIsFocus(true);
      rerender();
    },
    _hBlurInput = () => {
      setIsFocus(false);
      rerender();
    },
    _hInputChange = event => {
      setState({
        value: event.target.value.trim()
      });
    },
    _hClear = event => {
      (0, _uiApi.stopDefaultFor)(event);
      setState({
        value: ''
      });
    },
    _hKeyDown = event => {
      if (event.keyCode === 46) {
        setState({
          value: ''
        });
      } else if (event.keyCode === 13) {
        (0, _uiApi.stopDefaultFor)(event);
        onEnter(event.target.value);
        setWasEnter(true);
        rerender();
      }
    };
  (0, _uiApi.useEffect)(() => {
    const _clearId = setTimeout(() => {
      const _input = _refInput.current;
      if (_input && _input.hasAttribute('value')) {
        _input.removeAttribute('value');
      }
    });
    return () => clearTimeout(_clearId);
  });
  (0, _uiApi.useEffect)(() => {
    if (getWasEnter()) {
      setWasEnter(false);
    }
  });
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    setWasEnter: () => {
      setWasEnter(true);
      rerender();
    },
    getValue: () => {
      const _input = _refInput.current;
      return _input && _input.value;
    },
    clear: () => {
      setWasEnter(true);
      setState({
        value: ''
      });
    }
  }));
  const _labelStyle = _isValue(_refInput.current) || getIsFocus() ? void 0 : S_LABEL_TO_INPUT,
    _isPassTest = onTest(value),
    _labelErrStyle = _isPassTest ? void 0 : S_LABEL_ON_ERROR,
    _lineStyle = _isPassTest ? getWasEnter() ? S_LINE_AFTER_ENTER : void 0 : S_LINE_ERROR;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
    className: CL_SELECT,
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      className: CL_LABEL,
      style: {
        ..._labelStyle,
        ..._labelErrStyle
      },
      htmlFor: _id,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        hidden: true,
        autoComplete: "username",
        value: name,
        readOnly: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        ref: _refInput,
        id: _id,
        type: "password",
        autoComplete: "current-password",
        className: CL_INPUT,
        maxLength: maxLength,
        value: value,
        onChange: _hInputChange,
        onKeyDown: _hKeyDown,
        onFocus: _hFocusInput,
        onBlur: _hBlurInput
      }), _has.HAS_TOUCH_EVENTS && value && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        type: "button",
        className: CL_BT_CLEAR,
        onClick: _hClear,
        children: "x"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_INPUT_LINE,
        style: _lineStyle
      }), !_isPassTest && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: CL_INPUT_MSG_ERR,
        children: errorMsg
      })]
    })]
  });
};
var _default = exports.default = PasswordField;
//# sourceMappingURL=PasswordField.js.map