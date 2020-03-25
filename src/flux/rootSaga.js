import { all } from 'redux-saga/effects'

import watchPlaceRequested from './place/saga';
import watchForecastRequested from './forecast/saga';
import watchHourlyRequested from './hourly/saga';
import watchUvRequested from './uv/saga';

import watchSettingSet from './settings/saga';

const rootSaga = function* () {
  /*eslint-disable redux-saga/no-unhandled-errors*/
   yield all([
     watchPlaceRequested(),
     watchForecastRequested(),
     watchHourlyRequested(),
     watchUvRequested(),
     watchSettingSet()
   ]);
   /*eslint-enable redux-saga/no-unhandled-errors*/
 }

 export default rootSaga
