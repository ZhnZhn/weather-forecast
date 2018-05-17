'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var METRIC = '&units=metric';
var LANG = '&lang=en';
var PERIOD = '&cnt=7';
var BASE = 'https://api.openweathermap.org/data/2.5/';
var WEATHER = 'weather';
var FORECAST_DAILY = 'forecast/daily';
var FORECAST = 'forecast';
var BASE_V3 = 'https://api.openweathermap.org/v3/';
var UVI = 'uvi';
var CURRENT_JSON = 'current.json';

//lat: -29.916852233070163
//lon=149.9853515625

var DF = {
  LAT: 51.48,
  LNG: -0.13
};

var _apiKey = void 0;
var OpenWeather = {
  setApiKey: function setApiKey(apiKey) {
    _apiKey = apiKey;
    return Promise.resolve(true);
  },
  crForecast: function crForecast() {
    var lat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DF.LAT;
    var lon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DF.LNG;

    return '' + BASE + WEATHER + '?APPID=' + _apiKey + METRIC + LANG + '&lat=' + lat + '&lon=' + lon;
  },
  crForecastById: function crForecastById(id) {
    return '' + BASE + FORECAST_DAILY + '?APPID=' + _apiKey + PERIOD + METRIC + '&id=' + id + LANG;
  },
  crHourlyById: function crHourlyById(id) {
    return '' + BASE + FORECAST + '?APPID=' + _apiKey + METRIC + '&id=' + id + LANG;
  },
  crUV: function crUV() {
    var lat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DF.LAT;
    var lon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DF.LNG;

    //http://api.openweathermap.org/v3/uvi/40.7,-74.2/current.json?appid={your-api-key}
    return '' + BASE_V3 + UVI + '/' + Math.round(lat) + ',' + Math.round(lon) + '/' + CURRENT_JSON + '?APPID=' + _apiKey;
  }
};

exports.default = OpenWeather;
//# sourceMappingURL=OpenWeather.js.map