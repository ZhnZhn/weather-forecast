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
    select = _reduxSaga.effects.select,
    call = _reduxSaga.effects.call,
    put = _reduxSaga.effects.put;


var fetchUV = /*#__PURE__*/regeneratorRuntime.mark(function fetchUV(action) {
  var state, recent, recentUV, coord, json;
  return regeneratorRuntime.wrap(function fetchUV$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return select();

        case 3:
          state = _context.sent;
          recent = _selectors.sForecast.recent(state);
          recentUV = _selectors.sUV.recent(state);

          if (!(recent && recentUV !== recent)) {
            _context.next = 15;
            break;
          }

          coord = _selectors.sForecast.cityCoordById(state, recent);
          _context.next = 10;
          return call(_request2.default, _OpenWeather2.default.crUV(coord.lat, coord.lon));

        case 10:
          json = _context.sent;
          _context.next = 13;
          return put(_actions2.default.requestedOk(json, recent));

        case 13:
          _context.next = 17;
          break;

        case 15:
          _context.next = 17;
          return put(_actions2.default.requestedInCache());

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context['catch'](0);
          _context.next = 23;
          return put(_actions2.default.requestedFail(_context.t0.message));

        case 23:
        case 'end':
          return _context.stop();
      }
    }
  }, fetchUV, this, [[0, 19]]);
});

var watchAction = /*#__PURE__*/regeneratorRuntime.mark(function watchAction() {
  return regeneratorRuntime.wrap(function watchAction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(_actions.ACTION.UV_REQUESTED, fetchUV);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, watchAction, this);
});

exports.default = watchAction;
//# sourceMappingURL=saga.js.map