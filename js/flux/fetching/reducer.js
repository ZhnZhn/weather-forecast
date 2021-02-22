"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _actions = require("../place/actions");

var _actions2 = require("../forecast/actions");

var _actions3 = require("../hourly/actions");

var _actions4 = require("../uv/actions");

var _actions5 = require("../modal/actions");

var _constants = require("./constants");

var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = _constants.FETCH.INITIAL;
  }

  switch (action.type) {
    case _actions5.ACTION.MODAL_SHOW:
      return action.id === 'ERROR' ? _constants.FETCH.FAILED : state;

    case _actions.ACTION.PLACE_REQUESTED:
    case _actions2.ACTION.FORECAST_REQUESTED:
    case _actions3.ACTION.HOURLY_REQUESTED:
    case _actions4.ACTION.UV_REQUESTED:
      return _constants.FETCH.LOADING;

    case _actions.ACTION.PLACE_REQUESTED_OK:
    case _actions2.ACTION.FORECAST_REQUESTED_OK:
    case _actions2.ACTION.FORECAST_REQUESTED_INCACHE:
    case _actions3.ACTION.HOURLY_REQUESTED_OK:
    case _actions3.ACTION.HOURLY_REQUESTED_INCACHE:
    case _actions4.ACTION.UV_REQUESTED_OK:
    case _actions4.ACTION.UV_REQUESTED_INCACHE:
      return _constants.FETCH.SUCCESS;

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map