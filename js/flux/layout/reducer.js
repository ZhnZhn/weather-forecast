"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _actions = require("../modal/actions");

var _actions2 = require("./actions");

var INIT_STATE = {
  themeName: 'GREY',
  isPopupForecast: true,
  isSettings: false,
  isPushMenu: false
};

var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = INIT_STATE;
  }

  switch (action.type) {
    case _actions.ACTION.MODAL_SHOW:
      return action.id === 'SETTINGS' ? (0, _extends2["default"])({}, state, {}, {
        isSettings: true
      }) : state;

    case _actions2.ACTION.TOGGLE_LAYOUT:
      {
        var key = action.key;
        state[key] = !state[key];
        return (0, _extends2["default"])({}, state);
      }

    case _actions2.ACTION.SET_THEME_NAME:
      {
        state.themeName = action.themeName;
        return (0, _extends2["default"])({}, state);
      }

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map