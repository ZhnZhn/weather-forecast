"use strict";

exports.__esModule = true;
exports["default"] = exports.forecastRequestedOk = exports.forecastRequestedInCache = exports.forecastRequested = exports.ACTION = void 0;
var ACTION = {
  FORECAST_REQUESTED: 'FORECAST_REQUESTED',
  FORECAST_REQUESTED_INCACHE: 'FORECAST_REQUESTED_INCACHE',
  FORECAST_REQUESTED_OK: 'FORECAST_REQUESTED_OK'
};
exports.ACTION = ACTION;

var forecastRequested = function forecastRequested(id) {
  return {
    type: ACTION.FORECAST_REQUESTED,
    id: id
  };
};

exports.forecastRequested = forecastRequested;

var forecastRequestedInCache = function forecastRequestedInCache(id) {
  return {
    type: ACTION.FORECAST_REQUESTED_INCACHE,
    id: id
  };
};

exports.forecastRequestedInCache = forecastRequestedInCache;

var forecastRequestedOk = function forecastRequestedOk(forecast, id) {
  return {
    type: ACTION.FORECAST_REQUESTED_OK,
    forecast: forecast,
    id: id
  };
};

exports.forecastRequestedOk = forecastRequestedOk;
var actions = {
  requested: forecastRequested,
  requestedInCache: forecastRequestedInCache,
  requestedOk: forecastRequestedOk
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map