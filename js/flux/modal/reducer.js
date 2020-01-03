"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.errMsg = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _actions = require("./actions");

var INIT_STATE = {
  id: undefined
};

var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = INIT_STATE;
  }

  switch (action.type) {
    case _actions.ACTION.MODAL_SHOW:
      {
        var id = action.id,
            _errMsg = action.errMsg;
        state.id = id;
        state.errMsg = _errMsg;
        return (0, _extends2["default"])({}, state);
      }

    default:
      return state;
  }
};

var errMsg = function errMsg(state) {
  return state.errMsg;
};

exports.errMsg = errMsg;
var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map