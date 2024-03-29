"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var METRIC = '&units=metric',
    LANG = '&lang=en',
    PERIOD = '&cnt=7',
    BASE_URL = 'https://api.openweathermap.org/data/2.5/',
    WEATHER = 'weather',
    AIR_POLLUTION = 'air_pollution',
    FORECAST_DAILY = 'forecast/daily',
    FORECAST = 'forecast',
    UVI = 'uvi';
var DF = {
  LAT: 51.48,
  LNG: -0.13
};

var _roundBy = function _roundBy(n, by) {
  if (by === void 0) {
    by = 2;
  }

  return typeof n === 'number' && n - n === 0 ? parseFloat(n.toFixed(by)) : n;
};

var _apiKey;

var OpenWeather = {
  setApiKey: function setApiKey(apiKey) {
    _apiKey = apiKey;
    return Promise.resolve(true);
  },
  crForecast: function crForecast(lat, lon) {
    if (lat === void 0) {
      lat = DF.LAT;
    }

    if (lon === void 0) {
      lon = DF.LNG;
    }

    return "" + BASE_URL + WEATHER + "?appid=" + _apiKey + METRIC + LANG + "&lat=" + lat + "&lon=" + lon;
  },
  crForecastById: function crForecastById(id) {
    return "" + BASE_URL + FORECAST_DAILY + "?appid=" + _apiKey + PERIOD + METRIC + "&id=" + id + LANG;
  },
  crAirQualityIndex: function crAirQualityIndex(lat, lon) {
    if (lat === void 0) {
      lat = DF.LAT;
    }

    if (lon === void 0) {
      lon = DF.LNG;
    }

    return "" + BASE_URL + AIR_POLLUTION + "?appid=" + _apiKey + METRIC + LANG + "&lat=" + lat + "&lon=" + lon;
  },
  crAirForecast: function crAirForecast(lat, lon) {
    if (lat === void 0) {
      lat = DF.LAT;
    }

    if (lon === void 0) {
      lon = DF.LNG;
    }

    return "" + BASE_URL + AIR_POLLUTION + "/" + FORECAST + "?appid=" + _apiKey + LANG + "&lat=" + lat + "&lon=" + lon;
  },
  crHourlyById: function crHourlyById(id) {
    return "" + BASE_URL + FORECAST + "?appid=" + _apiKey + METRIC + "&id=" + id + LANG;
  },
  crUV: function crUV(lat, lon) {
    if (lat === void 0) {
      lat = DF.LAT;
    }

    if (lon === void 0) {
      lon = DF.LNG;
    }

    return "" + BASE_URL + UVI + "/" + FORECAST + "?lat=" + _roundBy(lat) + "&lon=" + _roundBy(lon) + "&appid=" + _apiKey;
  }
};
var _default = OpenWeather;
exports["default"] = _default;
//# sourceMappingURL=OpenWeather.js.map