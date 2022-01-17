import { takeEvery, select, call, put } from 'redux-saga/effects';

import air, { ACTION_AIR_FORECAST_REQ } from './actions';
import { sForecast, sAir } from '../selectors'

import Api from '../../api/OpenWeather';
import request from '../../affects/request';
import modal from '../modal/actions';

const requestAirForecast = function* (action){
  try{
    const state = yield select();
    const recent = sForecast.recent(state);
    const recentAirForecast = sAir.recent(state);
    if (recent && recentAirForecast !== recent){
       const {lon, lat} = sForecast.cityCoordById(state, recent)
       if (lon && lat) {
         const json = yield call(request, Api.crAirForecast(lat, lon))
         yield put(air.requestedOk(json, recent))
       }
    } else {
      yield put(air.requestedInCache(recent))
    }
  } catch(err) {
    yield put(modal.showModal('ERROR', {
      errMsg: err.message
    }))
  }
};

const watchHourlyRequested = function* (){
  yield takeEvery(ACTION_AIR_FORECAST_REQ, requestAirForecast)
};

export default watchHourlyRequested
