import { takeEvery, select, call, put } from 'redux-saga/effects'
import aUV, { ACTION as A } from './actions'

import { sForecast, sUV } from '../selectors'

import Api from '../../api/OpenWeather';
import request from '../../affects/request';
import modal from '../modal/actions'


const fetchUV = function* (action){
  try{
    const state = yield select();
    const recent = sForecast.recent(state);
    const recentUV = sUV.recent(state);
    if (recent && recentUV !== recent){
      const coord = sForecast.cityCoordById(state, recent)
      const json = yield call(request, Api.crUV(coord.lat, coord.lon))
      yield put(aUV.requestedOk(json, recent))
    } else {
      yield put(aUV.requestedInCache())
    }
  } catch(err){
    yield put(modal.showModal('ERROR', {
      errMsg: err.message
    }))
  }
}


const watchAction = function* () {
  yield takeEvery(A.UV_REQUESTED, fetchUV)
}

export default watchAction
