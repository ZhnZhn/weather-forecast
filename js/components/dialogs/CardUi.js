"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _InputSelect = _interopRequireDefault(require("../zhn-m-input/InputSelect"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

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
    DF_THEME = _themeOptions[0];

var CardUi = function CardUi(_ref) {
  var style = _ref.style,
      buttonsStyle = _ref.buttonsStyle,
      onSetTheme = _ref.onSetTheme,
      onClose = _ref.onClose;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], {
    styleConfig: S_SELECT,
    caption: "Theme (Default: Grey)",
    initItem: DF_THEME,
    options: _themeOptions,
    onSelect: onSetTheme
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