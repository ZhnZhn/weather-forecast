"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isApiKey = exports.isAirQuality = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _selectors = require("./selectors");

var isApiKey = /*#__PURE__*/_regenerator["default"].mark(function isApiKey() {
  return _regenerator["default"].wrap(function isApiKey$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(_selectors.sSettings.isApiKey);

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, isApiKey);
});

exports.isApiKey = isApiKey;

var isAirQuality = /*#__PURE__*/_regenerator["default"].mark(function isAirQuality() {
  return _regenerator["default"].wrap(function isAirQuality$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.select)(_selectors.sSettings.isAir);

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, isAirQuality);
});

exports.isAirQuality = isAirQuality;
//# sourceMappingURL=gen.js.map