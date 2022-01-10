"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _dompurify = _interopRequireDefault(require("dompurify"));

var _dt = _interopRequireDefault(require("../utils/dt"));

var sanitize = _dompurify["default"].sanitize;
var NO_DATA = 'No data';

var _isNumberNotZero = function _isNumberNotZero(n) {
  return typeof n === 'number' && n !== 0;
};

var _getByPropFromArr = function _getByPropFromArr(arr, prop, i, df) {
  if (arr === void 0) {
    arr = [];
  }

  if (i === void 0) {
    i = 0;
  }

  if (df === void 0) {
    df = NO_DATA;
  }

  return arr && arr[i] && arr[i][prop] || df;
};

var _crVane = function _crVane(deg) {
  return "<svg xmlns=\"http://www.w3.org/2000/svg\"\n       viewBox=\"0 0 17 18\" width=\"100%\" height=\"100%\"\n       preserveAspectRatio=\"none\" aria-labelledby=\"title\"\n       class=\"icon__popup__vane\"\n       style=\"transform:rotate(" + deg + "deg);position:relative;top:4px;\"\n  >\n     <title id=\"title\">Icon Wind Vane</title>\n     <path\n        d=\"M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0\"\n     >\n  </svg>";
};

var _isNaN = function _isNaN(n) {
  return n - n !== 0;
};

var _crTemperature = function _crTemperature(t, fl) {
  var _t = parseFloat(t),
      _fl = parseFloat(fl),
      _difference = _t - _fl;

  if (_isNaN(_t)) {
    return NO_DATA;
  }

  return _difference < -1 || _difference > 1 ? t + "&nbsp;(Feels&nbsp;Like&nbsp;" + fl + ")&nbsp;\xB0C" : t + "&nbsp;\xB0C";
};

var _crCaptionConfig = function _crCaptionConfig(id, name, country) {
  var _captionCl = '',
      _captionOnClick = '',
      _captionCityDiv = '';

  if (_isNumberNotZero(id)) {
    _captionCl = 'marker__caption__not-empty';
    _captionOnClick = "weather.fnFetchForecast(" + id + ")";
    _captionCityDiv = "<div class=\"marker__caption__city\">" + name + ":" + country + "</div>";
  }

  return [_captionCl, _captionOnClick, _captionCityDiv];
};

var _isEmptyValue = function _isEmptyValue(v) {
  return v == null || v === '';
};

var _crWindSpeed = function _crWindSpeed(speed, gust) {
  if (_isEmptyValue(speed)) {
    return '';
  }

  var _gust = _isEmptyValue(gust) ? '' : "-" + gust;

  return "" + speed + _gust + "m/s";
};

var marker = {
  fDivIcon: function fDivIcon(w) {
    var _ref = w || {},
        _ref$weather = _ref.weather,
        weather = _ref$weather === void 0 ? [] : _ref$weather,
        main = _ref.main,
        wind = _ref.wind,
        _ref2 = main || {},
        _ref2$temp = _ref2.temp,
        temp = _ref2$temp === void 0 ? '' : _ref2$temp,
        _ref2$pressure = _ref2.pressure,
        pressure = _ref2$pressure === void 0 ? '' : _ref2$pressure,
        _ref3 = wind || {},
        _ref3$deg = _ref3.deg,
        deg = _ref3$deg === void 0 ? 0 : _ref3$deg,
        _ref3$speed = _ref3.speed,
        speed = _ref3$speed === void 0 ? '' : _ref3$speed,
        icon = _getByPropFromArr(weather, 'icon');

    return sanitize("<div style=\"position:relative;top:-45px;left:-25px;font-size: 15px;font-weight:bold;\">\n       <img src=./img/" + icon + ".png style=\"width:60px;height:60px;\"></img>\n       <div style=\"position:absolute; top:5px; left: 50px; width: 90px; line-height: 1.2;\">\n         <div style=\"color:#ff9800;\">" + temp + "&nbsp;\u2103</div>\n         <div style=\"color:#3f51b5;\">" + pressure + "&nbsp;hPa</div>\n         <div>\n            " + _crVane(deg) + "\n            <span style=\"color:#3f51b5;\">" + speed + "m/s<span>\n         </div>\n       </div>\n     </div>");
  },
  fPopup: function fPopup(w, themeName) {
    var _ref4 = w || {},
        id = _ref4.id,
        _ref4$name = _ref4.name,
        name = _ref4$name === void 0 ? '' : _ref4$name,
        sys = _ref4.sys,
        msc = _ref4.dt,
        wind = _ref4.wind,
        weather = _ref4.weather,
        main = _ref4.main,
        clouds = _ref4.clouds,
        _ref5 = sys || {},
        _ref5$country = _ref5.country,
        country = _ref5$country === void 0 ? '' : _ref5$country,
        description = _getByPropFromArr(weather, 'description'),
        _ref6 = main || {},
        _ref6$temp = _ref6.temp,
        temp = _ref6$temp === void 0 ? '' : _ref6$temp,
        _ref6$pressure = _ref6.pressure,
        pressure = _ref6$pressure === void 0 ? '' : _ref6$pressure,
        feels_like = _ref6.feels_like,
        _ref6$humidity = _ref6.humidity,
        humidity = _ref6$humidity === void 0 ? '' : _ref6$humidity,
        _ref7 = wind || {},
        _ref7$deg = _ref7.deg,
        deg = _ref7$deg === void 0 ? 0 : _ref7$deg,
        speed = _ref7.speed,
        gust = _ref7.gust,
        _ref8 = clouds || {},
        _ref8$all = _ref8.all,
        cloudsAll = _ref8$all === void 0 ? '' : _ref8$all,
        icon = _getByPropFromArr(weather, 'icon'),
        _crCaptionConfig2 = _crCaptionConfig(id, sanitize(name), sanitize(country)),
        _captionCl = _crCaptionConfig2[0],
        _captionOnClick = _crCaptionConfig2[1],
        _captionCityDiv = _crCaptionConfig2[2],
        _icon = sanitize(icon),
        _description = sanitize(description),
        _clouds = sanitize(cloudsAll),
        _pressure = sanitize(pressure),
        _deg = sanitize(deg),
        _windSpeed = _crWindSpeed(sanitize(speed), sanitize(gust)),
        _temp = _crTemperature(sanitize(temp), sanitize(feels_like)),
        _humidity = sanitize(humidity);

    return "<div class=\"marker__caption " + _captionCl + "\" onclick=\"" + _captionOnClick + "\">\n           " + _captionCityDiv + "\n           <div class=\"marker__caption__date\">\n             " + _dt["default"].toMonthDayTime(msc) + "\n           </div>\n        </div>\n        <p style=\"display:table;margin: 0 0;font-size: 15px; font-weight: bold;\">\n          <img src=./img/" + _icon + ".png style=\"display:table-cell;width:50px;height:50px;\"></img>\n          <span class=\"marker__description\" style=\"display:table-cell;vertical-align:middle;\">\n            " + _description + "&nbsp;(" + _clouds + "%)\n          </span>\n        </p>\n        <p style=\"margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;\">\n          <span class=\"marker__value-odd\" style=\"color:#ff9800;\">\n             " + _temp + "\n          </span>\n          <span class=\"marker__value-odd left-5\" style=\"color:#0d2339;\">\n            " + _pressure + "&nbsp;hPa\n          </span>\n        </p>\n        <p style=\"margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;\">\n          " + _crVane(_deg) + "\n          <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n            " + _dt["default"].toDirection(_deg) + "\n          </span>\n          <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n            " + _windSpeed + "\n          </span>\n           <span class=\"marker__label left-5\" title=\"Humidity\">H:</span>\n           <span class=\"marker__value-even\" style=\"color:#3f51b5;\">" + _humidity + "%</span>\n        </p>";
  }
};
var _default = marker;
exports["default"] = _default;
//# sourceMappingURL=marker.js.map