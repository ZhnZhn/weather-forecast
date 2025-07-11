"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _uiTheme = require("../styles/uiTheme");
var _InputSelect = _interopRequireDefault(require("../zhn-m-input/InputSelect"));
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _RaisedButton = _interopRequireDefault(require("../zhn/RaisedButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_INPUT_SELECT = {
    width: 280
  },
  DF_THEME = _uiTheme.UI_THEME_OPTIONS[0],
  CAPTION_AIR = "Air Quality",
  S_CHECK_BOX = {
    padding: '24px 24px 0 24px'
  },
  IS_AIR = !1;
const CardUi = _ref => {
  let {
    style,
    buttonsStyle,
    onUiTheme,
    onAir,
    onClose
  } = _ref;
  /*eslint-disable react-hooks/exhaustive-deps */
  const _checkAir = (0, _uiApi.useCallback)(() => {
      onAir(!0);
    }, []),
    _uncheckAir = (0, _uiApi.useCallback)(() => {
      onAir(!1);
    }, []);
  // onAir
  /*eslint-enable react-hooks/exhaustive-deps */
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
      style: S_INPUT_SELECT,
      caption: "Theme (Default: Grey)",
      ariaLabel: "UI themes list",
      initItem: DF_THEME,
      options: _uiTheme.UI_THEME_OPTIONS,
      onSelect: onUiTheme
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
      style: S_CHECK_BOX,
      initialValue: IS_AIR,
      caption: CAPTION_AIR,
      onCheck: _checkAir,
      onUnCheck: _uncheckAir
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: buttonsStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RaisedButton.default, {
        isPrimary: true,
        caption: "Close",
        onClick: onClose
      })
    })]
  });
};
var _default = exports.default = CardUi;
//# sourceMappingURL=CardUi.js.map