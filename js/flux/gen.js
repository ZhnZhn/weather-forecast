'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isApiKey = undefined;

var _reduxSaga = require('redux-saga');

var _selectors = require('./selectors');

var select = _reduxSaga.effects.select;
var isApiKey = /*#__PURE__*/exports.isApiKey = regeneratorRuntime.mark(function isApiKey() {
  var is;
  return regeneratorRuntime.wrap(function isApiKey$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return select(_selectors.sSettings.isApiKey);

        case 2:
          is = _context.sent;

          if (is) {
            _context.next = 5;
            break;
          }

          throw new Error('Not Set ApiKey');

        case 5:
          return _context.abrupt('return', true);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, isApiKey, this);
});
//# sourceMappingURL=gen.js.map