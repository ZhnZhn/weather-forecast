"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _InputSelect = _interopRequireDefault(require("../zhn-m-input/InputSelect"));

var _RowCheckBox = _interopRequireDefault(require("./RowCheckBox"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

var useCallback = _react["default"].useCallback;
var S_SELECT = {
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
    S_CHECK_CAPTION = {
  display: 'inline'
},
    IS_AIR = false;

var CardUi = function CardUi(_ref) {
  var style = _ref.style,
      buttonsStyle = _ref.buttonsStyle,
      onSetTheme = _ref.onSetTheme,
      onAir = _ref.onAir,
      onClose = _ref.onClose;

  /*eslint-disable react-hooks/exhaustive-deps */
  var _checkAir = useCallback(function () {
    onAir(true);
  }, []),
      _uncheckAir = useCallback(function () {
    onAir(false);
  }, []); // onAir

  /*eslint-enable react-hooks/exhaustive-deps */


  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], {
    styleConfig: S_SELECT,
    caption: "Theme (Default: Grey)",
    initItem: DF_THEME,
    options: _themeOptions,
    onSelect: onSetTheme
  }), /*#__PURE__*/_react["default"].createElement(_RowCheckBox["default"], {
    style: S_CHECK_BOX,
    initValue: IS_AIR,
    caption: CAPTION_AIR,
    captionStyle: S_CHECK_CAPTION,
    onCheck: _checkAir,
    onUnCheck: _uncheckAir
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: buttonsStyle
  }, /*#__PURE__*/_react["default"].createElement(_RaisedButton["default"], {
    isPrimary: true,
    caption: "Close",
    onClick: onClose
  })));
};

var _default = CardUi;
exports["default"] = _default;
//# sourceMappingURL=CardUi.js.map