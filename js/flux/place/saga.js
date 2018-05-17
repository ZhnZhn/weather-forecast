'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxSaga = require('redux-saga');

var _gen = require('../gen');

var _OpenWeather = require('../../api/OpenWeather');

var _OpenWeather2 = _interopRequireDefault(_OpenWeather);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _request = require('../../affects/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var takeEvery = _reduxSaga.effects.takeEvery,
    call = _reduxSaga.effects.call,
    put = _reduxSaga.effects.put;


var requestPlace = /*#__PURE__*/regeneratorRuntime.mark(function requestPlace(action) {
  var _action$payload, payload, lat, lot, forecast;

  return regeneratorRuntime.wrap(function requestPlace$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.delegateYield((0, _gen.isApiKey)(), 't0', 2);

        case 2:
          _action$payload = action.payload, payload = _action$payload === undefined ? {} : _action$payload;
          lat = payload.lat, lot = payload.lot;
          _context.next = 6;
          return call(_request2.default, _OpenWeather2.default.crForecast(lat, lot));

        case 6:
          forecast = _context.sent;
          _context.next = 9;
          return put(_actions2.default.requestedOk(forecast));

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t1 = _context['catch'](0);
          _context.next = 15;
          return put(_actions2.default.requestedFail(_context.t1.message));

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, requestPlace, this, [[0, 11]]);
});

var watchPlaceRequested = /*#__PURE__*/regeneratorRuntime.mark(function watchPlaceRequested() {
  return regeneratorRuntime.wrap(function watchPlaceRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(_actions.ACTION.PLACE_REQUESTED, requestPlace);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, watchPlaceRequested, this);
});

exports.default = watchPlaceRequested;
//# sourceMappingURL=saga.js.map