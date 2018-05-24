import { effects } from 'redux-saga';

import hourly , { ACTION as A } from './actions';
import { sForecast, sHourly } from '../selectors'

import Api from '../../api/OpenWeather';
import request from '../../affects/request';
import modal from '../modal/actions'

const {
  takeEvery,
  select, call, put
} = effects;

const requestHourly = function* (action){
  try{
    const state = yield select();
    const recent = sForecast.recent(state);
    const recentHourly = sHourly.recent(state);
    if (recent && recentHourly !== recent){
       const json = yield call(request, Api.crHourlyById(recent))
       yield put(hourly.requestedOk(json, recent))
    } else {
      yield put(hourly.requestedInCache(recent))
    }
  } catch(err) {
    yield put(modal.showModal('ERROR', {
      errMsg: err.message
    }))    
  }
}

const watchHourlyRequested = function* (){
  yield takeEvery(A.HOURLY_REQUESTED, requestHourly)
}

export default watchHourlyRequested
