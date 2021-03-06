import store from './store'

import throttle from '../utils/throttle'

import { forecastRequested } from './forecast/actions';
import { toggleLayout } from './layout/actions';
import { showModal } from './modal/actions';

import { hourlyRequested } from './hourly/actions';
import { uvRequested } from './uv/actions';

import { placeRequested } from './place/actions'

const { dispatch } = store;

const MS_PERIOD = 10000
, _forecastRequest = id => dispatch(forecastRequested(id))
, _forecastRequestTh = throttle(_forecastRequest, MS_PERIOD, {trailing: false})

window.weather = {
  fnFetchForecast : (id) => {
    if (typeof id === 'number' && id !== 0) {
       _forecastRequestTh(id)
    }
  }
}

const handlers = {
  //Header
  toggleLayout: storeKey => {
    dispatch(toggleLayout(storeKey))
  },
  showSettings: storeKey => {
    dispatch(toggleLayout(storeKey))
    dispatch(showModal('SETTINGS'))
  },

  //LeftPushMenu
  requestHourly: () => dispatch(hourlyRequested()),
  requestUvi: () => dispatch(uvRequested()),

  //LeafletMap
  requestPlace: ({lat, lng}) => dispatch(placeRequested({ lat, lot:lng }))

};

export default handlers
