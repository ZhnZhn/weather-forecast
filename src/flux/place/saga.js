import { takeEvery, call, delay, put } from 'redux-saga/effects';
import { isApiKey, isAirQuality } from '../gen';
import api from '../../api/OpenWeather';
import place, { ACTION as A } from './actions';
import modal from '../modal/actions';
import request from '../../affects/request';

const _setAirQualityTo = (forecast, airQuality) => {
  const { list:_aqiList } = airQuality || {}
  , _aqi = (_aqiList || [])[0];
  forecast.aqi = _aqi
};

const requestPlace = function* (action){
  try {
    const _isApiKey = yield* isApiKey();
    if (_isApiKey) {
      const { payload } = action
      , { lat, lot } = payload || {}
      , forecast = yield call(request, api.crForecast(lat, lot))
      , _isAirQuality = yield* isAirQuality();
      if (_isAirQuality) {
        yield delay(5000)
        const airQuality = yield call(request, api.crAirQualityIndex(lat, lot))
        _setAirQualityTo(forecast, airQuality)
      }
      yield put(place.requestedOk(forecast))
    } else {
      yield put(modal.showModal('SETTINGS'))
    }
  } catch(err){
    yield put(modal.showModal('ERROR', {
       errMsg: err.message
    }))
  }
};


const watchPlaceRequested = function* (){
   yield takeEvery(A.PLACE_REQUESTED, requestPlace)
};

export default watchPlaceRequested
