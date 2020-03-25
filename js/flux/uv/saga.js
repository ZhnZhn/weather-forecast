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

var fetchUV =
/*#__PURE__*/
_regenerator["default"].mark(function fetchUV(action) {
  var state, recent, recentUV, coord, json;
  return _regenerator["default"].wrap(function fetchUV$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.select)();

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
          return (0, _effects.call)(_request["default"], _OpenWeather["default"].crUV(coord.lat, coord.lon));

        case 10:
          json = _context.sent;
          _context.next = 13;
          return (0, _effects.put)(_actions["default"].requestedOk(json, recent));

        case 13:
          _context.next = 17;
          break;

        case 15:
          _context.next = 17;
          return (0, _effects.put)(_actions["default"].requestedInCache());

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          _context.next = 23;
          return (0, _effects.put)(_actions2["default"].showModal('ERROR', {
            errMsg: _context.t0.message
          }));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, fetchUV, null, [[0, 19]]);
});

var watchAction =
/*#__PURE__*/
_regenerator["default"].mark(function watchAction() {
  return _regenerator["default"].wrap(function watchAction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_actions.ACTION.UV_REQUESTED, fetchUV);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, watchAction);
});

var _default = watchAction;
exports["default"] = _default;
//# sourceMappingURL=saga.js.map