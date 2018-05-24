'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  PLACE_REQUESTED: 'PLACE_REQUESTED',
  PLACE_REQUESTED_OK: 'PLACE_REQUESTED_OK'
};

var placeRequested = exports.placeRequested = function placeRequested(payload) {
  return {
    type: ACTION.PLACE_REQUESTED, payload: payload
  };
};
var placeRequestedOk = exports.placeRequestedOk = function placeRequestedOk(forecast) {
  return {
    type: ACTION.PLACE_REQUESTED_OK, forecast: forecast
  };
};

var actions = {
  requested: placeRequested,
  requestedOk: placeRequestedOk
};

exports.default = actions;
//# sourceMappingURL=actions.js.map