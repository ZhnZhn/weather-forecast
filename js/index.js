'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _configStore = require('./flux/configStore');

var _configStore2 = _interopRequireDefault(_configStore);

var _WeatherSaga = require('./components/WeatherSaga');

var _WeatherSaga2 = _interopRequireDefault(_WeatherSaga);

var _actions = require('./flux/forecast/actions');

var _throttle = require('./utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = _react2.default || window.React;
var ReactDOM = _reactDom2.default || window.ReactDOM;
var render = ReactDOM.render;


var store = (0, _configStore2.default)();

var MS_PERIOD = 10000;

var _forecastRequest = function _forecastRequest(id) {
  return store.dispatch((0, _actions.forecastRequested)(id));
};
var _forecastRequestTh = (0, _throttle2.default)(_forecastRequest, MS_PERIOD, { trailing: false });

window.weather = {
  fnFetchForecast: function fnFetchForecast(id) {
    if (typeof id === 'number' && id !== 0) {
      _forecastRequestTh(id);
    }
  }
};

render(React.createElement(_WeatherSaga2.default, { store: store }), document.getElementById('app'));
//# sourceMappingURL=index.js.map