"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.byId = exports.recent = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _actions = require("./actions");

var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = {};
  }

  switch (action.type) {
    case _actions.ACTION.PLACE_REQUESTED_OK:
      {
        var _action$forecast = action.forecast,
            forecast = _action$forecast === void 0 ? {} : _action$forecast;
        var _forecast$id = forecast.id,
            id = _forecast$id === void 0 ? 'id' : _forecast$id;
        state.recent = id;
        state[id] = forecast;
        return (0, _extends2["default"])({}, state);
      }

    default:
      return state;
  }
};

var recent = function recent(state) {
  return state.recent;
};

exports.recent = recent;

var byId = function byId(state, id) {
  return state[id];
};

exports.byId = byId;
var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map