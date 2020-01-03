"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _configStore = _interopRequireDefault(require("./flux/configStore"));

var _WeatherSaga = _interopRequireDefault(require("./components/WeatherSaga"));

var _actions = require("./flux/forecast/actions");

var _throttle = _interopRequireDefault(require("./utils/throttle"));

var React = _react["default"] || window.React;
var ReactDOM = _reactDom["default"] || window.ReactDOM;
var render = ReactDOM.render;
var store = (0, _configStore["default"])();
var MS_PERIOD = 10000;

var _forecastRequest = function _forecastRequest(id) {
  return store.dispatch((0, _actions.forecastRequested)(id));
};

var _forecastRequestTh = (0, _throttle["default"])(_forecastRequest, MS_PERIOD, {
  trailing: false
});

window.weather = {
  fnFetchForecast: function fnFetchForecast(id) {
    if (typeof id === 'number' && id !== 0) {
      _forecastRequestTh(id);
    }
  }
};
render(React.createElement(_WeatherSaga["default"], {
  store: store
}), document.getElementById('app'));
//# sourceMappingURL=index.js.map