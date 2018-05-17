'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cityCoordById = exports.listById = exports.recent = exports.byId = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.ACTION.FORECAST_REQUESTED_OK:
      {
        state.recent = action.id;
        state[action.id] = action.forecast;
        return _extends({}, state);
      }
    case _actions.ACTION.FORECAST_REQUESTED_INCACHE:
      {
        state.recent = action.id;
        return _extends({}, state);
      }
    default:
      return state;
  }
};

var byId = exports.byId = function byId(state, id) {
  return state[id];
};
var recent = exports.recent = function recent(state) {
  return state.recent;
};
var listById = exports.listById = function listById(state, id) {
  return state[id].list;
};
var cityCoordById = exports.cityCoordById = function cityCoordById(state, id) {
  return state[id].city.coord;
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map