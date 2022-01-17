import DOMPurify from 'dompurify'
import dt from '../utils/dt'

const { sanitize } = DOMPurify;

const NO_DATA = 'No data';
const _isNumberNotZero = n =>
  typeof n === 'number' && n !== 0;

const _getByPropFromArr = (
  arr=[],
  prop,
  i=0,
  df=NO_DATA
) => (arr && arr[i] && arr[i][prop]) || df;

const _crVane = deg => {
  return `<svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 17 18" width="100%" height="100%"
       preserveAspectRatio="none" aria-labelledby="title"
       class="icon__popup__vane"
       style="transform:rotate(${deg}deg);position:relative;top:4px;"
  >
     <title id="title">Icon Wind Vane</title>
     <path
        d="M 10,0 L 8,0 8,11 4,11 9,18 14,11 10,11 10,0"
     >
  </svg>`;
};

const _isNaN = n => n - n !== 0

const _crTemperature = (t, fl) => {
  const _t = parseFloat(t)
  , _fl = parseFloat(fl)
  , _difference = _t - _fl;
  if (_isNaN(_t)) {
    return NO_DATA;
  }

  return _difference < -1 || _difference > 1
    ? `${t}&nbsp;(Feels&nbsp;Like&nbsp;${fl})&nbsp;°C`
    : `${t}&nbsp;°C`
};

const _crCaptionConfig = (id, name, country) => {
  let _captionCl=''
    , _captionOnClick=''
    , _captionCityDiv='';
  if (_isNumberNotZero(id)) {
    _captionCl = 'marker__caption__not-empty'
    _captionOnClick = `weather.fnFetchForecast(${id})`
    _captionCityDiv = `<div class="marker__caption__city">${name}:${country}</div>`
  }
  return [
    _captionCl,
    _captionOnClick,
    _captionCityDiv
  ];
};

const _isEmptyValue = v =>
  v == null || v === '';

const _crWindSpeed = (speed, gust) => {
 if (_isEmptyValue(speed)) {
   return '';
 }
 const _gust = _isEmptyValue(gust)
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
 , _aqv = typeof aqi === 'number'
     ? AQ[aqi-1]
     : '';
  return _aqv
    ? `<p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">
        <span class="marker__label" title="AirQuaility">AirQuaility:</span>
        <span class="marker__value-even" style="color:#3f51b5;">${_aqv}</span>
      </p>`
    : ''
};


const marker = {
  fDivIcon : (w) => {
    const { weather=[], main, wind } = w || {}
    , { temp='', pressure='' } = main || {}
    , { deg=0, speed='' } = wind || {}
    , icon = _getByPropFromArr(weather, 'icon');

    return sanitize(
    `<div style="position:relative;top:-45px;left:-25px;font-size: 15px;font-weight:bold;">
       <img src=./img/${icon}.png style="width:60px;height:60px;"></img>
       <div style="position:absolute; top:5px; left: 50px; width: 90px; line-height: 1.2;">
         <div style="color:#ff9800;">${temp}&nbsp;℃</div>
         <div style="color:#3f51b5;">${pressure}&nbsp;hPa</div>
         <div>
            ${_crVane(deg)}
            <span style="color:#3f51b5;">${speed}m/s<span>
         </div>
       </div>
     </div>`)
  },

  fPopup : (w, themeName) => {
    const {
      id,
      name='',
      sys,
      dt:msc,
      wind,
      weather,
      main,
      clouds,
      aqi
    } = w || {}
    , { country='' } = sys || {}
    , description = _getByPropFromArr(weather, 'description')
    , { temp='', pressure='', feels_like, humidity='' } = main || {}
    , { deg=0, speed, gust } = wind || {}
    , { all:cloudsAll='' } = clouds || {}
    , icon = _getByPropFromArr(weather, 'icon')
    , _aqr = _crAirQuailityRow(aqi)

    , [ _captionCl,
        _captionOnClick,
        _captionCityDiv
      ] = _crCaptionConfig(id, sanitize(name), sanitize(country))

    , _icon = sanitize(icon)
    , _description = sanitize(description)
    , _clouds = sanitize(cloudsAll)
    , _pressure = sanitize(pressure)
    , _deg = sanitize(deg)
    , _windSpeed = _crWindSpeed(sanitize(speed), sanitize(gust))
    , _temp = _crTemperature(sanitize(temp), sanitize(feels_like))
    , _humidity = sanitize(humidity);

    return `<div class="marker__caption ${_captionCl}" onclick="${_captionOnClick}">
           ${_captionCityDiv}
           <div class="marker__caption__date">
             ${dt.toMonthDayTime(msc)}
           </div>
        </div>
        <p style="display:table;margin: 0 0;font-size: 15px; font-weight: bold;">
          <img src=./img/${_icon}.png style="display:table-cell;width:50px;height:50px;"></img>
          <span class="marker__description" style="display:table-cell;vertical-align:middle;">
            ${_description}&nbsp;(${_clouds}%)
          </span>
        </p>
        <p style="margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;">
          <span class="marker__value-odd" style="color:#ff9800;">
             ${_temp}
          </span>
          <span class="marker__value-odd left-5" style="color:#0d2339;">
            ${_pressure}&nbsp;hPa
          </span>
        </p>
        ${_aqr}
        <p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">
          ${_crVane(_deg)}
          <span class="marker__value-odd" style="color:#3f51b5;">
            ${dt.toDirection(_deg)}
          </span>
          <span class="marker__value-odd" style="color:#3f51b5;">
            ${_windSpeed}
          </span>
           <span class="marker__label left-5" title="Humidity">H:</span>
           <span class="marker__value-even" style="color:#3f51b5;">${_humidity}%</span>
        </p>`
  }
};

export default marker
