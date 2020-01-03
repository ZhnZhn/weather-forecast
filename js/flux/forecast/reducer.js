"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.cityCoordById = exports.listById = exports.recent = exports.byId = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _actions = require("./actions");

var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = {};
  }

  if (action === void 0) {
    action = {};
  }

  switch (action.type) {
    case _actions.ACTION.FORECAST_REQUESTED_OK:
      {
        state.recent = action.id;
        state[action.id] = action.forecast;
        return (0, _extends2["default"])({}, state);
      }

    case _actions.ACTION.FORECAST_REQUESTED_INCACHE:
      {
        state.recent = action.id;
        return (0, _extends2["default"])({}, state);
      }

    default:
      return state;
  }
};

var byId = function byId(state, id) {
  return state[id];
};

exports.byId = byId;

var recent = function recent(state) {
  return state.recent;
};

exports.recent = recent;

var listById = function listById(state, id) {
  return state[id].list;
};

exports.listById = listById;

var cityCoordById = function cityCoordById(state, id) {
  return state[id].city.coord;
};

exports.cityCoordById = cityCoordById;
var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map