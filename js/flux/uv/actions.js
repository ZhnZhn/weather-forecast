'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  UV_REQUESTED: 'UV_REQUESTED',
  UV_REQUESTED_OK: 'UV_REQUESTED_OK',
  UV_REQUESTED_INCACHE: 'UV_REQUESTED_INCACHE',
  UV_REQUESTED_FAIL: 'UV_REQUESTED_FAIL'
};

var uvRequested = exports.uvRequested = function uvRequested() {
  return {
    type: ACTION.UV_REQUESTED
  };
};
var uvRequestedOk = exports.uvRequestedOk = function uvRequestedOk(json, id) {
  return {
    type: ACTION.UV_REQUESTED_OK, json: json, id: id
  };
};
var uvRequestedInCache = exports.uvRequestedInCache = function uvRequestedInCache() {
  return {
    type: ACTION.UV_REQUESTED_INCACHE
  };
};
var uvRequestedFail = exports.uvRequestedFail = function uvRequestedFail() {
  return {
    type: ACTION.UV_REQUESTED_FAIL
  };
};

var actions = {
  requested: uvRequested,
  requestedOk: uvRequestedOk,
  requestedInCache: uvRequestedInCache,
  requestedFail: uvRequestedFail
};

exports.default = actions;
//# sourceMappingURL=actions.js.map