"use strict";

exports.__esModule = true;
exports["default"] = exports.airForecastReqOk = exports.airForecastReqInCache = exports.airForecastReq = exports.ACTION_AIR_FORECAST_REQ_OK = exports.ACTION_AIR_FORECAST_REQ_INCACHE = exports.ACTION_AIR_FORECAST_REQ = void 0;
var ACTION_AIR_FORECAST_REQ = 'ACTION_AIR_FORECAST_REQ';
exports.ACTION_AIR_FORECAST_REQ = ACTION_AIR_FORECAST_REQ;
var ACTION_AIR_FORECAST_REQ_OK = 'ACTION_AIR_FORECAST_REQ_OK';
exports.ACTION_AIR_FORECAST_REQ_OK = ACTION_AIR_FORECAST_REQ_OK;
var ACTION_AIR_FORECAST_REQ_INCACHE = 'ACTION_AIR_FORECAST_REQ_INCACHE';
exports.ACTION_AIR_FORECAST_REQ_INCACHE = ACTION_AIR_FORECAST_REQ_INCACHE;

var airForecastReq = function airForecastReq() {
  return {
    type: ACTION_AIR_FORECAST_REQ
  };
};

exports.airForecastReq = airForecastReq;

var airForecastReqOk = function airForecastReqOk(forecast, id) {
  return {
    type: ACTION_AIR_FORECAST_REQ_OK,
    forecast: forecast,
    id: id
  };
};

exports.airForecastReqOk = airForecastReqOk;

var airForecastReqInCache = function airForecastReqInCache() {
  return {
    type: ACTION_AIR_FORECAST_REQ_INCACHE
  };
};

exports.airForecastReqInCache = airForecastReqInCache;
var actions = {
  requested: airForecastReq,
  requestedOk: airForecastReqOk,
  requestedInCache: airForecastReqInCache
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map