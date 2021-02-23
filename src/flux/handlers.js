import store from './store'

import throttle from '../utils/throttle'

import { forecastRequested } from './forecast/actions';
import { toggleLayout } from './layout/actions';
import { showModal } from './modal/actions';

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
  toggleLayout: storeKey => {
    dispatch(toggleLayout(storeKey))
  },
  showSettings: storeKey => {
    dispatch(toggleLayout(storeKey))
    dispatch(showModal('SETTINGS'))
  }
};

export default handlers
