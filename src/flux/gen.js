import { effects } from 'redux-saga';
import { sSettings } from './selectors';

const { select } = effects;

export const isApiKey = function* (){
  return yield select(sSettings.isApiKey);
};
