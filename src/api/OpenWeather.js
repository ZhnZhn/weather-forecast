

const METRIC = '&units=metric'
const LANG = '&lang=en'
const PERIOD = '&cnt=7'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const WEATHER = 'weather'
const FORECAST_DAILY = 'forecast/daily'
const FORECAST = 'forecast'
const UVI = 'uvi'

const DF = {
  LAT: 51.48,
  LNG: -0.13
};

const _roundBy = (n, by=2) => {
  return typeof n === 'number' && n-n === 0
    ? parseFloat(n.toFixed(by))
    : n;
};

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
   crHourlyById(id){
     return `${BASE_URL}${FORECAST}?appid=${_apiKey}${METRIC}&id=${id}${LANG}`;
   },
   crUV(lat=DF.LAT, lon=DF.LNG){
     return `${BASE_URL}${UVI}/${FORECAST}?lat=${_roundBy(lat)}&lon=${_roundBy(lon)}&appid=${_apiKey}`;
   }
};

export default OpenWeather
