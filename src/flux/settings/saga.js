import { throttle, call, put } from 'redux-saga/effects';
import api from '../../api/OpenWeather';
import settings, { ACTION_SETTINGS_SET } from './actions';

const setSettings = function* (action){  
  yield call(api.setApiKey, action.apiKey)
  yield put(settings.setApiKey())  
};

const watchSettingSet = function* () {
  yield throttle(500, ACTION_SETTINGS_SET, setSettings)
};

export default watchSettingSet
