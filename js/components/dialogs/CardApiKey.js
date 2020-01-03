"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _SecretField = _interopRequireDefault(require("../zhn-m-input/SecretField"));

var _RowCheckBox = _interopRequireDefault(require("./RowCheckBox"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

var Component = _react["default"].Component;
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

var CardApiKey =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(CardApiKey, _Component);

  function CardApiKey(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._checkAllow = function () {
      _this.setState({
        isAllow: true
      });
    };

    _this._uncheckAllow = function () {
      _this.setState({
        isAllow: false
      });
    };

    _this._refInput = function (c) {
      return _this._input = c;
    };

    _this.state = {
      isAllow: false
    };
    return _this;
  }

  var _proto = CardApiKey.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        buttonsStyle = _this$props.buttonsStyle,
        onClose = _this$props.onClose,
        onSet = _this$props.onSet;
    var isAllow = this.state.isAllow;
    return _react["default"].createElement("div", {
      style: style
    }, _react["default"].createElement(_SecretField["default"], {
      ref: this._refInput,
      rootStyle: S.SECRET,
      caption: "OpenWeatherMap API Key",
      isAllowRemember: isAllow,
      name: "openweathermap"
    }), _react["default"].createElement(_RowCheckBox["default"], {
      rootStyle: S.CHECK_BOX,
      initValue: false,
      caption: CAPTION_ALLOW,
      captionStyle: S.CHECK_CAPTION,
      onCheck: this._checkAllow,
      onUnCheck: this._uncheckAllow
    }), _react["default"].createElement("div", {
      style: buttonsStyle
    }, _react["default"].createElement(_RaisedButton["default"], {
      caption: "Set & Close",
      onClick: onSet
    }), _react["default"].createElement(_RaisedButton["default"], {
      isPrimary: true,
      caption: "Close",
      onClick: onClose
    })));
  };

  _proto.getValue = function getValue() {
    return this._input.getValue();
  };

  return CardApiKey;
}(Component);

var _default = CardApiKey;
exports["default"] = _default;
//# sourceMappingURL=CardApiKey.js.map