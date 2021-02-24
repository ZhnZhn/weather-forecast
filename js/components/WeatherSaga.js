"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("./_react"));

var _reactRedux = require("react-redux");

var _ThemeContext = _interopRequireDefault(require("./hoc/ThemeContext"));

var _theme = _interopRequireDefault(require("./styles/theme"));

var _ModalDialogContainer = _interopRequireDefault(require("./containers/ModalDialogContainer"));

var _Header = _interopRequireDefault(require("./header/Header"));

var _LeftPushMenu = _interopRequireDefault(require("./left-push-menu/LeftPushMenu"));

var _LeafletMap = _interopRequireDefault(require("./maps/LeafletMap"));

var _Forecast = _interopRequireDefault(require("./popups/Forecast"));

//import PropTypes from 'prop-types';
var useRef = _react["default"].useRef,
    useEffect = _react["default"].useEffect;
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
    top: 30,
    left: 50,
    padding: '10px 5px 5px 4px',
    backgroundColor: '#808080',
    border: '1px solid #999',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px',
    zIndex: 500
  }
};
var _assign = Object.assign;

var WeatherSaga = function WeatherSaga() {
  var _refMap = useRef(),
      _refMenu = useRef(),
      themeName = (0, _reactRedux.useSelector)(function (state) {
    return state.layout.themeName;
  }),
      isPushMenu = (0, _reactRedux.useSelector)(function (state) {
    return state.layout.isPushMenu;
  }),
      store = (0, _reactRedux.useStore)();

  useEffect(function () {
    _refMap.current = document.getElementById(MAP_ID);
    _refMenu.current = document.getElementById(PUSH_MENU_ID);
  }, []);
  useEffect(function () {
    if (isPushMenu) {
      var width = _refMenu.current.getBoundingClientRect().width;

      _assign(_refMap.current.style, {
        transform: "translateX(" + width + "px)",
        width: "calc(100vw - " + width + "px)"
      });

      _refMenu.current.style.transform = 'translateX(0px)';
    } else {
      _assign(_refMap.current.style, {
        transform: 'translateX(0px)',
        width: '100vw'
      });

      _refMenu.current.style.transform = "translateX(-100%)";
    }
  }, [isPushMenu]);
  return /*#__PURE__*/_react["default"].createElement(_ThemeContext["default"].Provider, {
    value: _theme["default"]
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_ModalDialogContainer["default"], {
    store: store
  }), /*#__PURE__*/_react["default"].createElement(_Header["default"], {
    style: S.HEADER
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_LeftPushMenu["default"], {
    id: PUSH_MENU_ID,
    theme: _theme["default"]
  }), /*#__PURE__*/_react["default"].createElement(_LeafletMap["default"], {
    id: MAP_ID,
    style: S.MAP,
    themeName: themeName
  }), /*#__PURE__*/_react["default"].createElement(_Forecast["default"], {
    style: S.FLY_ROOT_DIV
  }))));
};

var _default = WeatherSaga;
exports["default"] = _default;
//# sourceMappingURL=WeatherSaga.js.map