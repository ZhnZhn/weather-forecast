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

var _actions3 = require('../modal/actions');

var _actions4 = _interopRequireDefault(_actions3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var takeEvery = _reduxSaga.effects.takeEvery,
    select = _reduxSaga.effects.select,
    call = _reduxSaga.effects.call,
    put = _reduxSaga.effects.put;


var requestHourly = /*#__PURE__*/regeneratorRuntime.mark(function requestHourly(action) {
  var state, recent, recentHourly, json;
  return regeneratorRuntime.wrap(function requestHourly$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return select();

        case 3:
          state = _context.sent;
          recent = _selectors.sForecast.recent(state);
          recentHourly = _selectors.sHourly.recent(state);

          if (!(recent && recentHourly !== recent)) {
            _context.next = 14;
            break;
          }

          _context.next = 9;
          return call(_request2.default, _OpenWeather2.default.crHourlyById(recent));

        case 9:
          json = _context.sent;
          _context.next = 12;
          return put(_actions2.default.requestedOk(json, recent));

        case 12:
          _context.next = 16;
          break;

        case 14:
          _context.next = 16;
          return put(_actions2.default.requestedInCache(recent));

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context['catch'](0);
          _context.next = 22;
          return put(_actions4.default.showModal('ERROR', {
            errMsg: _context.t0.message
          }));

        case 22:
        case 'end':
          return _context.stop();
      }
    }
  }, requestHourly, this, [[0, 18]]);
});

var watchHourlyRequested = /*#__PURE__*/regeneratorRuntime.mark(function watchHourlyRequested() {
  return regeneratorRuntime.wrap(function watchHourlyRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(_actions.ACTION.HOURLY_REQUESTED, requestHourly);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, watchHourlyRequested, this);
});

exports.default = watchHourlyRequested;
//# sourceMappingURL=saga.js.map