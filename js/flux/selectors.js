'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sSettings = exports.sUV = exports.sHourly = exports.sForecast = exports.sPlace = undefined;

var _reducer = require('./place/reducer');

var place = _interopRequireWildcard(_reducer);

var _reducer2 = require('./forecast/reducer');

var forecast = _interopRequireWildcard(_reducer2);

var _reducer3 = require('./hourly/reducer');

var hourly = _interopRequireWildcard(_reducer3);

var _reducer4 = require('./uv/reducer');

var uv = _interopRequireWildcard(_reducer4);

var _reducer5 = require('./settings/reducer');

var settings = _interopRequireWildcard(_reducer5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var sPlace = exports.sPlace = {
  recent: function recent(state) {
    return place.recent(state.place);
  },
  byId: function byId(state, id) {
    return place.byId(state.place, id);
  }
};

var sForecast = exports.sForecast = {
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

var sHourly = exports.sHourly = {
  recent: function recent(state) {
    return hourly.recent(state.hourly);
  },
  byId: function byId(state, id) {
    return hourly.byId(state.hourly, id);
  }
};

var sUV = exports.sUV = {
  recent: function recent(state) {
    return uv.recent(state.uv);
  },
  byId: function byId(state, id) {
    return uv.byId(state.uv, id);
  }
};

var sSettings = exports.sSettings = {
  isApiKey: function isApiKey(state) {
    return settings.isApiKey(state.settings);
  }
};
//# sourceMappingURL=selectors.js.map