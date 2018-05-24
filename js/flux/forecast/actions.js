'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  FORECAST_REQUESTED: 'FORECAST_REQUESTED',
  FORECAST_REQUESTED_INCACHE: 'FORECAST_REQUESTED_INCACHE',
  FORECAST_REQUESTED_OK: 'FORECAST_REQUESTED_OK'
};

var forecastRequested = exports.forecastRequested = function forecastRequested(id) {
  return {
    type: ACTION.FORECAST_REQUESTED, id: id
  };
};
var forecastRequestedInCache = exports.forecastRequestedInCache = function forecastRequestedInCache(id) {
  return {
    type: ACTION.FORECAST_REQUESTED_INCACHE, id: id
  };
};
var forecastRequestedOk = exports.forecastRequestedOk = function forecastRequestedOk(forecast, id) {
  return {
    type: ACTION.FORECAST_REQUESTED_OK, forecast: forecast, id: id
  };
};

var actions = {
  requested: forecastRequested,
  requestedInCache: forecastRequestedInCache,
  requestedOk: forecastRequestedOk
};

exports.default = actions;
//# sourceMappingURL=actions.js.map