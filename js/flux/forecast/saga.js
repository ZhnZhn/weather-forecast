'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxSaga = require('redux-saga');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _selectors = require('../selectors');

var _OpenWeather = require('../../api/OpenWeather');

var _OpenWeather2 = _interopRequireDefault(_OpenWeather);

var _request = require('../../affects/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var takeEvery = _reduxSaga.effects.takeEvery,
    call = _reduxSaga.effects.call,
    put = _reduxSaga.effects.put,
    select = _reduxSaga.effects.select;


var requestForecast = /*#__PURE__*/regeneratorRuntime.mark(function requestForecast(action) {
  var state, id, json;
  return regeneratorRuntime.wrap(function requestForecast$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return select();

        case 3:
          state = _context.sent;
          id = action.id;

          if (_selectors.sForecast.byId(state, id)) {
            _context.next = 13;
            break;
          }

          _context.next = 8;
          return call(_request2.default, _OpenWeather2.default.crForecastById(id));

        case 8:
          json = _context.sent;
          _context.next = 11;
          return put(_actions2.default.requestedOk(json, id));

        case 11:
          _context.next = 15;
          break;

        case 13:
          _context.next = 15;
          return put(_actions2.default.requestedInCache(id));

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context['catch'](0);
          _context.next = 21;
          return put(_actions2.default.requestedFail(_context.t0.message));

        case 21:
        case 'end':
          return _context.stop();
      }
    }
  }, requestForecast, this, [[0, 17]]);
});

var watchForecastRequested = /*#__PURE__*/regeneratorRuntime.mark(function watchForecastRequested() {
  return regeneratorRuntime.wrap(function watchForecastRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(_actions.ACTION.FORECAST_REQUESTED, requestForecast);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, watchForecastRequested, this);
});

exports.default = watchForecastRequested;
//# sourceMappingURL=saga.js.map