import { effects } from 'redux-saga'

import watchPlaceRequested from './place/saga';
import watchForecastRequested from './forecast/saga';
import watchHourlyRequested from './hourly/saga';
import watchUvRequested from './uv/saga';

import watchSettingSet from './settings/saga';

const { all } = effects;

const rootSaga = function* () {
   yield all([
     watchPlaceRequested(),
     watchForecastRequested(),
     watchHourlyRequested(),
     watchUvRequested(),
     watchSettingSet()     
   ]);
 }

 export default rootSaga
