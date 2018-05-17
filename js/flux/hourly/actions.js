'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  HOURLY_REQUESTED: 'HOURLY_REQUESTED',
  HOURLY_REQUESTED_OK: 'HOURLY_REQUESTED_OK',
  HOURLY_REQUESTED_INCACHE: 'HOURLY_REQUESTED_INCACHE',
  HOURLY_REQUESTED_FAIL: 'HOURLY_REQUESTED_FAIL'
};

var hourlyRequested = exports.hourlyRequested = function hourlyRequested() {
  return {
    type: ACTION.HOURLY_REQUESTED
  };
};
var hourlyRequestedOk = exports.hourlyRequestedOk = function hourlyRequestedOk(hourly, id) {
  return {
    type: ACTION.HOURLY_REQUESTED_OK, hourly: hourly, id: id
  };
};
var hourlyRequestedInCache = exports.hourlyRequestedInCache = function hourlyRequestedInCache() {
  return {
    type: ACTION.HOURLY_REQUESTED_INCACHE
  };
};
var hourlyRequestedFail = exports.hourlyRequestedFail = function hourlyRequestedFail(msg) {
  return {
    type: ACTION.HOURLY_REQUESTED_FAIL, msg: msg
  };
};

var actions = {
  requested: hourlyRequested,
  requestedOk: hourlyRequestedOk,
  requestedInCache: hourlyRequestedInCache,
  requestedFail: hourlyRequestedFail
};

exports.default = actions;
//# sourceMappingURL=actions.js.map