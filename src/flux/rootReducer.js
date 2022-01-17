import { combineReducers } from 'redux';

import air from './air/reducer';
import fetching from './fetching/reducer';
import layout from './layout/reducer';
import modal from './modal/reducer';
import settings from './settings/reducer';
import place from './place/reducer';
import forecast from './forecast/reducer';
import hourly from './hourly/reducer';
import uv from './uv/reducer';

const reducer = combineReducers({
  fetching, layout, modal, settings,
  place, forecast, hourly, uv, air
});

export default reducer
