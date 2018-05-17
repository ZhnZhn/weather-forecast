'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CL_NOT_SELECTED = "not-selected";

var Component = _react2.default.Component;

var S = {
  ROOT: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  NOT_ACTIVE: {
    //color : '#9e9e9e'
    color: '#5b5b5b'
  }
};

var _getIsActive = function _getIsActive(props) {
  var store = props.store,
      storeKey = props.storeKey;

  return store.getState().layout[storeKey];
};

var ButtonCircle = function (_Component) {
  _inherits(ButtonCircle, _Component);

  function ButtonCircle(props) {
    _classCallCheck(this, ButtonCircle);

    var _this = _possibleConstructorReturn(this, (ButtonCircle.__proto__ || Object.getPrototypeOf(ButtonCircle)).call(this));

    _this._onStore = function () {
      var isActive = _getIsActive(_this.props);
      if (isActive !== _this.state.isActive) {
        _this.setState({ isActive: isActive });
      }
    };

    _this._hClick = function () {
      var _this$props = _this.props,
          storeKey = _this$props.storeKey,
          onClick = _this$props.onClick;

      onClick(storeKey);
    };

    _this.state = {
      isActive: _getIsActive(props)
    };
    return _this;
  }

  _createClass(ButtonCircle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          style = _props.style,
          isActive = this.state.isActive,
          _style = isActive ? _extends({}, S.ROOT, style) : _extends({}, S.ROOT, style, S.NOT_ACTIVE);

      return _react2.default.createElement(
        'span',
        {
          className: CL_NOT_SELECTED,
          style: _style,
          onClick: this._hClick
        },
        caption
      );
    }
  }]);

  return ButtonCircle;
}(Component);

exports.default = ButtonCircle;
//# sourceMappingURL=ButtonCircle.js.map