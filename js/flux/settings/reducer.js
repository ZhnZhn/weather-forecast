"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isApiKey = exports.isAir = exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _actions = require("./actions");

var INITIAL_STATE = {
  isApiKey: false,
  isAir: false
};

var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = INITIAL_STATE;
  }

  switch (action.type) {
    case _actions.ACTION_SETTINGS_SET_APIKEY:
      {
        return (0, _extends2["default"])({}, state, {
          isApiKey: true
        });
      }

    case _actions.ACTION_SETTINGS_SET_AIR:
      {
        return (0, _extends2["default"])({}, state, {
          isAir: action.is
        });
      }

    default:
      return state;
  }
};

var isApiKey = function isApiKey(state) {
  return state.isApiKey;
};

exports.isApiKey = isApiKey;

var isAir = function isAir(state) {
  return state.isAir;
};

exports.isAir = isAir;
var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map