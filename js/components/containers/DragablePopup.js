"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../uiApi");
var _useXYMovable = _interopRequireDefault(require("../hooks/useXYMovable"));
var _handlers = require("../../flux/handlers");
var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));
var _jsxRuntime = require("react/jsx-runtime");
var CL_SHOW_POPUP = 'show-popup',
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
var DragablePopup = function DragablePopup(_ref) {
  var style = _ref.style,
    storeKey = _ref.storeKey,
    children = _ref.children;
  var _refPopup = (0, _uiApi.useRef)(),
    _useMemo = (0, _uiApi.useMemo)(function () {
      return [function (state) {
        return state.layout[storeKey];
      }, function () {
        return (0, _handlers.toggleLayout)(storeKey);
      }];
    }, [storeKey]),
    _selectIsShow = _useMemo[0],
    _hClose = _useMemo[1],
    isShow = (0, _uiApi.useSelector)(_selectIsShow),
    _ref2 = isShow ? [S_BLOCK, CL_SHOW_POPUP] : [S_NONE],
    _style = _ref2[0],
    _className = _ref2[1];
  (0, _useXYMovable["default"])(_refPopup);
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
var _default = DragablePopup;
exports["default"] = _default;
//# sourceMappingURL=DragablePopup.js.map