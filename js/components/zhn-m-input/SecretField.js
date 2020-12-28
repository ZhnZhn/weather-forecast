"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var Component = _react["default"].Component;
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

var _crValue = function _crValue(_v, v) {
  var value;

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

var _maskValue = function _maskValue(len) {
  if (len === void 0) {
    len = 0;
  }

  var i = 0,
      str = '';

  for (i; i < len; i++) {
    str = str + 'X';
  }

  return str;
};

var _crId = function _crId(_ref) {
  var name = _ref.name;
  return name + '_sf';
};

var SecretField = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SecretField, _Component);

  function SecretField(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleFocusInput = function () {
      _this.isFocus = true;

      _this.forceUpdate();
    };

    _this._handleBlurInput = function () {
      _this.isFocus = false;

      _this.forceUpdate();
    };

    _this._clearAttrValue = function () {
      _this._clearId = setTimeout(function () {
        var _input = _this._input;

        if (_input && _input.hasAttribute('value')) {
          _input.removeAttribute('value');
        }
      });
    };

    _this._hInputChange = function (event) {
      _this.setState({
        value: event.target.value.trim(),
        isPassTest: _this.props.onTest(event.target.value.trim())
      });
    };

    _this._hKeyDown = function (event) {
      if (event.keyCode === 46) {
        _this.setState({
          value: ''
        });
      } else if (event.keyCode === 13) {
        event.preventDefault();

        _this.props.onEnter(event.target.value);

        _this._wasEnter = true;

        _this.forceUpdate(_this._clearWasEnter);
      }
    };

    _this._hMaskInputChange = function (event) {
      var value = event.target.value;
      _this._value = _crValue(_this._value, value);

      var _v = _maskValue(_this._value.length);

      _this.setState({
        value: _v,
        isPassTest: _this.props.onTest(_this._value)
      });
    };

    _this._hMaskKeyDown = function (event) {
      if (event.keyCode === 46 || event.keyCode === 27) {
        _this._value = '';

        _this.setState({
          value: ''
        });
      } else if (event.keyCode === 13) {
        _this.props.onEnter(event.target.value);
      }
    };

    _this._isValue = function (isAllowRemember) {
      return isAllowRemember ? _this._input ? !!_this._input.value : false : !!_this.state.value;
    };

    _this._refInput = function (c) {
      return _this._input = c;
    };

    _this.isFocus = false;
    _this._id = _crId(props);
    _this.state = {
      value: '',
      isPassTest: true
    };
    return _this;
  }

  var _proto = SecretField.prototype;

  _proto.componentWillUnmound = function componentWillUnmound() {
    clearTimeout(this._clearId);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        rootStyle = _this$props.rootStyle,
        caption = _this$props.caption,
        isAllowRemember = _this$props.isAllowRemember,
        name = _this$props.name,
        maxLength = _this$props.maxLength,
        _this$props$errorMsg = _this$props.errorMsg,
        errorMsg = _this$props$errorMsg === void 0 ? '' : _this$props$errorMsg,
        _this$state = this.state,
        value = _this$state.value,
        isPassTest = _this$state.isPassTest,
        _labelStyle = this._isValue(isAllowRemember) || this.isFocus ? undefined : S.LABEL_TO_INPUT,
        _labelErrStyle = isPassTest ? undefined : S.LABEL_ON_ERROR,
        _lineStyle = isPassTest ? undefined : S.LINE_ERROR,
        _inputProps = isAllowRemember ? {
      autoComplete: "current-password",
      value: value,
      onChange: this._hInputChange,
      onKeyDown: this._hKeyDown
    } : {
      autoComplete: "off",
      value: value,
      onChange: this._hMaskInputChange,
      onKeyDown: this._hMaskKeyDown
    };

    return /*#__PURE__*/_react["default"].createElement("form", {
      className: CL.SELECT,
      style: rootStyle
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: CL.LABEL,
      style: (0, _extends2["default"])({}, _labelStyle, _labelErrStyle),
      htmlFor: this._id
    }, caption), /*#__PURE__*/_react["default"].createElement("div", {
      className: CL.DIV
    }, /*#__PURE__*/_react["default"].createElement("input", {
      hidden: true,
      autoComplete: "username",
      value: name,
      readOnly: true
    }), /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
      ref: this._refInput,
      id: this._id,
      type: "password",
      className: CL.INPUT,
      maxLength: maxLength,
      onFocus: this._handleFocusInput,
      onBlur: this._handleBlurInput
    }, _inputProps)), /*#__PURE__*/_react["default"].createElement("div", {
      className: CL.INPUT_LINE,
      style: _lineStyle
    }), _lineStyle && /*#__PURE__*/_react["default"].createElement("div", {
      className: CL.INPUT_MSG_ERR
    }, errorMsg)));
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.isAllowRemember !== prevProps.isAllowRemember) {
        this._input.value = '';

        if (this.props.isAllowRemember) {
          this._value = '';
          this.setState({
            value: ''
          });
        }
      }
    }

    this._clearAttrValue();
  };

  _proto.getValue = function getValue() {
    var isAllowRemember = this.props.isAllowRemember;
    return isAllowRemember && this._input ? this._input.value : String(this._value).trim();
  };

  return SecretField;
}(Component);

SecretField.defaultProps = {
  name: "pwd",
  maxLength: "32",
  onTest: function onTest() {
    return true;
  },
  onEnter: function onEnter() {}
};
var _default = SecretField;
exports["default"] = _default;
//# sourceMappingURL=SecretField.js.map