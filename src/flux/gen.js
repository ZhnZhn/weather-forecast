import { effects } from 'redux-saga';
import { sSettings } from './selectors';
import layout from './layout/actions'
import modal from './modal/actions'

const { select, put } = effects;

export const isApiKey = function* (){
  const is = yield select(sSettings.isApiKey)
  if (!is) {
    yield put(layout.toggleLayout('isSettings'))
    yield put(modal.showModal('SETTINGS'))
    throw new Error('Not Set ApiKey');
  }
  return true;
};
