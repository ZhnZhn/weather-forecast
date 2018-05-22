'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isApiKey = undefined;

var _reduxSaga = require('redux-saga');

var _selectors = require('./selectors');

var _actions = require('./layout/actions');

var _actions2 = _interopRequireDefault(_actions);

var _actions3 = require('./modal/actions');

var _actions4 = _interopRequireDefault(_actions3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var select = _reduxSaga.effects.select,
    put = _reduxSaga.effects.put;
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
            _context.next = 9;
            break;
          }

          _context.next = 6;
          return put(_actions2.default.toggleLayout('isSettings'));

        case 6:
          _context.next = 8;
          return put(_actions4.default.showModal('SETTINGS'));

        case 8:
          throw new Error('Not Set ApiKey');

        case 9:
          return _context.abrupt('return', true);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, isApiKey, this);
});
//# sourceMappingURL=gen.js.map