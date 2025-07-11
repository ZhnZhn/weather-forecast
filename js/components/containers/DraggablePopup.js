"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _useXYMovable = _interopRequireDefault(require("../hooks/useXYMovable"));
var _handlers = require("../../flux/handlers");
var _BtSvgClose = _interopRequireDefault(require("../zhn/BtSvgClose"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SHOW_POPUP = 'show-popup',
  S_SVG_CLOSE = {
    position: 'absolute',
    top: 16,
    right: 12
  };
const DraggablePopup = _ref => {
  let {
    style,
    storeKey,
    color,
    children
  } = _ref;
  const _refPopup = (0, _uiApi.useRef)(),
    [_selectIsShow, _hClose] = (0, _uiApi.useMemo)(() => [state => state.layout[storeKey], () => (0, _handlers.toggleLayout)(storeKey)], [storeKey]),
    isShow = (0, _uiApi.useSelector)(_selectIsShow),
    [_style, _className] = isShow ? [_styleFn.S_BLOCK, CL_SHOW_POPUP] : [_styleFn.S_NONE];
  (0, _useXYMovable.default)(_refPopup);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: _refPopup,
    className: (0, _crCn.default)(_styleFn.CL_BG, _className),
    style: {
      ...style,
      ..._style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgClose.default, {
      color: color,
      style: S_SVG_CLOSE,
      onClose: _hClose
    }), children]
  });
};
var _default = exports.default = DraggablePopup;
//# sourceMappingURL=DraggablePopup.js.map