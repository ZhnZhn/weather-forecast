'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


var CL = {
  SELECT: 'm-select',
  LABEL: 'm-select__label',
  DIV: 'm-textfield-input__div',
  INPUT: 'm-textfield-input',
  INPUT_LINE: 'm-input__line',
  INPUT_MSG_ERR: 'm-input__msg-err'
};

var S = {
  LABEL_TO_INPUT: {
    transform: 'scale(1) translate(0px, -6px)'
  },
  LABEL_ON_ERROR: {
    color: '#F44336'
  },
  LINE_ERROR: {
    borderBottom: '2px solid #F44336'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crValue = function _crValue(_v, v) {
  var value = void 0;
  if (!_v) {
    value = v;
  } else {
    var _vL = _v.length,
        vL = v.length;
    if (vL > _vL) {
      value = _v + v.substr(_vL);
    } else {
      value = _v.substr(0, vL);
    }
  }
  return value.trim();
};

var _maskValue = function _maskValue() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var i = 0,
      str = '';
  for (i; i < len; i++) {
    str = str + 'X';
  }
  return str;
};

var TextField = (_temp = _class = function (_Component) {
  _inherits(TextField, _Component);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this));

    _this._handleFocusInput = function () {
      _this.isFocus = true;
      _this.forceUpdate();
    };

    _this._handleBlurInput = function () {
      _this.isFocus = false;
      _this.forceUpdate();
    };

    _this._handleInputChange = function (event) {
      var value = event.target.value;
      _this._value = _crValue(_this._value, value);
      var _v = _maskValue(_this._value.length);
      if (_this.isOnTest) {
        _this.setState({
          value: _v,
          isPassTest: _this.props.onTest(_this._value)
        });
      } else {
        _this.setState({ value: _v });
      }
    };

    _this._handleKeyDown = function (event) {
      if (event.keyCode === 27) {
        _this._value = '';
        _this.setState({ value: '' });
      } else if (event.keyCode === 13 && _this.isOnEnter) {
        _this.props.onEnter(event.target.value);
      }
    };

    _this.isFocus = false;
    var onTest = props.onTest,
        onEnter = props.onEnter;

    _this.isOnTest = _isFn(onTest);
    _this.isOnEnter = _isFn(onEnter);
    _this.state = {
      value: '',
      isPassTest: true
    };
    return _this;
  }

  _createClass(TextField, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          caption = _props.caption,
          maxLength = _props.maxLength,
          _props$errorMsg = _props.errorMsg,
          errorMsg = _props$errorMsg === undefined ? '' : _props$errorMsg,
          _state = this.state,
          value = _state.value,
          isPassTest = _state.isPassTest,
          _labelStyle = value || this.isFocus ? undefined : S.LABEL_TO_INPUT,
          _labelErrStyle = isPassTest ? undefined : S.LABEL_ON_ERROR,
          _lineStyle = isPassTest ? undefined : S.LINE_ERROR;

      return _react2.default.createElement(
        'div',
        {
          className: CL.SELECT,
          style: rootStyle
        },
        _react2.default.createElement(
          'label',
          {
            className: CL.LABEL,
            style: _extends({}, _labelStyle, _labelErrStyle)
          },
          caption
        ),
        _react2.default.createElement(
          'div',
          { className: CL.DIV },
          _react2.default.createElement('input', {
            type: 'password',
            className: CL.INPUT,
            value: value,
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: false,
            translate: false,
            maxLength: maxLength,
            defaultValue: value,
            onFocus: this._handleFocusInput,
            onBlur: this._handleBlurInput,
            onChange: this._handleInputChange,
            onKeyDown: this._handleKeyDown
          }),
          _react2.default.createElement('div', { className: CL.INPUT_LINE, style: _lineStyle }),
          _lineStyle && _react2.default.createElement(
            'div',
            { className: CL.INPUT_MSG_ERR },
            errorMsg
          )
        )
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return String(this._value).trim();
    }
  }]);

  return TextField;
}(Component), _class.defaultProps = {
  maxLength: "32"
}, _temp);
exports.default = TextField;
//# sourceMappingURL=SecretField.js.map