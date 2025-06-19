"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _InputSelect = _interopRequireDefault(require("../zhn-m-input/InputSelect"));
var _InputSwitch = _interopRequireDefault(require("../zhn-atoms/InputSwitch"));
var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_SELECT = {
    ROOT: {
      width: 280
    }
  },
  _themeOptions = [{
    caption: 'Grey',
    value: 'GREY'
  }, {
    caption: 'Sand',
    value: 'SAND'
  }, {
    caption: 'White',
    value: 'WHITE'
  }],
  DF_THEME = _themeOptions[0],
  CAPTION_AIR = "Air Quality",
  S_CHECK_BOX = {
    padding: '24px 24px 0 24px'
  },
  IS_AIR = !1;
const CardUi = _ref => {
  let {
    style,
    buttonsStyle,
    onSetTheme,
    onAir,
    onClose
  } = _ref;
  /*eslint-disable react-hooks/exhaustive-deps */
  const _checkAir = (0, _uiApi.useCallback)(() => {
      onAir(true);
    }, []),
    _uncheckAir = (0, _uiApi.useCallback)(() => {
      onAir(false);
    }, []);
  // onAir
  /*eslint-enable react-hooks/exhaustive-deps */
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
      styleConfig: S_SELECT,
      caption: "Theme (Default: Grey)",
      initItem: DF_THEME,
      options: _themeOptions,
      onSelect: onSetTheme
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