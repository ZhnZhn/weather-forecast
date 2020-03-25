import { select } from 'redux-saga/effects';
import { sSettings } from './selectors';

export const isApiKey = function* (){
  /*eslint-disable redux-saga/no-unhandled-errors*/
  return yield select(sSettings.isApiKey);
  /*eslint-enable redux-saga/no-unhandled-errors*/
};
