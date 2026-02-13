import { all } from 'redux-saga/effects'

import watchPlaceRequested from './place/saga';
import watchForecastRequested from './forecast/saga';
import watchHourlyRequested from './hourly/saga';
import watchUvRequested from './uv/saga';
import watchAirForecastRequested from './air/saga';

import watchSettingSet from './settings/saga';

const rootSaga = function* () {  
  yield all([
    watchPlaceRequested(),
    watchForecastRequested(),
    watchHourlyRequested(),
    watchUvRequested(),
    watchAirForecastRequested(),
    watchSettingSet()
  ]);   
}

export default rootSaga
