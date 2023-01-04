"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _store = _interopRequireDefault(require("./store"));
var _throttleFn = _interopRequireDefault(require("../utils/throttleFn"));
var _actions = require("./forecast/actions");
var _actions2 = require("./layout/actions");
var _actions3 = require("./modal/actions");
var _actions4 = require("./hourly/actions");
var _actions5 = require("./uv/actions");
var _actions6 = require("./air/actions");
var _actions7 = require("./place/actions");
var dispatch = _store["default"].dispatch;
var MS_PERIOD = 10000,
  _forecastRequest = function _forecastRequest(id) {
    return dispatch((0, _actions.forecastRequested)(id));
  },
  _forecastRequestTh = (0, _throttleFn["default"])(_forecastRequest, MS_PERIOD);
window.weather = {
  fnFetchForecast: function fnFetchForecast(id) {
    if (typeof id === 'number' && id !== 0) {
      _forecastRequestTh(id);
    }
  }
};
var handlers = {
  //Header
  toggleLayout: function toggleLayout(storeKey) {
    dispatch((0, _actions2.toggleLayout)(storeKey));
  },
  showSettings: function showSettings(storeKey) {
    dispatch((0, _actions2.toggleLayout)(storeKey));
    dispatch((0, _actions3.showModal)('SETTINGS'));
  },
  //LeftPushMenu
  requestHourly: function requestHourly() {
    return dispatch((0, _actions4.hourlyRequested)());
  },
  requestUvi: function requestUvi() {
    return dispatch((0, _actions5.uvRequested)());
  },
  requestAirForecast: function requestAirForecast() {
    return dispatch((0, _actions6.airForecastReq)());
  },
  //LeafletMap
  requestPlace: function requestPlace(_ref) {
    var lat = _ref.lat,
      lng = _ref.lng;
    return dispatch((0, _actions7.placeRequested)({
      lat: lat,
      lot: lng
    }));
  }
};
var _default = handlers;
exports["default"] = _default;
//# sourceMappingURL=handlers.js.map