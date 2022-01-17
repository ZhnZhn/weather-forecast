"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _OpenWeather = _interopRequireDefault(require("../../api/OpenWeather"));

var _actions = _interopRequireWildcard(require("./actions"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var setSettings = /*#__PURE__*/_regenerator["default"].mark(function setSettings(action) {
  return _regenerator["default"].wrap(function setSettings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)(_OpenWeather["default"].setApiKey, action.apiKey);

        case 2:
          _context.next = 4;
          return (0, _effects.put)(_actions["default"].setApiKey());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, setSettings);
});

var watchSettingSet = /*#__PURE__*/_regenerator["default"].mark(function watchSettingSet() {
  return _regenerator["default"].wrap(function watchSettingSet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.throttle)(500, _actions.ACTION_SETTINGS_SET, setSettings);

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