'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var INIT_STATE = {
  id: undefined
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _actions.ACTION.MODAL_SHOW:
      state.id = action.id;
      return _extends({}, state);
    default:
      return state;
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map