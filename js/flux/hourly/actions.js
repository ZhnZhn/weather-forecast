"use strict";

exports.__esModule = true;
exports["default"] = exports.hourlyRequestedInCache = exports.hourlyRequestedOk = exports.hourlyRequested = exports.ACTION = void 0;
var ACTION = {
  HOURLY_REQUESTED: 'HOURLY_REQUESTED',
  HOURLY_REQUESTED_OK: 'HOURLY_REQUESTED_OK',
  HOURLY_REQUESTED_INCACHE: 'HOURLY_REQUESTED_INCACHE'
};
exports.ACTION = ACTION;

var hourlyRequested = function hourlyRequested() {
  return {
    type: ACTION.HOURLY_REQUESTED
  };
};

exports.hourlyRequested = hourlyRequested;

var hourlyRequestedOk = function hourlyRequestedOk(hourly, id) {
  return {
    type: ACTION.HOURLY_REQUESTED_OK,
    hourly: hourly,
    id: id
  };
};

exports.hourlyRequestedOk = hourlyRequestedOk;

var hourlyRequestedInCache = function hourlyRequestedInCache() {
  return {
    type: ACTION.HOURLY_REQUESTED_INCACHE
  };
};

exports.hourlyRequestedInCache = hourlyRequestedInCache;
var actions = {
  requested: hourlyRequested,
  requestedOk: hourlyRequestedOk,
  requestedInCache: hourlyRequestedInCache
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map