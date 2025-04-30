"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toggleLayout = exports.showSettings = exports.requestUvi = exports.requestPlace = exports.requestHourly = exports.requestAirForecast = void 0;
var _store = _interopRequireDefault(require("./store"));
var _isTypeFn = require("../utils/isTypeFn");
var _throttleFn = _interopRequireDefault(require("../utils/throttleFn"));
var _actions = require("./forecast/actions");
var _actions2 = require("./layout/actions");
var _actions3 = require("./modal/actions");
var _actions4 = require("./hourly/actions");
var _actions5 = require("./uv/actions");
var _actions6 = require("./air/actions");
var _actions7 = require("./place/actions");
const {
  dispatch
} = _store.default;
const MS_PERIOD = 10000,
  _forecastRequest = id => dispatch((0, _actions.forecastRequested)(id)),
  _forecastRequestTh = (0, _throttleFn.default)(_forecastRequest, MS_PERIOD);
window.weather = {
  fnFetchForecast: id => {
    if ((0, _isTypeFn.isNumber)(id) && id !== 0) {
      _forecastRequestTh(id);
    }
  }
};

//Header
const toggleLayout = storeKey => {
  dispatch((0, _actions2.toggleLayout)(storeKey));
};
exports.toggleLayout = toggleLayout;
const showSettings = storeKey => {
  dispatch((0, _actions2.toggleLayout)(storeKey));
  dispatch((0, _actions3.showModal)('SETTINGS'));
};

//LeftPushMenu
exports.showSettings = showSettings;
const requestHourly = () => dispatch((0, _actions4.hourlyRequested)());
exports.requestHourly = requestHourly;
const requestUvi = () => dispatch((0, _actions5.uvRequested)());
exports.requestUvi = requestUvi;
const requestAirForecast = () => dispatch((0, _actions6.airForecastReq)());

//LeafletMap
exports.requestAirForecast = requestAirForecast;
const requestPlace = _ref => {
  let {
    lat,
    lng
  } = _ref;
  return dispatch((0, _actions7.placeRequested)({
    lat,
    lot: lng
  }));
};
exports.requestPlace = requestPlace;
//# sourceMappingURL=handlers.js.map