"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _gen = require("../gen");

var _OpenWeather = _interopRequireDefault(require("../../api/OpenWeather"));

var _actions = _interopRequireWildcard(require("./actions"));

var _actions2 = _interopRequireDefault(require("../modal/actions"));

var _request = _interopRequireDefault(require("../../affects/request"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _setAirQualityTo = function _setAirQualityTo(forecast, airQuality) {
  var _ref = airQuality || {},
      _aqiList = _ref.list,
      _aqi = (_aqiList || [])[0];

  forecast.aqi = _aqi;
};

var requestPlace = /*#__PURE__*/_regenerator["default"].mark(function requestPlace(action) {
  var _isApiKey, payload, _ref2, lat, lot, forecast, _isAirQuality, airQuality;

  return _regenerator["default"].wrap(function requestPlace$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.delegateYield((0, _gen.isApiKey)(), "t0", 2);

        case 2:
          _isApiKey = _context.t0;

          if (!_isApiKey) {
            _context.next = 24;
            break;
          }

          payload = action.payload;
          _ref2 = payload || {};
          lat = _ref2.lat;
          lot = _ref2.lot;
          _context.next = 10;
          return (0, _effects.call)(_request["default"], _OpenWeather["default"].crForecast(lat, lot));

        case 10:
          forecast = _context.sent;
          return _context.delegateYield((0, _gen.isAirQuality)(), "t1", 12);

        case 12:
          _isAirQuality = _context.t1;

          if (!_isAirQuality) {
            _context.next = 20;
            break;
          }

          _context.next = 16;
          return (0, _effects.delay)(5000);

        case 16:
          _context.next = 18;
          return (0, _effects.call)(_request["default"], _OpenWeather["default"].crAirQualityIndex(lat, lot));

        case 18:
          airQuality = _context.sent;

          _setAirQualityTo(forecast, airQuality);

        case 20:
          _context.next = 22;
          return (0, _effects.put)(_actions["default"].requestedOk(forecast));

        case 22:
          _context.next = 26;
          break;

        case 24:
          _context.next = 26;
          return (0, _effects.put)(_actions2["default"].showModal('SETTINGS'));

        case 26:
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t2 = _context["catch"](0);
          _context.next = 32;
          return (0, _effects.put)(_actions2["default"].showModal('ERROR', {
            errMsg: _context.t2.message
          }));

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, requestPlace, null, [[0, 28]]);
});

var watchPlaceRequested = /*#__PURE__*/_regenerator["default"].mark(function watchPlaceRequested() {
  return _regenerator["default"].wrap(function watchPlaceRequested$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_actions.ACTION.PLACE_REQUESTED, requestPlace);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, watchPlaceRequested);
});

var _default = watchPlaceRequested;
exports["default"] = _default;
//# sourceMappingURL=saga.js.map