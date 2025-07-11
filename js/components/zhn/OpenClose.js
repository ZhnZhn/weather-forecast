"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _Color = require("../styles/Color");
var _Svg = require("./Svg");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SHOW_POPUP = 'show-popup',
  CL_SELECT_NONE = 'select-none',
  DF_OPEN_COLOR = _Color.COLOR_YELLOW,
  DF_CLOSE_COLOR = _Color.COLOR_BLANK,
  S_ROOT_DIV = {
    lineHeight: 2
  },
  S_ROOT_SVG = {
    display: 'inline-block',
    width: 16,
    height: 16,
    marginLeft: 8
  },
  S_CAPTION = {
    paddingLeft: 4,
    verticalAlign: 'top',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  S_CURSOR = {
    cursor: 'pointer'
  },
  S_INLINE_BLOCK = {
    display: 'inline-block'
  },
  S_DIV_TOGGLE = {
    ...S_INLINE_BLOCK,
    ...S_CURSOR
  },
  PATH_OPEN = "M 2,14 L 14,14 14,2 2,14",
  PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";
const OpenClose = _ref => {
  let {
    isInitial,
    style,
    caption,
    openColor = DF_OPEN_COLOR,
    closeColor = DF_CLOSE_COLOR,
    CompAfter,
    isClickableCompAfter,
    childStyle,
    children
  } = _ref;
  const [isOpen, toggleIsOpen] = (0, _useToggle.default)(isInitial);
  let _pathV, _fillV, _rootChildStyle, _rootChildCl;
  if (isOpen) {
    _pathV = PATH_OPEN;
    _fillV = openColor;
    _rootChildStyle = _styleFn.S_BLOCK;
    _rootChildCl = CL_SHOW_POPUP;
  } else {
    _pathV = PATH_CLOSE;
    _fillV = closeColor;
    _rootChildStyle = _styleFn.S_NONE;
    _rootChildCl = null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ...S_ROOT_DIV,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_SELECT_NONE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_DIV_TOGGLE,
        onClick: toggleIsOpen,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_ROOT_SVG,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg100, {
            w: "16",
            style: S_INLINE_BLOCK,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
              d: _pathV,
              fill: _fillV,
              strokeWidth: "1",
              stroke: openColor
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S_CAPTION,
          children: caption
        }), CompAfter && isClickableCompAfter && CompAfter]
      }), !isClickableCompAfter && CompAfter]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: _rootChildCl,
      style: {
        ...childStyle,
        ..._rootChildStyle
      },
      children: children
    })]
  });
};
var _default = exports.default = OpenClose;
//# sourceMappingURL=OpenClose.js.map