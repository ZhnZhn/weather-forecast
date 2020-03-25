"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _actions = _interopRequireWildcard(require("./actions"));

var _selectors = require("../selectors");

var _OpenWeather = _interopRequireDefault(require("../../api/OpenWeather"));

var _request = _interopRequireDefault(require("../../affects/request"));

var _actions2 = _interopRequireDefault(require("../modal/actions"));

var requestHourly =
/*#__PURE__*/
_regenerator["default"].mark(function requestHourly(action) {
  var state, recent, recentHourly, json;
  return _regenerator["default"].wrap(function requestHourly$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.select)();

        case 3:
          state = _context.sent;
          recent = _selectors.sForecast.recent(state);
          recentHourly = _selectors.sHourly.recent(state);

          if (!(recent && recentHourly !== recent)) {
            _context.next = 14;
            break;
          }

          _context.next = 9;
          return (0, _effects.call)(_request["default"], _OpenWeather["default"].crHourlyById(recent));

        case 9:
          json = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions["default"].requestedOk(json, recent));

        case 12:
          _context.next = 16;
          break;

        case 14:
          _context.next = 16;
          return (0, _effects.put)(_actions["default"].requestedInCache(recent));

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          _context.next = 22;
          return (0, _effects.put)(_actions2["default"].showModal('ERROR', {
            errMsg: _context.t0.message
          }));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, requestHourly, null, [[0, 18]]);
});

var watchHourlyRequested =
/*#__PURE__*/
_regenerator["default"].mark(function watchHourlyRequested() {
  return _regenerator["default"].wrap(function watchHourlyRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_actions.ACTION.HOURLY_REQUESTED, requestHourly);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, watchHourlyRequested);
});

var _default = watchHourlyRequested;
exports["default"] = _default;
//# sourceMappingURL=saga.js.map