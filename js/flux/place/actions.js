'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  PLACE_REQUESTED: 'PLACE_REQUESTED',
  PLACE_REQUESTED_OK: 'PLACE_REQUESTED_OK',
  PLACE_REQUESTED_FAIL: 'PLACE_REQUESTED_FAIL'
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
var placeRequestedFail = exports.placeRequestedFail = function placeRequestedFail(message) {
  return {
    type: ACTION.PLACE_REQUESTED_FAIL, message: message
  };
};

var actions = {
  requested: placeRequested,
  requestedOk: placeRequestedOk,
  requestedFail: placeRequestedFail
};

exports.default = actions;
//# sourceMappingURL=actions.js.map