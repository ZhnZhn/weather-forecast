"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _redux = require("redux");

var _reducer = _interopRequireDefault(require("./fetching/reducer"));

var _reducer2 = _interopRequireDefault(require("./layout/reducer"));

var _reducer3 = _interopRequireDefault(require("./modal/reducer"));

var _reducer4 = _interopRequireDefault(require("./settings/reducer"));

var _reducer5 = _interopRequireDefault(require("./place/reducer"));

var _reducer6 = _interopRequireDefault(require("./forecast/reducer"));

var _reducer7 = _interopRequireDefault(require("./hourly/reducer"));

var _reducer8 = _interopRequireDefault(require("./uv/reducer"));

var reducer = (0, _redux.combineReducers)({
  fetching: _reducer["default"],
  layout: _reducer2["default"],
  modal: _reducer3["default"],
  settings: _reducer4["default"],
  place: _reducer5["default"],
  forecast: _reducer6["default"],
  hourly: _reducer7["default"],
  uv: _reducer8["default"]
});
var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=rootReducer.js.map