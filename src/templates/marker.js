import dt from '../utils/dt'
import is from '../utils/is';

const _fnCreateVane = (deg) => {
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
}


const marker = {
  fDivIcon : (w={}) => {
    const { weather=[], main, wind } = w
    , { temp='', pressure='' } = is.toObjLike(main)
    , { deg=0, speed='' } = is.toObjLike(wind)
    , icon = is.toStr(weather, 'icon', 0, 'no-data');

    return `<div style="position:relative;top:-45px;left:-25px;font-size: 15px;font-weight:bold;">
             <img src=./img/${icon}.png style="width:60px;height:60px;"></img>
             <div style="position:absolute; top:5px; left: 50px; width: 90px; line-height: 1.2;">
               <div style="color:#ff9800;">${temp}&nbsp;℃</div>
               <div style="color:#3f51b5;">${pressure}&nbsp;hPa</div>
               <div>
                  ${_fnCreateVane(deg)}
                  <span style="color:#3f51b5;">${speed}m/s<span>
               </div>
             </div>
            </div>`
  },


  fPopup : (w={}, themeName) => {
    const {
      id, name='', sys, dt:msc, wind, weather,
      main, visibility='no data'
    } = w
    , { country='' } = is.toObjLike(sys)
    , description = is.toStr(weather, 'description')
    , { temp='', pressure='' } = is.toObjLike(main)
    , { deg=0, speed='no data' } = is.toObjLike(wind)
    , icon = is.toStr(weather, 'icon', 0, 'no-data');

    let _captionCl=''
      , _captionOnClick=''
      , _captionCityDiv='';
    if (typeof id === 'number' && id !== 0) {
      _captionCl = 'marker__caption__not-empty'
      _captionOnClick = `weather.fnFetchForecast(${id})`
      _captionCityDiv = `<div class="marker__caption__city">${name}:${country}</div>`
    }

    return `<div class="marker__caption ${_captionCl}" onclick="${_captionOnClick}">
               ${_captionCityDiv}
               <div class="marker__caption__date">
                 ${dt.toMonthDayTime(msc)}
               </div>
            </div>
            <p style="display:table;margin: 0 0;font-size: 15px; font-weight: bold;">
              <img src=./img/${icon}.png style="display:table-cell;width:50px;height:50px;"></img>
              <span class="marker__description" style="display:table-cell;vertical-align:middle;">
                ${description}
              </span>
            </p>
            <p style="margin: 0 0;margin-top: -8px;font-size: 15px; font-weight: bold;">
              <span class="marker__label" title="Temperature">T:</span>
              <span class="marker__value-odd" style="color:#ff9800;">
                 ${temp}&nbsp;C
               </span>
               <span class="marker__label left-5" title="Pressure">Pr:</span>
               <span class="marker__value-odd" style="color:#3f51b5;">
                 ${pressure}&nbsp;hPa
               </span>
            </p>
            <p style="margin: 0 0;font-size: 15px; font-weight: bold;">
              <span class="marker__label" title="Wind">W:</span>
              ${_fnCreateVane(deg)}
              <span class="marker__value-odd" style="color:#3f51b5;">
                ${dt.toDirection(deg)}
              </span>
              <span class="marker__value-odd" style="color:#3f51b5;">
                ${speed}m/s
              </span>
            </p>
            <p style="margin: 0 0;margin-top: 4px;font-size: 15px; font-weight: bold;">
               <span class="marker__label" title="Clouds">Cl:</span>
               <span class="marker__value-even" style="color:#3f51b5;">${w.clouds.all}%</span>
               <span class="marker__label left-5" title="Humidity">H:</span>
               <span class="marker__value-even" style="color:#3f51b5;">${w.main.humidity}%</span>
               <span class="marker__label left-5">V:</span>
               <span class="marker__value-even" style="color:#3f51b5;">
                 ${visibility}
                </span>
            </p>`;
  }
};

export default marker
