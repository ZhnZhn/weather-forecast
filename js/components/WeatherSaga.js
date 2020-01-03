"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("./_react"));

var _ThemeContext = _interopRequireDefault(require("./hoc/ThemeContext"));

var _theme = _interopRequireDefault(require("./styles/theme"));

var _ModalDialogContainer = _interopRequireDefault(require("./containers/ModalDialogContainer"));

var _Header = _interopRequireDefault(require("./header/Header"));

var _LeftPushMenu = _interopRequireDefault(require("./left-push-menu/LeftPushMenu"));

var _LeafletMap = _interopRequireDefault(require("./maps/LeafletMap"));

var _Forecast = _interopRequireDefault(require("./popups/Forecast"));

//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
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

var WeatherSaga =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(WeatherSaga, _Component);

  /*
  static propTypes = {
    store: PropTypes.object
  }
  */
  function WeatherSaga(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._onStore = function () {
      var store = _this.props.store,
          layout = store.getState().layout;

      if (layout !== _this.layout) {
        if (layout.isPushMenu !== _this.isPushMenu) {
          if (_this.isPushMenu) {
            _this.mapEl.style.transform = 'translateX(0px)';
            _this.mapEl.style.width = '100vw';
            _this.menuEl.style.transform = "translateX(-100%)";
          } else {
            var width = _this.menuEl.getBoundingClientRect().width;

            _this.mapEl.style.transform = "translateX(" + width + "px)";
            _this.mapEl.style.width = "calc(100vw - " + width + "px)";
            _this.menuEl.style.transform = 'translateX(0px)';
          }

          _this.isPushMenu = layout.isPushMenu;
        } else if (layout.themeName !== _this.themeName) {
          //console.log('WeatherSaga forceUpdate')
          _this.forceUpdate();

          _this.themeName = layout.themeName;
        }

        _this.layout = layout;
      }
    };

    _this._refMap = function (n) {
      return _this._mapComp = n;
    };

    var _layout = props.store.getState().layout;
    _this.layout = _layout;
    _this.isPushMenu = _layout.isPushMenu;
    _this.themeName = _layout.themeName;
    return _this;
  }

  var _proto = WeatherSaga.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubsribe = this.props.store.subscribe(this._onStore);
    this.mapEl = document.getElementById(MAP_ID);
    this.menuEl = document.getElementById(PUSH_MENU_ID);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var store = this.props.store;
    return _react["default"].createElement(_ThemeContext["default"].Provider, {
      value: _theme["default"]
    }, _react["default"].createElement("div", null, _react["default"].createElement(_ModalDialogContainer["default"], {
      store: store
    }), _react["default"].createElement(_Header["default"], {
      rootStyle: S.HEADER,
      store: store
    }), _react["default"].createElement("div", null, _react["default"].createElement(_LeftPushMenu["default"], {
      id: PUSH_MENU_ID,
      store: store
    }), _react["default"].createElement(_LeafletMap["default"], {
      id: MAP_ID,
      rootStyle: S.MAP,
      store: store
    }), _react["default"].createElement(_Forecast["default"], {
      rootStyle: S.FLY_ROOT_DIV,
      isShow: true,
      store: store
    }))));
  };

  return WeatherSaga;
}(Component);

var _default = WeatherSaga;
exports["default"] = _default;
//# sourceMappingURL=WeatherSaga.js.map