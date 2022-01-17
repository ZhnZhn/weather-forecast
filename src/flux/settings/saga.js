import { throttle, call, put } from 'redux-saga/effects';
import api from '../../api/OpenWeather';
import settings, { ACTION_SETTINGS_SET } from './actions';

const setSettings = function* (action){
  /*eslint-disable redux-saga/no-unhandled-errors*/
  yield call(api.setApiKey, action.apiKey)
  yield put(settings.setApiKey())
  /*eslint-enable redux-saga/no-unhandled-errors*/
};

const watchSettingSet = function* () {
  yield throttle(500, ACTION_SETTINGS_SET, setSettings)
};

export default watchSettingSet
