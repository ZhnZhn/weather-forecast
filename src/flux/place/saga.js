import { effects } from 'redux-saga'
import { isApiKey } from '../gen'
import api from '../../api/OpenWeather'
import place, { ACTION as A } from './actions'
import request from '../../affects/request'

const {
  takeEvery,
  call, put
} = effects;

const requestPlace = function* (action){
  try {
    yield* isApiKey()
    const { payload={} } = action;
    const { lat, lot } = payload;
    const forecast = yield call(request, api.crForecast(lat, lot))
    yield put(place.requestedOk(forecast))
  } catch(e){
    yield put(place.requestedFail(e.message))
  }
}


const watchPlaceRequested = function* (){
   yield takeEvery(A.PLACE_REQUESTED, requestPlace)
}

export default watchPlaceRequested
