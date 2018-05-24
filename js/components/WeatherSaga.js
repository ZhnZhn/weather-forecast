'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;
//import PropTypes from 'prop-types';

var _react = require('./_react');

var _react2 = _interopRequireDefault(_react);

var _ThemeContext = require('./hoc/ThemeContext');

var _ThemeContext2 = _interopRequireDefault(_ThemeContext);

var _theme = require('./styles/theme');

var _theme2 = _interopRequireDefault(_theme);

var _ModalDialogContainer = require('./containers/ModalDialogContainer');

var _ModalDialogContainer2 = _interopRequireDefault(_ModalDialogContainer);

var _Header = require('./header/Header');

var _Header2 = _interopRequireDefault(_Header);

var _LeftPushMenu = require('./left-push-menu/LeftPushMenu');

var _LeftPushMenu2 = _interopRequireDefault(_LeftPushMenu);

var _LeafletMap = require('./maps/LeafletMap');

var _LeafletMap2 = _interopRequireDefault(_LeafletMap);

var _Forecast = require('./popups/Forecast');

var _Forecast2 = _interopRequireDefault(_Forecast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


var MAP_ID = 'map_id';
var PUSH_MENU_ID = 'left_push_menu';

var S = {
  HEADER: {
    width: '100%',
    height: '3rem',
    lineHeight: '3rem',
    borderBottom: '1px solid #999',
    cursor: 'auto'
  },
  MAP: {
    width: '100%',
    height: 'calc(100vh - 3rem)'
  },
  FLY_ROOT_DIV: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    padding: '10px 5px 5px 4px',
    backgroundColor: '#808080',
    border: '1px solid #999',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px',
    zIndex: 500
  }
};

var WeatherSaga = (_temp = _class = function (_Component) {
  _inherits(WeatherSaga, _Component);

  /*
  static propTypes = {
    store: PropTypes.object
  }
  */

  function WeatherSaga(props) {
    _classCallCheck(this, WeatherSaga);

    var _this = _possibleConstructorReturn(this, (WeatherSaga.__proto__ || Object.getPrototypeOf(WeatherSaga)).call(this, props));

    _initialiseProps.call(_this);

    var layout = props.store.getState().layout;
    _this.layout = layout;
    _this.isPushMenu = layout.isPushMenu;
    _this.themeName = layout.themeName;
    return _this;
  }

  _createClass(WeatherSaga, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubsribe = this.props.store.subscribe(this._onStore);
      this.mapEl = document.getElementById(MAP_ID);
      this.menuEl = document.getElementById(PUSH_MENU_ID);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var store = this.props.store;

      return _react2.default.createElement(
        _ThemeContext2.default.Provider,
        { value: _theme2.default },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_ModalDialogContainer2.default, {
            store: store
          }),
          _react2.default.createElement(_Header2.default, {
            rootStyle: S.HEADER,
            store: store
          }),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_LeftPushMenu2.default, {
              id: PUSH_MENU_ID,
              store: store
            }),
            _react2.default.createElement(_LeafletMap2.default, {
              id: MAP_ID,
              rootStyle: S.MAP,
              store: store
            }),
            _react2.default.createElement(_Forecast2.default, {
              rootStyle: S.FLY_ROOT_DIV,
              isShow: true,
              store: store
            })
          )
        )
      );
    }
  }]);

  return WeatherSaga;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._onStore = function () {
    var store = _this2.props.store,
        layout = store.getState().layout;

    if (layout !== _this2.layout) {
      if (layout.isPushMenu !== _this2.isPushMenu) {
        if (_this2.isPushMenu) {

          _this2.mapEl.style.transform = 'translateX(0px)';
          _this2.mapEl.style.width = '100vw';
          _this2.menuEl.style.transform = 'translateX(-100%)';
        } else {
          var width = _this2.menuEl.getBoundingClientRect().width;
          _this2.mapEl.style.transform = 'translateX(' + width + 'px)';
          _this2.mapEl.style.width = 'calc(100vw - ' + width + 'px)';
          _this2.menuEl.style.transform = 'translateX(0px)';
        }
        _this2.isPushMenu = layout.isPushMenu;
      } else if (layout.themeName !== _this2.themeName) {
        //console.log('WeatherSaga forceUpdate')
        _this2.forceUpdate();
        _this2.themeName = layout.themeName;
      }
      _this2.layout = layout;
    }
  };

  this._refMap = function (n) {
    return _this2._mapComp = n;
  };
}, _temp);
exports.default = WeatherSaga;
//# sourceMappingURL=WeatherSaga.js.map