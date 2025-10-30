"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _BtSvgClose = _interopRequireDefault(require("../zhn/BtSvgClose"));
var _Label = require("./Label.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
    position: 'relative'
  },
  S_BT_CLOSE = {
    position: 'absolute',
    top: -2,
    right: 2
  },
  COLOR_BT_CLOSE = '#8bc34a';
const TooltipContent = _ref => {
  let {
    caption,
    onClose,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Label.S_TOOLTIP,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_CAPTION,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _Label.S_DAY,
        children: caption
      }), onClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgClose.default, {
        style: S_BT_CLOSE,
        color: COLOR_BT_CLOSE,
        onClose: (0, _uiApi.fStopDefaultFor)(onClose)
      })]
    }), children]
  });
};
var _default = exports.default = TooltipContent;
//# sourceMappingURL=TooltipContent.js.map