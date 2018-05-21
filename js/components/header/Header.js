'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _ProgressLoading = require('./ProgressLoading');

var _ProgressLoading2 = _interopRequireDefault(_ProgressLoading);

var _HamburgerButton = require('../zhn-atoms/HamburgerButton');

var _HamburgerButton2 = _interopRequireDefault(_HamburgerButton);

var _ButtonCircle = require('../zhn-atoms/ButtonCircle');

var _ButtonCircle2 = _interopRequireDefault(_ButtonCircle);

var _ProviderLink = require('../elements/ProviderLink');

var _ProviderLink2 = _interopRequireDefault(_ProviderLink);

var _Header = require('./Header.Style');

var _Header2 = _interopRequireDefault(_Header);

var _actions = require('../../flux/layout/actions');

var _actions2 = require('../../flux/modal/actions');

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import PropTypes from 'prop-types';

var Component = _react2.default.Component;


var TITLE = "Weather v0.2.0";

var CL = {
  TITLE: 'header__title',
  LINK_PREF: 'header__link-pref',
  LINK: 'header__link-provider'
};

var S = {
  BT_CIRCLE: {
    width: '1.8rem',
    height: '1.8rem',
    lineHeight: '1rem',
    marginLeft: '1rem',
    paddingTop: '0.3rem'
  }
};

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this._hForecast = function (storeKey) {
      var store = _this.props.store,
          dispatch = store.dispatch;

      dispatch((0, _actions.toggleLayout)(storeKey));
    }, _this._hSettings = function (storeKey) {
      var store = _this.props.store,
          dispatch = store.dispatch;

      dispatch((0, _actions.toggleLayout)(storeKey));
      dispatch((0, _actions2.showModal)('SETTINGS'));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    store: PropTypes.shape({
      dispatch: PropTypes.func
    }),
    theme: PropTypes.shape({
      createStyle: PropTypes.func,
      setThemeName: PropTypes.func
    })
  }
  */

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          store = _props.store,
          theme = _props.theme,
          _STYLE = theme.createStyle(_Header2.default);

      return _react2.default.createElement(
        'header',
        {
          role: 'banner',
          style: _extends({}, rootStyle, _STYLE.HEADER)
        },
        _react2.default.createElement(_ProgressLoading2.default, { store: store }),
        _react2.default.createElement(_HamburgerButton2.default, {
          store: store,
          storeKey: 'isPushMenu',
          onClick: _actions.toggleLayout
        }),
        _react2.default.createElement(
          'span',
          { className: CL.TITLE },
          TITLE
        ),
        _react2.default.createElement(_ButtonCircle2.default, {
          style: S.BT_CIRCLE,
          caption: 'F',
          title: 'Toggle Forecast Popup',
          store: store,
          storeKey: 'isPopupForecast',
          onClick: this._hForecast
        }),
        _react2.default.createElement(_ButtonCircle2.default, {
          style: S.BT_CIRCLE,
          caption: 'S',
          title: 'Open Settings Dialog',
          store: store,
          storeKey: 'isSettings',
          onClick: this._hSettings
        }),
        _react2.default.createElement(_ProviderLink2.default, {
          className: CL.LINK,
          prefixCL: CL.LINK_PREF
        })
      );
    }
  }]);

  return Header;
}(Component);

exports.default = (0, _withTheme2.default)(Header);
//# sourceMappingURL=Header.js.map