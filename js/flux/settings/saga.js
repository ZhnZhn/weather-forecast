"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _reduxSaga = require("redux-saga");

var _OpenWeather = _interopRequireDefault(require("../../api/OpenWeather"));

var _actions = _interopRequireWildcard(require("./actions"));

var throttle = _reduxSaga.effects.throttle,
    call = _reduxSaga.effects.call,
    put = _reduxSaga.effects.put;

var setSettings =
/*#__PURE__*/
_regenerator["default"].mark(function setSettings(action) {
  return _regenerator["default"].wrap(function setSettings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return call(_OpenWeather["default"].setApiKey, action.apiKey);

        case 2:
          _context.next = 4;
          return put(_actions["default"].setApiKey());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, setSettings);
});

var watchSettingSet =
/*#__PURE__*/
_regenerator["default"].mark(function watchSettingSet() {
  return _regenerator["default"].wrap(function watchSettingSet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return throttle(500, _actions.ACTION.SETTINGS_SET, setSettings);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, watchSettingSet);
});

var _default = watchSettingSet;
exports["default"] = _default;
//# sourceMappingURL=saga.js.map