

const METRIC = '&units=metric'
const LANG = '&lang=en'
const PERIOD = '&cnt=7'
const BASE = 'https://api.openweathermap.org/data/2.5/';
const WEATHER = 'weather'
const FORECAST_DAILY = 'forecast/daily'
const FORECAST = 'forecast'
const BASE_V3 = 'https://api.openweathermap.org/v3/'
const UVI = 'uvi'
const CURRENT_JSON = 'current.json'

//lat: -29.916852233070163
//lon=149.9853515625

const DF = {
  LAT: 51.48,
  LNG: -0.13
};

let _apiKey;
const OpenWeather = {
   setApiKey(apiKey){
     _apiKey = apiKey
     return Promise.resolve(true);
   },
   crForecast(lat=DF.LAT, lon=DF.LNG){
     return `${BASE}${WEATHER}?APPID=${_apiKey}${METRIC}${LANG}&lat=${lat}&lon=${lon}`;
   },
   crForecastById(id){
     return `${BASE}${FORECAST_DAILY}?APPID=${_apiKey}${PERIOD}${METRIC}&id=${id}${LANG}`;
   },
   crHourlyById(id){
     return `${BASE}${FORECAST}?APPID=${_apiKey}${METRIC}&id=${id}${LANG}`;
   },
   crUV(lat=DF.LAT, lon=DF.LNG){
     //http://api.openweathermap.org/v3/uvi/40.7,-74.2/current.json?appid={your-api-key}
     return `${BASE_V3}${UVI}/${Math.round(lat)},${Math.round(lon)}/${CURRENT_JSON}?APPID=${_apiKey}`;
   }
};

export default OpenWeather
