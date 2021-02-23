"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.sModal = exports.sSettings = exports.sUV = exports.sHourly = exports.sForecast = exports.sPlace = void 0;

var place = _interopRequireWildcard(require("./place/reducer"));

var forecast = _interopRequireWildcard(require("./forecast/reducer"));

var hourly = _interopRequireWildcard(require("./hourly/reducer"));

var uv = _interopRequireWildcard(require("./uv/reducer"));

var settings = _interopRequireWildcard(require("./settings/reducer"));

var modal = _interopRequireWildcard(require("./modal/reducer"));

var sPlace = {
  recent: function recent(state) {
    return place.recent(state.place);
  },
  byId: function byId(state, id) {
    return place.byId(state.place, id);
  }
};
exports.sPlace = sPlace;
var sForecast = {
  byId: function byId(state, id) {
    return forecast.byId(state.forecast, id);
  },
  recent: function recent(state) {
    return forecast.recent(state.forecast);
  },
  listById: function listById(state, id) {
    return forecast.listById(state.forecast, id);
  },
  cityCoordById: function cityCoordById(state, id) {
    return forecast.cityCoordById(state.forecast, id);
  }
};
exports.sForecast = sForecast;
var sHourly = {
  recent: function recent(state) {
    return hourly.recent(state.hourly);
  },
  byId: function byId(state, id) {
    return (hourly.byId(state.hourly, id) || {}).list;
  },
  forecast: function forecast(state) {
    var recent = sHourly.recent(state);
    return recent ? sHourly.byId(state, recent) : void 0;
  }
};
exports.sHourly = sHourly;
var sUV = {
  recent: function recent(state) {
    return uv.recent(state.uv);
  },
  byId: function byId(state, id) {
    return uv.byId(state.uv, id);
  }
};
exports.sUV = sUV;
var sSettings = {
  isApiKey: function isApiKey(state) {
    return settings.isApiKey(state.settings);
  }
};
exports.sSettings = sSettings;
var sModal = {
  errMsg: function errMsg(state) {
    return modal.errMsg(state.modal);
  }
};
exports.sModal = sModal;
//# sourceMappingURL=selectors.js.map