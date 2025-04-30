import store from './store';

import { isNumber } from '../utils/isTypeFn';
import throttleFn from '../utils/throttleFn';

import { forecastRequested } from './forecast/actions';
import { toggleLayout as _toggleLayoutByStoreKey } from './layout/actions';
import { showModal } from './modal/actions';

import { hourlyRequested } from './hourly/actions';
import { uvRequested } from './uv/actions';
import { airForecastReq } from './air/actions';

import { placeRequested } from './place/actions'

const { dispatch } = store;

const MS_PERIOD = 10000
, _forecastRequest = id => dispatch(forecastRequested(id))
, _forecastRequestTh = throttleFn(_forecastRequest, MS_PERIOD)

window.weather = {
  fnFetchForecast : (id) => {
    if (isNumber(id) && id !== 0) {
       _forecastRequestTh(id)
    }
  }
}

//Header
export const toggleLayout = storeKey => {
  dispatch(_toggleLayoutByStoreKey(storeKey))
}
export const showSettings = storeKey => {
  dispatch(_toggleLayoutByStoreKey(storeKey))
  dispatch(showModal('SETTINGS'))
}

//LeftPushMenu
export const requestHourly = () => dispatch(hourlyRequested())
export const requestUvi = () => dispatch(uvRequested())
export const requestAirForecast = () => dispatch(airForecastReq())

//LeafletMap
export const requestPlace = ({
  lat,
  lng
}) => dispatch(placeRequested({ lat, lot:lng }))
