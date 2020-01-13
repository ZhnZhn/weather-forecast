"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _dt = _interopRequireDefault(require("../utils/dt"));

var _is = _interopRequireDefault(require("../utils/is"));

var _fnCreateVane = function _fnCreateVane(deg) {
  return "<svg xmlns=\"http://www.w3.org/2000/svg\"\n       viewBox=\"0 0 17 18\" width=\"100%\" height=\"100%\"\n       preserveAspectRatio=\"none\" aria-labelledby=\"title\"\n       class=\"icon__popup__vane\"\n       style=\"transform:rotate(" + deg + "deg);position:relative;top:4px;\"\n  >\n     <title id=\"title\">Icon Wind Vane</title>\n     <path\n        d=\"M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0\"\n     >\n  </svg>";
};

var marker = {
  fDivIcon: function fDivIcon(w) {
    if (w === void 0) {
      w = {};
    }

    var _w = w,
        _w$weather = _w.weather,
        weather = _w$weather === void 0 ? [] : _w$weather,
        main = _w.main,
        wind = _w.wind,
        _is$toObjLike = _is["default"].toObjLike(main),
        _is$toObjLike$temp = _is$toObjLike.temp,
        temp = _is$toObjLike$temp === void 0 ? '' : _is$toObjLike$temp,
        _is$toObjLike$pressur = _is$toObjLike.pressure,
        pressure = _is$toObjLike$pressur === void 0 ? '' : _is$toObjLike$pressur,
        _is$toObjLike2 = _is["default"].toObjLike(wind),
        _is$toObjLike2$deg = _is$toObjLike2.deg,
        deg = _is$toObjLike2$deg === void 0 ? 0 : _is$toObjLike2$deg,
        _is$toObjLike2$speed = _is$toObjLike2.speed,
        speed = _is$toObjLike2$speed === void 0 ? '' : _is$toObjLike2$speed,
        icon = _is["default"].toStr(weather, 'icon', 0, 'no-data');

    return "<div style=\"position:relative;top:-45px;left:-25px;font-size: 15px;font-weight:bold;\">\n             <img src=./img/" + icon + ".png style=\"width:60px;height:60px;\"></img>\n             <div style=\"position:absolute; top:5px; left: 50px; width: 90px; line-height: 1.2;\">\n               <div style=\"color:#ff9800;\">" + temp + "&nbsp;\u2103</div>\n               <div style=\"color:#3f51b5;\">" + pressure + "&nbsp;hPa</div>\n               <div>\n                  " + _fnCreateVane(deg) + "\n                  <span style=\"color:#3f51b5;\">" + speed + "m/s<span>\n               </div>\n             </div>\n            </div>";
  },
  fPopup: function fPopup(w, themeName) {
    if (w === void 0) {
      w = {};
    }

    var _w2 = w,
        id = _w2.id,
        _w2$name = _w2.name,
        name = _w2$name === void 0 ? '' : _w2$name,
        sys = _w2.sys,
        msc = _w2.dt,
        wind = _w2.wind,
        weather = _w2.weather,
        main = _w2.main,
        _w2$visibility = _w2.visibility,
        visibility = _w2$visibility === void 0 ? 'no data' : _w2$visibility,
        _is$toObjLike3 = _is["default"].toObjLike(sys),
        _is$toObjLike3$countr = _is$toObjLike3.country,
        country = _is$toObjLike3$countr === void 0 ? '' : _is$toObjLike3$countr,
        description = _is["default"].toStr(weather, 'description'),
        _is$toObjLike4 = _is["default"].toObjLike(main),
        _is$toObjLike4$temp = _is$toObjLike4.temp,
        temp = _is$toObjLike4$temp === void 0 ? '' : _is$toObjLike4$temp,
        _is$toObjLike4$pressu = _is$toObjLike4.pressure,
        pressure = _is$toObjLike4$pressu === void 0 ? '' : _is$toObjLike4$pressu,
        _is$toObjLike5 = _is["default"].toObjLike(wind),
        _is$toObjLike5$deg = _is$toObjLike5.deg,
        deg = _is$toObjLike5$deg === void 0 ? 0 : _is$toObjLike5$deg,
        _is$toObjLike5$speed = _is$toObjLike5.speed,
        speed = _is$toObjLike5$speed === void 0 ? 'no data' : _is$toObjLike5$speed,
        icon = _is["default"].toStr(weather, 'icon', 0, 'no-data');

    var _captionCl = '',
        _captionOnClick = '',
        _captionCityDiv = '';

    if (typeof id === 'number' && id !== 0) {
      _captionCl = 'marker__caption__not-empty';
      _captionOnClick = "weather.fnFetchForecast(" + id + ")";
      _captionCityDiv = "<div class=\"marker__caption__city\">" + name + ":" + country + "</div>";
    }

    return "<div class=\"marker__caption " + _captionCl + "\" onclick=\"" + _captionOnClick + "\">\n               " + _captionCityDiv + "\n               <div class=\"marker__caption__date\">\n                 " + _dt["default"].toMonthDayTime(msc) + "\n               </div>\n            </div>\n            <p style=\"display:table;margin: 0 0;font-size: 15px; font-weight: bold;\">\n              <img src=./img/" + icon + ".png style=\"display:table-cell;width:50px;height:50px;\"></img>\n              <span class=\"marker__description\" style=\"display:table-cell;vertical-align:middle;\">\n                " + description + "\n              </span>\n            </p>\n            <p style=\"margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;\">\n              <span class=\"marker__label\" title=\"Temperature\">T:</span>\n              <span class=\"marker__value-odd\" style=\"color:#ff9800;\">\n                 " + temp + "&nbsp;C\n               </span>\n               <span class=\"marker__label left-5\" title=\"Pressure\">Pr:</span>\n               <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n                 " + pressure + "&nbsp;hPa\n               </span>\n            </p>\n            <p style=\"margin: 0 0;font-size: 15px; font-weight: bold;\">\n              <span class=\"marker__label\" title=\"Wind\">W:</span>\n              " + _fnCreateVane(deg) + "\n              <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n                " + _dt["default"].toDirection(deg) + "\n              </span>\n              <span class=\"marker__value-odd\" style=\"color:#3f51b5;\">\n                " + speed + "m/s\n              </span>\n            </p>\n            <p style=\"margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;\">\n               <span class=\"marker__label\" title=\"Clouds\">Cl:</span>\n               <span class=\"marker__value-even\" style=\"color:#3f51b5;\">" + w.clouds.all + "%</span>\n               <span class=\"marker__label left-5\" title=\"Humidity\">H:</span>\n               <span class=\"marker__value-even\" style=\"color:#3f51b5;\">" + w.main.humidity + "%</span>\n               <span class=\"marker__label left-5\">V:</span>\n               <span class=\"marker__value-even\" style=\"color:#3f51b5;\">\n                 " + visibility + "\n                </span>\n            </p>";
  }
};
var _default = marker;
exports["default"] = _default;
//# sourceMappingURL=marker.js.map