'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducer = require('./fetching/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require('./layout/reducer');

var _reducer4 = _interopRequireDefault(_reducer3);

var _reducer5 = require('./modal/reducer');

var _reducer6 = _interopRequireDefault(_reducer5);

var _reducer7 = require('./settings/reducer');

var _reducer8 = _interopRequireDefault(_reducer7);

var _reducer9 = require('./place/reducer');

var _reducer10 = _interopRequireDefault(_reducer9);

var _reducer11 = require('./forecast/reducer');

var _reducer12 = _interopRequireDefault(_reducer11);

var _reducer13 = require('./hourly/reducer');

var _reducer14 = _interopRequireDefault(_reducer13);

var _reducer15 = require('./uv/reducer');

var _reducer16 = _interopRequireDefault(_reducer15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({
  fetching: _reducer2.default, layout: _reducer4.default, modal: _reducer6.default, settings: _reducer8.default,
  place: _reducer10.default, forecast: _reducer12.default, hourly: _reducer14.default, uv: _reducer16.default
});

exports.default = reducer;
//# sourceMappingURL=rootReducer.js.map