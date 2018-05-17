'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dt = require('../utils/dt');

var _dt2 = _interopRequireDefault(_dt);

var _is = require('../utils/is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const getRain = (w) => {
  let rainHour, rainValue;
  if (typeof w.rain !== 'undefined'){
    const keys = Object.keys(w.rain);
    if (typeof keys[0] !== 'undefined'){
      rainHour = keys[0];
      rainValue = w.rain[rainHour];
    } else {
      rainHour = "3h";
      rainValue = 0;
    }
  } else {
    rainHour = "3h";
    rainValue = 0;
  }
  return { rainHour, rainValue };
}
*/

var _fnCreateVane = function _fnCreateVane(deg) {
  return '<svg xmlns="http://www.w3.org/2000/svg"\n       viewBox="0 0 17 18" width="100%" height="100%"\n       preserveAspectRatio="none" aria-labelledby="title"\n       class="icon__popup__vane"\n       style="transform:rotate(' + deg + 'deg);position:relative;top:4px;"\n  >\n     <title id="title">Icon Wind Vane</title>\n     <path\n        d="M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0"\n     >\n  </svg>';
};

var marker = {
  fDivIcon: function fDivIcon() {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _w$weather = w.weather,
        weather = _w$weather === undefined ? [] : _w$weather,
        main = w.main,
        wind = w.wind,
        _is$toObjLike = _is2.default.toObjLike(main),
        _is$toObjLike$temp = _is$toObjLike.temp,
        temp = _is$toObjLike$temp === undefined ? '' : _is$toObjLike$temp,
        _is$toObjLike$pressur = _is$toObjLike.pressure,
        pressure = _is$toObjLike$pressur === undefined ? '' : _is$toObjLike$pressur,
        _is$toObjLike2 = _is2.default.toObjLike(wind),
        _is$toObjLike2$deg = _is$toObjLike2.deg,
        deg = _is$toObjLike2$deg === undefined ? 0 : _is$toObjLike2$deg,
        _is$toObjLike2$speed = _is$toObjLike2.speed,
        speed = _is$toObjLike2$speed === undefined ? '' : _is$toObjLike2$speed,
        icon = _is2.default.toStr(weather, 'icon', 0, 'no-data');

    //<span style="color:#607d8b;">${name}</span>


    return '<div style="position:relative;top:-45px;left:-25px;font-size: 15px;font-weight:bold;">\n             <img src=./img/' + icon + '.png style="width:60px;height:60px;"></img>\n             <div style="position:absolute; top:5px; left: 50px; width: 90px; line-height: 1.2;">\n               <div style="color:#ff9800;">' + temp + '&nbsp;\u2103</div>\n               <div style="color:#3f51b5;">' + pressure + '&nbsp;hPa</div>\n               <div>\n                  ' + _fnCreateVane(deg) + '\n                  <span style="color:#3f51b5;">' + speed + 'm/s<span>\n               </div>\n             </div>\n            </div>';
  },
  //2196f3

  fPopup: function fPopup() {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var themeName = arguments[1];

    //const { rainHour, rainValue } = getRain(w) ;
    var _w$name = w.name,
        name = _w$name === undefined ? '' : _w$name,
        sys = w.sys,
        msc = w.dt,
        wind = w.wind,
        weather = w.weather,
        main = w.main,
        _w$visibility = w.visibility,
        visibility = _w$visibility === undefined ? 'no data' : _w$visibility,
        _is$toObjLike3 = _is2.default.toObjLike(sys),
        _is$toObjLike3$countr = _is$toObjLike3.country,
        country = _is$toObjLike3$countr === undefined ? '' : _is$toObjLike3$countr,
        description = _is2.default.toStr(weather, 'description'),
        _is$toObjLike4 = _is2.default.toObjLike(main),
        _is$toObjLike4$temp = _is$toObjLike4.temp,
        temp = _is$toObjLike4$temp === undefined ? '' : _is$toObjLike4$temp,
        _is$toObjLike4$pressu = _is$toObjLike4.pressure,
        pressure = _is$toObjLike4$pressu === undefined ? '' : _is$toObjLike4$pressu,
        _is$toObjLike5 = _is2.default.toObjLike(wind),
        _is$toObjLike5$deg = _is$toObjLike5.deg,
        deg = _is$toObjLike5$deg === undefined ? 0 : _is$toObjLike5$deg,
        _is$toObjLike5$speed = _is$toObjLike5.speed,
        speed = _is$toObjLike5$speed === undefined ? 'no data' : _is$toObjLike5$speed,
        icon = _is2.default.toStr(weather, 'icon', 0, 'no-data');

    return '<div class="marker__caption" onclick="weather.fnFetchForecast(' + w.id + ')">\n               <div class="marker__caption__city">\n                 ' + name + ':' + country + '\n               </div>\n               <div class="marker__caption__date">\n                 ' + _dt2.default.toMonthDayTime(msc) + '\n               </div>\n            </div>\n            <p style="display:table;margin: 0 0;font-size: 15px; font-weight: bold;">\n              <img src=./img/' + icon + '.png style="display:table-cell;width:50px;height:50px;"></img>\n              <span class="marker__description" style="display:table-cell;vertical-align:middle;">\n                ' + description + '\n              </span>\n            </p>\n            <p style="margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;">\n              <span class="marker__label" title="Temperature">T:</span>\n              <span class="marker__value-odd" style="color:#ff9800;">\n                 ' + temp + '&nbsp;C\n               </span>\n               <span class="marker__label left-5" title="Pressure">Pr:</span>\n               <span class="marker__value-odd" style="color:#3f51b5;">\n                 ' + pressure + '&nbsp;hPa\n               </span>\n            </p>\n            <p style="margin: 0 0;font-size: 15px; font-weight: bold;">\n              <span class="marker__label" title="Wind">W:</span>\n              ' + _fnCreateVane(deg) + '\n              <span class="marker__value-odd" style="color:#3f51b5;">\n                ' + _dt2.default.toDirection(deg) + '\n              </span>\n              <span class="marker__value-odd" style="color:#3f51b5;">\n                ' + speed + 'm/s\n              </span>\n            </p>\n            <p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">\n               <span class="marker__label" title="Clouds">Cl:</span>\n               <span class="marker__value-even" style="color:#3f51b5;">' + w.clouds.all + '%</span>\n               <span class="marker__label left-5" title="Humidity">H:</span>\n               <span class="marker__value-even" style="color:#3f51b5;">' + w.main.humidity + '%</span>\n               <span class="marker__label left-5">V:</span>\n               <span class="marker__value-even" style="color:#3f51b5;">\n                 ' + visibility + '\n                </span>\n            </p>';
  }
};

exports.default = marker;
//# sourceMappingURL=marker.js.map