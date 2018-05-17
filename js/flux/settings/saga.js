'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxSaga = require('redux-saga');

var _OpenWeather = require('../../api/OpenWeather');

var _OpenWeather2 = _interopRequireDefault(_OpenWeather);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var throttle = _reduxSaga.effects.throttle,
    call = _reduxSaga.effects.call,
    put = _reduxSaga.effects.put;


var setSettings = /*#__PURE__*/regeneratorRuntime.mark(function setSettings(action) {
  return regeneratorRuntime.wrap(function setSettings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return call(_OpenWeather2.default.setApiKey, action.apiKey);

        case 2:
          _context.next = 4;
          return put(_actions2.default.setApiKey());

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, setSettings, this);
});

var watchSettingSet = /*#__PURE__*/regeneratorRuntime.mark(function watchSettingSet() {
  return regeneratorRuntime.wrap(function watchSettingSet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return throttle(500, _actions.ACTION.SETTINGS_SET, setSettings);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, watchSettingSet, this);
});

exports.default = watchSettingSet;
//# sourceMappingURL=saga.js.map