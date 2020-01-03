"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _InputSelect = _interopRequireDefault(require("../zhn-m-input/InputSelect"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

var Component = _react["default"].Component;
var S = {
  SELECT: {
    ROOT: {
      width: '280px'
    }
  }
};
var DF_THEME = {
  caption: 'Grey',
  value: 'GREY'
};
var _themeOptions = [{
  caption: 'Grey',
  value: 'GREY'
}, {
  caption: 'Sand',
  value: 'SAND'
}, {
  caption: 'White',
  value: 'WHITE'
}];

var CardUi =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(CardUi, _Component);

  function CardUi() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = CardUi.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        buttonsStyle = _this$props.buttonsStyle,
        onSetTheme = _this$props.onSetTheme,
        onClose = _this$props.onClose;
    return _react["default"].createElement("div", {
      style: style
    }, _react["default"].createElement(_InputSelect["default"], {
      styleConfig: S.SELECT,
      caption: "Theme (Default: Grey)",
      initItem: DF_THEME,
      options: _themeOptions,
      onSelect: onSetTheme
    }), _react["default"].createElement("div", {
      style: buttonsStyle
    }, _react["default"].createElement(_RaisedButton["default"], {
      isPrimary: true,
      caption: "Close",
      onClick: onClose
    })));
  };

  return CardUi;
}(Component);

var _default = CardUi;
exports["default"] = _default;
//# sourceMappingURL=CardUi.js.map