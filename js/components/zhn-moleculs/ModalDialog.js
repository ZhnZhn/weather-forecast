"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _fUseKey = require("../hooks/fUseKey");
var _BtSvgClose = _interopRequireDefault(require("../zhn-atoms/BtSvgClose"));
var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const S_ROOT_DIV = {
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
    margin: '8px 4px 10px 0'
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
    isWithButton = !0,
    withoutClose,
    commandButtons,
    commandStyle,
    timeout = 450,
    childrenStyle,
    children,
    onClose
  } = _ref3;
  const _hKeyDown = (0, _fUseKey.useKeyEscape)(onClose),
    [_className, _showHideStyle] = (0, _styleFn.crShowHide)(isShow);
  return /*#__PURE__*/ /*eslint-disable jsx-a11y/no-static-element-interactions*/(0, _jsxRuntime.jsxs)("div", {
    ...(0, _a11yFn.crDialogRole)(isShow, caption),
    "aria-modal": "true",
    className: _className,
    style: {
      ...S_ROOT_DIV,
      ...style,
      ..._showHideStyle
    }
    //style={{...S_ROOT_DIV, ...style, ..._style}}
    ,
    onClick: _hClickDialog,
    onKeyDown: _hKeyDown,
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