'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _SecretField = require('../zhn-m-input/SecretField');

var _SecretField2 = _interopRequireDefault(_SecretField);

var _RowCheckBox = require('./RowCheckBox');

var _RowCheckBox2 = _interopRequireDefault(_RowCheckBox);

var _RaisedButton = require('../zhn-atoms/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


var CAPTION_ALLOW = "Allow Remember Enter of API Key by Browser Password Manager";

var S = {
  ROOT: {
    position: 'relative',
    height: '200px'
  },
  SECRET: {
    width: '280px'
  },
  CHECK_BOX: {
    paddingLeft: '24px',
    paddingTop: '16px',
    paddingRight: '24px'
  },
  CHECK_CAPTION: {
    display: 'inline'
  },
  BUTTONS: {
    position: 'absolute',
    right: '4px',
    bottom: 0,
    cursor: 'default'
  }
};

var CardApiKey = function (_Component) {
  _inherits(CardApiKey, _Component);

  function CardApiKey(props) {
    _classCallCheck(this, CardApiKey);

    var _this = _possibleConstructorReturn(this, (CardApiKey.__proto__ || Object.getPrototypeOf(CardApiKey)).call(this, props));

    _this._checkAllow = function () {
      _this.setState({ isAllow: true });
    };

    _this._uncheckAllow = function () {
      _this.setState({ isAllow: false });
    };

    _this._refInput = function (c) {
      return _this._input = c;
    };

    _this.state = {
      isAllow: false
    };
    return _this;
  }

  _createClass(CardApiKey, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          buttonsStyle = _props.buttonsStyle,
          onClose = _props.onClose,
          onSet = _props.onSet;
      var isAllow = this.state.isAllow;

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(_SecretField2.default, {
          ref: this._refInput,
          rootStyle: S.SECRET,
          caption: 'OpenWeatherMap API Key',
          isAllowRemember: isAllow,
          name: 'openweathermap'
        }),
        _react2.default.createElement(_RowCheckBox2.default, {
          rootStyle: S.CHECK_BOX,
          initValue: false,
          caption: CAPTION_ALLOW,
          captionStyle: S.CHECK_CAPTION,
          onCheck: this._checkAllow,
          onUnCheck: this._uncheckAllow
        }),
        _react2.default.createElement(
          'div',
          { style: buttonsStyle },
          _react2.default.createElement(_RaisedButton2.default, {
            caption: 'Set & Close',
            onClick: onSet
          }),
          _react2.default.createElement(_RaisedButton2.default, {
            isPrimary: true,
            caption: 'Close',
            onClick: onClose
          })
        )
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this._input.getValue();
    }
  }]);

  return CardApiKey;
}(Component);

exports.default = CardApiKey;
//# sourceMappingURL=CardApiKey.js.map