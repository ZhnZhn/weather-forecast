import { select } from 'redux-saga/effects';
import { sSettings } from './selectors';

export const isApiKey = function* (){  
  return yield select(sSettings.isApiKey);  
}

export const isAirQuality = function* (){  
  return yield select(sSettings.isAir);  
}
