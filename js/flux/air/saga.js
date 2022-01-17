"use strict";

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var requestAirForecast = /*#__PURE__*/_regenerator["default"].mark(function requestAirForecast(action) {
  var state, recent, recentAirForecast, _sForecast$cityCoordB, lon, lat, json;

  return _regenerator["default"].wrap(function requestAirForecast$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.select)();

        case 3:
          state = _context.sent;
          recent = _selectors.sForecast.recent(state);
          recentAirForecast = _selectors.sAir.recent(state);

          if (!(recent && recentAirForecast !== recent)) {
            _context.next = 16;
            break;
          }

          _sForecast$cityCoordB = _selectors.sForecast.cityCoordById(state, recent), lon = _sForecast$cityCoordB.lon, lat = _sForecast$cityCoordB.lat;

          if (!(lon && lat)) {
            _context.next = 14;
            break;
          }

          _context.next = 11;
          return (0, _effects.call)(_request["default"], _OpenWeather["default"].crAirForecast(lat, lon));

        case 11:
          json = _context.sent;
          _context.next = 14;
          return (0, _effects.put)(_actions["default"].requestedOk(json, recent));

        case 14:
          _context.next = 18;
          break;

        case 16:
          _context.next = 18;
          return (0, _effects.put)(_actions["default"].requestedInCache(recent));

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          _context.next = 24;
          return (0, _effects.put)(_actions2["default"].showModal('ERROR', {
            errMsg: _context.t0.message
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, requestAirForecast, null, [[0, 20]]);
});

var watchHourlyRequested = /*#__PURE__*/_regenerator["default"].mark(function watchHourlyRequested() {
  return _regenerator["default"].wrap(function watchHourlyRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_actions.ACTION_AIR_FORECAST_REQ, requestAirForecast);

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