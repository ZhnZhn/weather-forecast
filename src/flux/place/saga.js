import { effects } from 'redux-saga'
import { isApiKey } from '../gen'
import api from '../../api/OpenWeather'
import place, { ACTION as A } from './actions'
import modal from '../modal/actions'
import request from '../../affects/request'

const {
  takeEvery,
  call, put
} = effects;

const requestPlace = function* (action){
  try {
    const _is = yield* isApiKey()
    if (_is) {
      const { payload={} } = action;
      const { lat, lot } = payload;
      const forecast = yield call(request, api.crForecast(lat, lot))
      yield put(place.requestedOk(forecast))
    } else {
      yield put(modal.showModal('SETTINGS'))
    }
  } catch(err){
    yield put(modal.showModal('ERROR', {
       errMsg: err.message
    }))
  }
}


const watchPlaceRequested = function* (){
   yield takeEvery(A.PLACE_REQUESTED, requestPlace)
}

export default watchPlaceRequested
