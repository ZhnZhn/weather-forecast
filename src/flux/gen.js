import { effects } from 'redux-saga';
import { sSettings } from './selectors';

const { select } = effects;

export const isApiKey = function* (){
  const is = yield select(sSettings.isApiKey)
  if (!is) {
    throw new Error('Not Set ApiKey');
  }
  return true;
};
