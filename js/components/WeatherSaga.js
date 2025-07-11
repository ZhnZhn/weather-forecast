"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("./uiApi");
var _useHotKeys = _interopRequireDefault(require("./hotkeys/useHotKeys"));
var _ModalDialogContainer = _interopRequireDefault(require("./containers/ModalDialogContainer"));
var _Header = _interopRequireDefault(require("./header/Header"));
var _LeftPushMenu = _interopRequireDefault(require("./left-push-menu/LeftPushMenu"));
var _LeafletMap = _interopRequireDefault(require("./maps/LeafletMap"));
var _Forecast = _interopRequireDefault(require("./popups/Forecast"));
var _jsxRuntime = require("react/jsx-runtime");
const MAP_ID = 'map_id';
const PUSH_MENU_ID = 'left_push_menu';
const S_HEADER = {
    width: '100%',
    height: '3rem',
    lineHeight: '3rem',
    borderBottom: '1px solid #999',
    cursor: 'auto'
  },
  S_MAP = {
    width: '100%',
    height: 'calc(100vh - 3rem)'
  },
  S_FLY_ROOT_DIV = {
    position: 'absolute',
    top: 70,
    left: 170,
    padding: '10px 5px 5px 4px',
    border: '1px solid #999',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px',
    zIndex: 1500
  };
const WeatherSaga = () => {
  const store = (0, _uiApi.useStore)();
  (0, _useHotKeys.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialogContainer.default, {
      store: store
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
      style: S_HEADER
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LeftPushMenu.default, {
        id: PUSH_MENU_ID
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LeafletMap.default, {
        id: MAP_ID,
        style: S_MAP
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Forecast.default, {
        style: S_FLY_ROOT_DIV
      })]
    })]
  });
};
var _default = exports.default = WeatherSaga;
//# sourceMappingURL=WeatherSaga.js.map