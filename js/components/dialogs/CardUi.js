'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../zhn-m-input/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _RaisedButton = require('../zhn-atoms/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


var S = {
  SELECT: {
    ROOT: {
      width: '280px'
    }
  }
};

var DF_THEME = { caption: 'Grey', value: 'GREY' };
var _themeOptions = [{ caption: 'Grey', value: 'GREY' }, { caption: 'Sand', value: 'SAND' }, { caption: 'White', value: 'WHITE' }];

var CardUi = function (_Component) {
  _inherits(CardUi, _Component);

  function CardUi() {
    _classCallCheck(this, CardUi);

    return _possibleConstructorReturn(this, (CardUi.__proto__ || Object.getPrototypeOf(CardUi)).apply(this, arguments));
  }

  _createClass(CardUi, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          buttonsStyle = _props.buttonsStyle,
          onSetTheme = _props.onSetTheme,
          onClose = _props.onClose;

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(_InputSelect2.default, {
          styleConfig: S.SELECT,
          caption: 'Theme (Default: Grey)',
          initItem: DF_THEME,
          options: _themeOptions,
          onSelect: onSetTheme
        }),
        _react2.default.createElement(
          'div',
          { style: buttonsStyle },
          _react2.default.createElement(_RaisedButton2.default, {
            isPrimary: true,
            caption: 'Close',
            onClick: onClose
          })
        )
      );
    }
  }]);

  return CardUi;
}(Component);

exports.default = CardUi;
//# sourceMappingURL=CardUi.js.map