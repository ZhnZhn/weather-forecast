import {
  isEmptyValue,
  isNumber,
  isNotZeroNumber,
  isNaN
} from '../utils/isTypeFn';
import {
  getByIndexAndProp,
  joinByCollon2
} from '../utils/arrFn';
import {
  escapeStrHtml,
  getNumberOr
} from '../utils/domFn';
import dt from '../utils/dt';

const NO_DATA = 'No data';
const _fGetWeather = propName => weather => getByIndexAndProp(
  weather,
  0,
  propName,
  NO_DATA
)
, _getWeatherIcon = _fGetWeather('icon')
, _getWeatherDescription = _fGetWeather('description');

const _crVane = (
  deg
) => isNumber(parseInt(deg, 10)) ? `<svg xmlns="http://www.w3.org/2000/svg"
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
  const _t = parseFloat(t)
  , _fl = parseFloat(fl)
  , _difference = _t - _fl;
  if (isNaN(_t)) {
    return NO_DATA;
  }

  return _difference < -1 || _difference > 1
    ? `${t}&nbsp;(Feels&nbsp;Like&nbsp;${fl})&nbsp;°C`
    : `${t}&nbsp;°C`
};

const _crCaptionConfig = (
  id,
  name,
  country
) => isNotZeroNumber(id)
  ? [
    'marker__caption__not-empty', //_captionCl
    `weather.fnFetchForecast(${id})`, //_captionOnClick
    `<div class="marker__caption__city">${joinByCollon2(escapeStrHtml(name), escapeStrHtml(country))}</div>` //_captionCityDiv
  ] : ['', '', ''];


const _crWindSpeed = (
  speed,
  gust
) => {
 if (isEmptyValue(speed)) {
   return '';
 }
 const _gust = isEmptyValue(gust)
   ? ''
   : `-${gust}`;
  return `${speed}${_gust}m/s`;
};

const AQ = [
  'Good (1)',
  'Fair (2)',
  'Moderate (3)',
  'Poor (4)',
  'Very Poor (5)'
];

const _crAirQuailityRow = aqiSlice => {
 const { main } = aqiSlice || {}
 , { aqi } = main || {}
 , _aqv = isNumber(aqi)
     ? AQ[aqi-1]
     : '';
  return _aqv
    ? `<p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">
        <span class="marker__label" title="AirQuaility">AirQuaility:</span>
        <span class="marker__value-even" style="color:#3f51b5;">${_aqv}</span>
      </p>`
    : ''
};

const _iconTokens = [
  '01d', '01n',
  '02d', '02n',
  '03d', '03n',
  '04d', '04n',
  '09d', '09n',
  '10d', '10n',
  '11d', '11n',
  '13d', '13n',
  '50d', '50n'
];

const _isIconToken = icon => _iconTokens.indexOf(icon) !== -1;

const _crDivImgIcon = icon => _isIconToken(icon)
  ? `<img src=./img/${icon}.png style="width:60px;height:60px;"></img>`
  : '';
const _crPopupImgIcon = icon => _isIconToken(icon)
  ? `<img src=./img/${icon}.png style="display:table-cell;width:50px;height:50px;"></img>`
  : '';

export const crMarkerDivIcon = (w) => {
  const {
    weather,
    main,
    wind
  } = w || {}
  , {
    temp,
    pressure
  } = main || {}
  , {
    deg,
    speed
  } = wind || {}
  , icon = _getWeatherIcon(weather);

  return `<div style="position:relative;top:-45px;left:-25px;font-size: 15px;font-weight:bold;">
     ${_crDivImgIcon(icon)}
     <div style="position:absolute; top:5px; left: 50px; width: 90px; line-height: 1.2;">
       <div style="color:#ff9800;">${getNumberOr(temp)}&nbsp;℃</div>
       <div style="color:#3f51b5;">${getNumberOr(pressure)}&nbsp;hPa</div>
       <div>
          ${_crVane(deg)}
          <span style="color:#3f51b5;">${getNumberOr(speed)}m/s<span>
       </div>
     </div>
   </div>`;
}

export const crMarkerPopup = (w, themeName) => {
  const {
    id,
    name,
    sys,
    dt:msc,
    wind,
    weather,
    main,
    clouds,
    aqi
  } = w || {}
  , { country } = sys || {}
  , description = _getWeatherDescription(weather)
  , {
    temp,
    pressure,
    feels_like,
    humidity
  } = main || {}
  , {
    deg,
    speed,
    gust
  } = wind || {}
  , { all:cloudsAll } = clouds || {}
  , icon = _getWeatherIcon(weather)
  , _aqr = _crAirQuailityRow(aqi)

  , [ _captionCl,
      _captionOnClick,
      _captionCityDiv
  ] = _crCaptionConfig(id, name, country);

  return `<div class="marker__caption ${_captionCl}" onclick="${_captionOnClick}">
       ${_captionCityDiv}
       <div class="marker__caption__date">
         ${dt.toMonthDayTime(msc)}
       </div>
    </div>
    <p style="display:table;margin: 0 0;font-size: 15px; font-weight: bold;">
      ${_crPopupImgIcon(icon)}
      <span class="marker__description" style="display:table-cell;vertical-align:middle;">
        ${escapeStrHtml(description)}&nbsp;(${getNumberOr(cloudsAll)}%)
      </span>
    </p>
    <p style="margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;">
      <span class="marker__value-odd" style="color:#ff9800;">
         ${_crTemperature(getNumberOr(temp), getNumberOr(feels_like))}
      </span>
      <span class="marker__value-odd left-5" style="color:#0d2339;">
        ${getNumberOr(pressure)}&nbsp;hPa
      </span>
    </p>
    ${_aqr}
    <p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">
      ${_crVane(deg)}
      <span class="marker__value-odd" style="color:#3f51b5;">
        ${dt.toDirection(deg)}
      </span>
      <span class="marker__value-odd" style="color:#3f51b5;">
        ${_crWindSpeed(getNumberOr(speed), getNumberOr(gust))}
      </span>
       <span class="marker__label left-5" title="Humidity">H:</span>
       <span class="marker__value-even" style="color:#3f51b5;">${getNumberOr(humidity)}%</span>
    </p>`;
}
