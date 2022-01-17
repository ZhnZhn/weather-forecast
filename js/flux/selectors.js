"use strict";

exports.__esModule = true;
exports.sUV = exports.sSettings = exports.sPlace = exports.sModal = exports.sHourly = exports.sForecast = exports.sAir = void 0;

var place = _interopRequireWildcard(require("./place/reducer"));

var forecast = _interopRequireWildcard(require("./forecast/reducer"));

var hourly = _interopRequireWildcard(require("./hourly/reducer"));

var air = _interopRequireWildcard(require("./air/reducer"));

var uv = _interopRequireWildcard(require("./uv/reducer"));

var settings = _interopRequireWildcard(require("./settings/reducer"));

var modal = _interopRequireWildcard(require("./modal/reducer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sPlace = {
  recent: function recent(state) {
    return place.recent(state.place);
  },
  byId: function byId(state, id) {
    return place.byId(state.place, id);
  },
  forecast: function forecast(state) {
    var recent = sPlace.recent(state);
    return recent ? sPlace.byId(state, recent) : void 0;
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
  },
  forecast: function forecast(state) {
    var recent = sForecast.recent(state);
    return recent ? sForecast.byId(state, recent) : void 0;
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
var sAir = {
  recent: function recent(state) {
    return air.recent(state.air);
  },
  byId: function byId(state, id) {
    return (air.byId(state.air, id) || {}).list;
  },
  forecast: function forecast(state) {
    var recent = sAir.recent(state);
    return recent ? sAir.byId(state, recent) : void 0;
  }
};
exports.sAir = sAir;
var sUV = {
  recent: function recent(state) {
    return uv.recent(state.uv);
  },
  byId: function byId(state, id) {
    return uv.byId(state.uv, id);
  },
  forecast: function forecast(state) {
    var recent = sUV.recent(state);
    return recent ? sUV.byId(state, recent) : void 0;
  }
};
exports.sUV = sUV;

var _getSettingsSlice = function _getSettingsSlice(state) {
  return state.settings;
};

var sSettings = {
  isApiKey: function isApiKey(state) {
    return settings.isApiKey(_getSettingsSlice(state));
  },
  isAir: function isAir(state) {
    return settings.isAir(_getSettingsSlice(state));
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