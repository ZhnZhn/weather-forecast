'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byId = exports.recent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.ACTION.HOURLY_REQUESTED_OK:
      {
        state.recent = action.id;
        state[action.id] = action.hourly;
        return _extends({}, state);
      }
    default:
      return state;
  }
};

var recent = exports.recent = function recent(state) {
  return state.recent;
};
var byId = exports.byId = function byId(state, id) {
  return state[id];
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map