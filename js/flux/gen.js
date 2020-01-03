"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isApiKey = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _reduxSaga = require("redux-saga");

var _selectors = require("./selectors");

var select = _reduxSaga.effects.select;

var isApiKey =
/*#__PURE__*/
_regenerator["default"].mark(function isApiKey() {
  return _regenerator["default"].wrap(function isApiKey$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return select(_selectors.sSettings.isApiKey);

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
//# sourceMappingURL=gen.js.map