"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _arrFn = require("../utils/arrFn");
var _domFn = require("../utils/domFn");
var _dt = _interopRequireDefault(require("../utils/dt"));
const NO_DATA = 'No data';
const _isNumberNotZero = n => (0, _isTypeFn.isNumber)(n) && n !== 0;
const _getByPropFromArr = function (arr, prop, i, df) {
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
const _crVane = deg => (0, _isTypeFn.isNumber)(parseInt(deg, 10)) ? `<svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 17 18" width="100%" height="100%"
       preserveAspectRatio="none" aria-labelledby="title"
       class="icon__popup__vane"
       style="transform:rotate(${deg}deg);position:relative;top:4px;"
  >
     <title id="title">Icon Wind Vane</title>
     <path
        d="M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0"
     >
  </svg>` : '';
const _crTemperature = (t, fl) => {
  const _t = parseFloat(t),
    _fl = parseFloat(fl),
    _difference = _t - _fl;
  if ((0, _isTypeFn.isNaN)(_t)) {
    return NO_DATA;
  }
  return _difference < -1 || _difference > 1 ? `${t}&nbsp;(Feels&nbsp;Like&nbsp;${fl})&nbsp;°C` : `${t}&nbsp;°C`;
};
const _crCaptionConfig = (id, name, country) => _isNumberNotZero(id) ? ['marker__caption__not-empty',
//_captionCl
`weather.fnFetchForecast(${id})`,
//_captionOnClick
`<div class="marker__caption__city">${(0, _arrFn.joinByCollon2)((0, _domFn.escapeStrHtml)(name), (0, _domFn.escapeStrHtml)(country))}</div>` //_captionCityDiv
] : ['', '', ''];
const _isEmptyValue = v => v == null || v === '';
const _crWindSpeed = (speed, gust) => {
  if (_isEmptyValue(speed)) {
    return '';
  }
  const _gust = _isEmptyValue(gust) ? '' : `-${gust}`;
  return `${speed}${_gust}m/s`;
};
const AQ = ['Good (1)', 'Fair (2)', 'Moderate (3)', 'Poor (4)', 'Very Poor (5)'];
const _crAirQuailityRow = aqiSlice => {
  const {
      main
    } = aqiSlice || {},
    {
      aqi
    } = main || {},
    _aqv = (0, _isTypeFn.isNumber)(aqi) ? AQ[aqi - 1] : '';
  return _aqv ? `<p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">
        <span class="marker__label" title="AirQuaility">AirQuaility:</span>
        <span class="marker__value-even" style="color:#3f51b5;">${_aqv}</span>
      </p>` : '';
};
const _iconTokens = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];
const _isIconToken = icon => _iconTokens.indexOf(icon) !== -1;
const _crDivImgIcon = icon => _isIconToken(icon) ? `<img src=./img/${icon}.png style="width:60px;height:60px;"></img>` : '';
const _crPopupImgIcon = icon => _isIconToken(icon) ? `<img src=./img/${icon}.png style="display:table-cell;width:50px;height:50px;"></img>` : '';
const marker = {
  fDivIcon: w => {
    const {
        weather = [],
        main,
        wind
      } = w || {},
      {
        temp,
        pressure
      } = main || {},
      {
        deg,
        speed
      } = wind || {},
      icon = _getByPropFromArr(weather, 'icon');
    return `<div style="position:relative;top:-45px;left:-25px;font-size: 15px;font-weight:bold;">
       ${_crDivImgIcon(icon)}
       <div style="position:absolute; top:5px; left: 50px; width: 90px; line-height: 1.2;">
         <div style="color:#ff9800;">${(0, _domFn.getNumberOr)(temp)}&nbsp;℃</div>
         <div style="color:#3f51b5;">${(0, _domFn.getNumberOr)(pressure)}&nbsp;hPa</div>
         <div>
            ${_crVane(deg)}
            <span style="color:#3f51b5;">${(0, _domFn.getNumberOr)(speed)}m/s<span>
         </div>
       </div>
     </div>`;
  },
  fPopup: (w, themeName) => {
    const {
        id,
        name,
        sys,
        dt: msc,
        wind,
        weather,
        main,
        clouds,
        aqi
      } = w || {},
      {
        country
      } = sys || {},
      description = _getByPropFromArr(weather, 'description'),
      {
        temp,
        pressure,
        feels_like,
        humidity
      } = main || {},
      {
        deg,
        speed,
        gust
      } = wind || {},
      {
        all: cloudsAll
      } = clouds || {},
      icon = _getByPropFromArr(weather, 'icon'),
      _aqr = _crAirQuailityRow(aqi),
      [_captionCl, _captionOnClick, _captionCityDiv] = _crCaptionConfig(id, name, country);
    return `<div class="marker__caption ${_captionCl}" onclick="${_captionOnClick}">
           ${_captionCityDiv}
           <div class="marker__caption__date">
             ${_dt.default.toMonthDayTime(msc)}
           </div>
        </div>
        <p style="display:table;margin: 0 0;font-size: 15px; font-weight: bold;">
          ${_crPopupImgIcon(icon)}
          <span class="marker__description" style="display:table-cell;vertical-align:middle;">
            ${(0, _domFn.escapeStrHtml)(description)}&nbsp;(${(0, _domFn.getNumberOr)(cloudsAll)}%)
          </span>
        </p>
        <p style="margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;">
          <span class="marker__value-odd" style="color:#ff9800;">
             ${_crTemperature((0, _domFn.getNumberOr)(temp), (0, _domFn.getNumberOr)(feels_like))}
          </span>
          <span class="marker__value-odd left-5" style="color:#0d2339;">
            ${(0, _domFn.getNumberOr)(pressure)}&nbsp;hPa
          </span>
        </p>
        ${_aqr}
        <p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">
          ${_crVane(deg)}
          <span class="marker__value-odd" style="color:#3f51b5;">
            ${_dt.default.toDirection(deg)}
          </span>
          <span class="marker__value-odd" style="color:#3f51b5;">
            ${_crWindSpeed((0, _domFn.getNumberOr)(speed), (0, _domFn.getNumberOr)(gust))}
          </span>
           <span class="marker__label left-5" title="Humidity">H:</span>
           <span class="marker__value-even" style="color:#3f51b5;">${(0, _domFn.getNumberOr)(humidity)}%</span>
        </p>`;
  }
};
var _default = exports.default = marker;
//# sourceMappingURL=marker.js.map