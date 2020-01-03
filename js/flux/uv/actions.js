"use strict";

exports.__esModule = true;
exports["default"] = exports.uvRequestedInCache = exports.uvRequestedOk = exports.uvRequested = exports.ACTION = void 0;
var ACTION = {
  UV_REQUESTED: 'UV_REQUESTED',
  UV_REQUESTED_OK: 'UV_REQUESTED_OK',
  UV_REQUESTED_INCACHE: 'UV_REQUESTED_INCACHE'
};
exports.ACTION = ACTION;

var uvRequested = function uvRequested() {
  return {
    type: ACTION.UV_REQUESTED
  };
};

exports.uvRequested = uvRequested;

var uvRequestedOk = function uvRequestedOk(json, id) {
  return {
    type: ACTION.UV_REQUESTED_OK,
    json: json,
    id: id
  };
};

exports.uvRequestedOk = uvRequestedOk;

var uvRequestedInCache = function uvRequestedInCache() {
  return {
    type: ACTION.UV_REQUESTED_INCACHE
  };
};

exports.uvRequestedInCache = uvRequestedInCache;
var actions = {
  requested: uvRequested,
  requestedOk: uvRequestedOk,
  requestedInCache: uvRequestedInCache
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map