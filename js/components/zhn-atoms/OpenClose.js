"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Svg = _interopRequireDefault(require("./svg/Svg100"));

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _Color = require("../styles/Color");

var _jsxRuntime = require("react/jsx-runtime");

var CL_SHOW_POPUP = 'show-popup',
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
    S_DIV_TOGGLE = (0, _extends2["default"])({}, S_INLINE_BLOCK, S_CURSOR),
    S_BLOCK = {
  display: 'block'
},
    S_NONE = {
  display: 'none'
},
    PATH_OPEN = "M 2,14 L 14,14 14,2 2,14",
    PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

var OpenClose = function OpenClose(_ref) {
  var isInitial = _ref.isInitial,
      style = _ref.style,
      caption = _ref.caption,
      _ref$openColor = _ref.openColor,
      openColor = _ref$openColor === void 0 ? DF_OPEN_COLOR : _ref$openColor,
      _ref$closeColor = _ref.closeColor,
      closeColor = _ref$closeColor === void 0 ? DF_CLOSE_COLOR : _ref$closeColor,
      CompAfter = _ref.CompAfter,
      isClickableCompAfter = _ref.isClickableCompAfter,
      childStyle = _ref.childStyle,
      children = _ref.children;

  var _useToggle = (0, _useToggle2["default"])(isInitial),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1];

  var _pathV, _fillV, _rootChildStyle, _rootChildCl;

  if (isOpen) {
    _pathV = PATH_OPEN;
    _fillV = openColor;
    _rootChildStyle = S_BLOCK;
    _rootChildCl = CL_SHOW_POPUP;
  } else {
    _pathV = PATH_CLOSE;
    _fillV = closeColor;
    _rootChildStyle = S_NONE;
    _rootChildCl = null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S_ROOT_DIV, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_SELECT_NONE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_DIV_TOGGLE,
        onClick: toggleIsOpen,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: S_ROOT_SVG,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg["default"], {
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
      style: (0, _extends2["default"])({}, childStyle, _rootChildStyle),
      children: children
    })]
  });
};

var _default = OpenClose;
exports["default"] = _default;
//# sourceMappingURL=OpenClose.js.map