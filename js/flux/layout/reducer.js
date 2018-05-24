'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('../modal/actions');

var _actions2 = require('./actions');

var INIT_STATE = {
  themeName: 'GREY',
  isPopupForecast: true,
  isSettings: false,
  isPushMenu: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _actions.ACTION.MODAL_SHOW:
      return action.id === 'SETTINGS' ? _extends({}, state, { isSettings: true }) : state;
    case _actions2.ACTION.TOGGLE_LAYOUT:
      {
        var key = action.key;

        state[key] = !state[key];
        return _extends({}, state);
      }
    case _actions2.ACTION.SET_THEME_NAME:
      {
        state.themeName = action.themeName;
        return _extends({}, state);
      }
    default:
      return state;
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map