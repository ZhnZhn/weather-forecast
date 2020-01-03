"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _reduxSaga = require("redux-saga");

var _actions = _interopRequireWildcard(require("./actions"));

var _selectors = require("../selectors");

var _OpenWeather = _interopRequireDefault(require("../../api/OpenWeather"));

var _request = _interopRequireDefault(require("../../affects/request"));

var _actions2 = _interopRequireDefault(require("../modal/actions"));

var takeEvery = _reduxSaga.effects.takeEvery,
    call = _reduxSaga.effects.call,
    put = _reduxSaga.effects.put,
    select = _reduxSaga.effects.select;

var requestForecast =
/*#__PURE__*/
_regenerator["default"].mark(function requestForecast(action) {
  var state, id, json;
  return _regenerator["default"].wrap(function requestForecast$(_context) {
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
          return call(_request["default"], _OpenWeather["default"].crForecastById(id));

        case 8:
          json = _context.sent;
          _context.next = 11;
          return put(_actions["default"].requestedOk(json, id));

        case 11:
          _context.next = 15;
          break;

        case 13:
          _context.next = 15;
          return put(_actions["default"].requestedInCache(id));

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          _context.next = 21;
          return put(_actions2["default"].showModal('ERROR', {
            errMsg: _context.t0.message
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, requestForecast, null, [[0, 17]]);
});

var watchForecastRequested =
/*#__PURE__*/
_regenerator["default"].mark(function watchForecastRequested() {
  return _regenerator["default"].wrap(function watchForecastRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(_actions.ACTION.FORECAST_REQUESTED, requestForecast);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, watchForecastRequested);
});

var _default = watchForecastRequested;
exports["default"] = _default;
//# sourceMappingURL=saga.js.map