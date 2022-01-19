"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _useDragable = _interopRequireDefault(require("../hooks/useDragable"));

var _handlers = _interopRequireDefault(require("../../flux/handlers"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _jsxRuntime = require("react/jsx-runtime");

var toggleLayout = _handlers["default"].toggleLayout,
    CL_SHOW_POPUP = 'show-popup',
    S_BLOCK = {
  display: 'block'
},
    S_NONE = {
  display: 'none'
},
    S_SVG_CLOSE = {
  position: 'absolute',
  top: 16,
  right: 6
};

var FlyPopup = function FlyPopup(_ref) {
  var style = _ref.style,
      storeKey = _ref.storeKey,
      children = _ref.children;

  var _refPopup = (0, _useDragable["default"])(),
      isShow = (0, _reactRedux.useSelector)(function (state) {
    return state.layout[storeKey];
  }),
      _hClose = (0, _uiApi.useCallback)(function () {
    toggleLayout(storeKey);
  }, [storeKey]),
      _className = isShow ? CL_SHOW_POPUP : void 0,
      _style = isShow ? S_BLOCK : S_NONE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: _refPopup,
    className: _className,
    style: (0, _extends2["default"])({}, style, _style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose["default"], {
      style: S_SVG_CLOSE,
      onClose: _hClose
    }), children]
  });
};

var _default = FlyPopup;
exports["default"] = _default;
//# sourceMappingURL=FlyPopup.js.map