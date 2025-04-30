import { isNumber } from '../utils/isTypeFn';

const METRIC = '&units=metric'
, LANG = '&lang=en'
, PERIOD = '&cnt=7'
, BASE_URL = 'https://api.openweathermap.org/data/2.5/'
, WEATHER = 'weather'
, AIR_POLLUTION = 'air_pollution'
, FORECAST_DAILY = 'forecast/daily'
, FORECAST = 'forecast'
, UVI = 'uvi';

const DF = {
  LAT: 51.48,
  LNG: -0.13
};

const _roundBy = (
  n,
  by=2
) => isNumber(n)
  ? parseFloat(n.toFixed(by))
  : n;

let _apiKey;
const OpenWeather = {
   setApiKey(apiKey){
     _apiKey = apiKey
     return Promise.resolve(true);
   },
   crForecast(lat=DF.LAT, lon=DF.LNG){
     return `${BASE_URL}${WEATHER}?appid=${_apiKey}${METRIC}${LANG}&lat=${lat}&lon=${lon}`;
   },
   crForecastById(id){
     return `${BASE_URL}${FORECAST_DAILY}?appid=${_apiKey}${PERIOD}${METRIC}&id=${id}${LANG}`;
   },
   crAirQualityIndex(lat=DF.LAT, lon=DF.LNG){
     return `${BASE_URL}${AIR_POLLUTION}?appid=${_apiKey}${METRIC}${LANG}&lat=${lat}&lon=${lon}`;
   },
   crAirForecast(lat=DF.LAT, lon=DF.LNG){
     return `${BASE_URL}${AIR_POLLUTION}/${FORECAST}?appid=${_apiKey}${LANG}&lat=${lat}&lon=${lon}`;
   },
   crHourlyById(id){
     return `${BASE_URL}${FORECAST}?appid=${_apiKey}${METRIC}&id=${id}${LANG}`;
   },
   crUV(lat=DF.LAT, lon=DF.LNG){
     return `${BASE_URL}${UVI}/${FORECAST}?lat=${_roundBy(lat)}&lon=${_roundBy(lon)}&appid=${_apiKey}`;
   }
};

export default OpenWeather
