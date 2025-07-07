"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useRerender = _interopRequireDefault(require("../hooks/useRerender"));
var _BtSvgClose = _interopRequireDefault(require("../zhn-atoms/BtSvgClose"));
var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const CL_SHOWING = 'show-popup',
  CL_HIDING = 'hide-popup',
  S_HIDE_POPUP = {
    opacity: 0,
    transform: 'scaleY(0)'
  },
  S_ROOT_DIV = {
    zIndex: 10,
    position: 'absolute',
    top: '15%',
    left: '40%',
    display: 'block',
    backgroundColor: '#4d4d4d',
    border: 'solid 2px #3f5178',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px'
  },
  S_CAPTON_DIV = {
    padding: 5,
    color: '#9e9e9e',
    backgroundColor: '#3f5178',
    textAlign: 'center',
    fontSize: '18px'
  },
  S_COMMAND_DIV = {
    textAlign: 'right',
    margin: '8px 4px 10px 0',
    cursor: 'default'
  };
const DialogCaption = _ref => {
  let {
    caption,
    captionStyle,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_CAPTON_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: captionStyle,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgClose.default, {
      onClose: onClose
    })]
  });
};
const CommandButtons = _ref2 => {
  let {
    style,
    buttons,
    withoutClose,
    onClose
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_COMMAND_DIV,
      ...style
    },
    children: [buttons, !withoutClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton.default, {
      isPrimary: true,
      caption: "Close",
      onClick: onClose
    })]
  });
};
const _hClickDialog = evt => {
  evt.stopPropagation();
};
const ModalDialog = _ref3 => {
  let {
    isShow,
    style,
    caption,
    captionStyle,
    isWithButton = true,
    withoutClose,
    commandButtons,
    commandStyle,
    timeout = 450,
    childrenStyle,
    children,
    onClose
  } = _ref3;
  const _refClosing = (0, _uiApi.useRef)(false),
    rerender = (0, _useRerender.default)();
  (0, _uiApi.useEffect)(() => {
    if ((0, _uiApi.getRefValue)(_refClosing)) {
      setTimeout(rerender, timeout);
    }
  });
  let _className, _style;
  if ((0, _uiApi.getRefValue)(_refClosing)) {
    _style = _styleFn.S_NONE;
    (0, _uiApi.setRefValue)(_refClosing, false);
  } else {
    _className = isShow ? CL_SHOWING : CL_HIDING;
    _style = isShow ? _styleFn.S_BLOCK : S_HIDE_POPUP;
    if (!isShow) {
      (0, _uiApi.setRefValue)(_refClosing, true);
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _className,
    style: {
      ...S_ROOT_DIV,
      ...style,
      ..._style
    },
    onClick: _hClickDialog,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DialogCaption, {
      caption: caption,
      captionStyle: captionStyle,
      onClose: onClose
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: childrenStyle,
      children: children
    }), isWithButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(CommandButtons, {
      style: commandStyle,
      buttons: commandButtons,
      withoutClose: withoutClose,
      onClose: onClose
    })]
  });
};

/*
ModalDialog.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  isWithButton: PropTypes.bool,
  withoutClose: PropTypes.bool,
  commandButtons: PropTypes.arrayOf(PropTypes.element),
  commandStyle: PropTypes.object,
  timeout: PropTypes.number,
  caption: PropTypes.string,
  childrenStyle: PropTypes.object,
  onClose: PropTypes.func
}
*/
var _default = exports.default = ModalDialog;
//# sourceMappingURL=ModalDialog.js.map