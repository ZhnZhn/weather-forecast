'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxSaga = require('redux-saga');

var _saga = require('./place/saga');

var _saga2 = _interopRequireDefault(_saga);

var _saga3 = require('./forecast/saga');

var _saga4 = _interopRequireDefault(_saga3);

var _saga5 = require('./hourly/saga');

var _saga6 = _interopRequireDefault(_saga5);

var _saga7 = require('./uv/saga');

var _saga8 = _interopRequireDefault(_saga7);

var _saga9 = require('./settings/saga');

var _saga10 = _interopRequireDefault(_saga9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var all = _reduxSaga.effects.all;


var rootSaga = /*#__PURE__*/regeneratorRuntime.mark(function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return all([(0, _saga2.default)(), (0, _saga4.default)(), (0, _saga6.default)(), (0, _saga8.default)(), (0, _saga10.default)()]);

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, rootSaga, this);
});

exports.default = rootSaga;
//# sourceMappingURL=rootSaga.js.map