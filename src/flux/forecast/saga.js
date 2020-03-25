import { takeEvery, call, put, select } from 'redux-saga/effects';
import forecast,  { ACTION as A }  from './actions';
import { sForecast } from '../selectors';

import Api from '../../api/OpenWeather';
import request from '../../affects/request';
import modal from '../modal/actions'

const requestForecast = function* (action){
  try{
    const state = yield select()
    const id = action.id
    if (!sForecast.byId(state, id)) {
      const json = yield call(request, Api.crForecastById(id))
      yield put(forecast.requestedOk(json, id))
    } else {
      yield put(forecast.requestedInCache(id))
    }
  } catch(err){
    yield put(modal.showModal('ERROR', {
      errMsg: err.message
    }))
  }
}

const watchForecastRequested = function* (){
  yield takeEvery(A.FORECAST_REQUESTED, requestForecast)
}

export default watchForecastRequested
