"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _reduxSaga = require("redux-saga");

var _saga = _interopRequireDefault(require("./place/saga"));

var _saga2 = _interopRequireDefault(require("./forecast/saga"));

var _saga3 = _interopRequireDefault(require("./hourly/saga"));

var _saga4 = _interopRequireDefault(require("./uv/saga"));

var _saga5 = _interopRequireDefault(require("./settings/saga"));

var all = _reduxSaga.effects.all;

var rootSaga =
/*#__PURE__*/
_regenerator["default"].mark(function rootSaga() {
  return _regenerator["default"].wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return all([(0, _saga["default"])(), (0, _saga2["default"])(), (0, _saga3["default"])(), (0, _saga4["default"])(), (0, _saga5["default"])()]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, rootSaga);
});

var _default = rootSaga;
exports["default"] = _default;
//# sourceMappingURL=rootSaga.js.map