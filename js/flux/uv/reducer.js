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
    case _actions.ACTION.UV_REQUESTED_OK:
      {
        state.recent = action.id;
        state[action.id] = action.json;
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