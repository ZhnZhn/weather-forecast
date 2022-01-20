"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _useForceUpdate = _interopRequireDefault(require("../hooks/useForceUpdate"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
var CL_SHOWING = 'show-popup',
    CL_HIDING = 'hide-popup',
    S_SHOW = {
  display: 'block'
},
    S_HIDE = {
  display: 'none'
},
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
  "float": 'right',
  margin: '8px 4px 10px 0',
  cursor: 'default'
};

var DialogCaption = function DialogCaption(_ref) {
  var caption = _ref.caption,
      captionStyle = _ref.captionStyle,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_CAPTON_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: captionStyle,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose["default"], {
      onClose: onClose
    })]
  });
};

var CommandButtons = function CommandButtons(_ref2) {
  var style = _ref2.style,
      buttons = _ref2.buttons,
      withoutClose = _ref2.withoutClose,
      onClose = _ref2.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S_COMMAND_DIV, style),
    children: [buttons, !withoutClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton["default"], {
      isPrimary: true,
      caption: "Close",
      onClick: onClose
    })]
  });
};

var _getCurrent = function _getCurrent(ref) {
  return ref.current;
},
    _setCurrent = function _setCurrent(ref, value) {
  ref.current = value;
},
    _hClickDialog = function _hClickDialog(event) {
  event.stopPropagation();
};

var ModalDialog = function ModalDialog(_ref3) {
  var isShow = _ref3.isShow,
      style = _ref3.style,
      caption = _ref3.caption,
      captionStyle = _ref3.captionStyle,
      _ref3$isWithButton = _ref3.isWithButton,
      isWithButton = _ref3$isWithButton === void 0 ? true : _ref3$isWithButton,
      withoutClose = _ref3.withoutClose,
      commandButtons = _ref3.commandButtons,
      commandStyle = _ref3.commandStyle,
      _ref3$timeout = _ref3.timeout,
      timeout = _ref3$timeout === void 0 ? 450 : _ref3$timeout,
      childrenStyle = _ref3.childrenStyle,
      children = _ref3.children,
      onClose = _ref3.onClose;

  var _refClosing = (0, _uiApi.useRef)(false),
      forceUpdate = (0, _useForceUpdate["default"])();

  (0, _uiApi.useEffect)(function () {
    if (_getCurrent(_refClosing)) {
      setTimeout(forceUpdate, timeout);
    }
  });

  var _className, _style;

  if (_getCurrent(_refClosing)) {
    _style = S_HIDE;

    _setCurrent(_refClosing, false);
  } else {
    _className = isShow ? CL_SHOWING : CL_HIDING;
    _style = isShow ? S_SHOW : S_HIDE_POPUP;

    if (!isShow) {
      _setCurrent(_refClosing, true);
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _className,
    style: (0, _extends2["default"])({}, S_ROOT_DIV, style, _style),
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


var _default = ModalDialog;
exports["default"] = _default;
//# sourceMappingURL=ModalDialog.js.map