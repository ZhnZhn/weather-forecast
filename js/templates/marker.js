"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _dompurify = _interopRequireDefault(require("dompurify"));

var _dt = _interopRequireDefault(require("../utils/dt"));

var sanitize = _dompurify["default"].sanitize;

var _getByPropFromArr = function _getByPropFromArr(arr, prop, i, df) {
  if (arr === void 0) {
    arr = [];
  }

  if (i === void 0) {
    i = 0;
  }

  if (df === void 0) {
    df = 'no data';
  }

  return arr && arr[i] && arr[i][prop] || df;
};

var _crVane = function _crVane(deg) {
  return "<svg xmlns=\"http://www.w3.org/2000/svg\"\n       viewBox=\"0 0 17 18\" width=\"100%\" height=\"100%\"\n       preserveAspectRatio=\"none\" aria-labelledby=\"title\"\n       class=\"icon__popup__vane\"\n       style=\"transform:rotate(" + deg + "deg);position:relative;top:4px;\"\n  >\n     <title id=\"title\">Icon Wind Vane</title>\n     <path\n        d=\"M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0\"\n     >\n  </svg>";
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
        _ref4$visibility = _ref4.visibility,
        visibility = _ref4$visibility === void 0 ? 'no data' : _ref4$visibility,
        _ref5 = sys || {},
        _ref5$country = _ref5.country,
        country = _ref5$country === void 0 ? '' : _ref5$country,
        description = _getByPropFromArr(weather, 'description'),
        _ref6 = main || {},
        _ref6$temp = _ref6.temp,
        temp = _ref6$temp === void 0 ? '' : _ref6$temp,
        _ref6$pressure = _ref6.pressure,
        pressure = _ref6$pressure === void 0 ? '' : _ref6$pressure,
        _ref7 = wind || {},
        _ref7$deg = _ref7.deg,
        deg = _ref7$deg === void 0 ? 0 : _ref7$deg,
        _ref7$speed = _ref7.speed,
        speed = _ref7$speed === void 0 ? 'no data' : _ref7$speed,
        icon = _getByPropFromArr(weather, 'icon');

    var _captionCl = '',
        _captionOnClick = '',
        _captionCityDiv = '';

    if (typeof id === 'number' && id !== 0) {
      _captionCl = 'marker__caption__not-empty';
      _captionOnClick = "weather.fnFetchForecast(" + id + ")";
      _captionCityDiv = "<div class=\"marker__caption__city\">" + name + ":" + country + "</div>";
    }

    var _icon = sanitize(icon),
        _description = sanitize(description),
        _temp = sanitize(temp),
        _pressure = sanitize(pressure),
        _speed = sanitize(speed),
        _visibility = sanitize(visibility),
        _deg = sanitize(deg);

    return "<div class=\"marker__caption " + _captionCl + "\" onclick=\"" + _captionOnClick + "\">\n           " + _captionCityDiv + "\n           <div class=\"marker__caption__date\">\n             " + _dt["default"].toMonthDayTime(msc) + "\n           </div>\n        </div>\n        <p style=\"display:table;margin: 0 0;font-size: 15px; font-weight: bold;\">\n          <img src=./img/" + _icon + ".png style=\"display:table-cell;width:50px;height:50px;\"></img>\n          <span class=\"marker__description\" style=\"display:table-cell;vertical-align:middle;\">\n            " + _description + "\n          </span>\n        </p>\n        <p style=\"margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;\">\n          <span class=\"marker__label\" title=\"Temperature\">T:</span>\n          <span class=\"marker__value-odd\" style=\"color:#ff9800;\">\n             " + _temp + "&nbsp;C\n           </span>\n           <span class=\"marker__label left-5\" title=\"Pressure\">Pr:</span>\n           <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n             " + _pressure + "&nbsp;hPa\n           </span>\n        </p>\n        <p style=\"margin: 0 0;font-size: 15px; font-weight: bold;\">\n          <span class=\"marker__label\" title=\"Wind\">W:</span>\n          " + _crVane(_deg) + "\n          <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n            " + _dt["default"].toDirection(_deg) + "\n          </span>\n          <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n            " + _speed + "m/s\n          </span>\n        </p>\n        <p style=\"margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;\">\n           <span class=\"marker__label\" title=\"Clouds\">Cl:</span>\n           <span class=\"marker__value-even\" style=\"color:#3f51b5;\">" + w.clouds.all + "%</span>\n           <span class=\"marker__label left-5\" title=\"Humidity\">H:</span>\n           <span class=\"marker__value-even\" style=\"color:#3f51b5;\">" + w.main.humidity + "%</span>\n           <span class=\"marker__label left-5\">V:</span>\n           <span class=\"marker__value-even\" style=\"color:#3f51b5;\">\n             " + _visibility + "\n            </span>\n        </p>";
  }
};
var _default = marker;
exports["default"] = _default;
//# sourceMappingURL=marker.js.map