import { effects } from 'redux-saga';
import api from '../../api/OpenWeather';
import settings, { ACTION as A } from './actions';

const {
  throttle,
  call, put
} = effects;

const setSettings = function* (action){
  yield call(api.setApiKey, action.apiKey)
  yield put(settings.setApiKey())
}

const watchSettingSet = function* () {
  yield throttle(500, A.SETTINGS_SET, setSettings)
}

export default watchSettingSet
