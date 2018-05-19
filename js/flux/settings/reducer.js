'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isApiKey = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var INIT_STATE = {
  isApiKey: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _actions.ACTION.SETTINGS_SET_APIKEY:
      {
        state.isApiKey = true;
        return _extends({}, state);
      }
    default:
      return state;
  }
};

var isApiKey = exports.isApiKey = function isApiKey(state) {
  return state.isApiKey;
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map