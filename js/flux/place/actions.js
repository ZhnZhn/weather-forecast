"use strict";

exports.__esModule = true;
exports["default"] = exports.placeRequestedOk = exports.placeRequested = exports.ACTION = void 0;
var ACTION = {
  PLACE_REQUESTED: 'PLACE_REQUESTED',
  PLACE_REQUESTED_OK: 'PLACE_REQUESTED_OK'
};
exports.ACTION = ACTION;

var placeRequested = function placeRequested(payload) {
  return {
    type: ACTION.PLACE_REQUESTED,
    payload: payload
  };
};

exports.placeRequested = placeRequested;

var placeRequestedOk = function placeRequestedOk(forecast) {
  return {
    type: ACTION.PLACE_REQUESTED_OK,
    forecast: forecast
  };
};

exports.placeRequestedOk = placeRequestedOk;
var actions = {
  requested: placeRequested,
  requestedOk: placeRequestedOk
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map