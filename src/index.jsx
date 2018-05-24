import _React from 'react';
import _ReactDOM from 'react-dom';

import configStore from './flux/configStore'
import WeatherSaga from './components/WeatherSaga';
import { forecastRequested } from './flux/forecast/actions';

import throttle from './utils/throttle'

const React = _React || window.React
const ReactDOM = _ReactDOM || window.ReactDOM
const { render } = ReactDOM;

const store = configStore();

const MS_PERIOD = 10000;

const _forecastRequest = id => store.dispatch(forecastRequested(id))
const _forecastRequestTh = throttle(_forecastRequest, MS_PERIOD, { trailing: false })

window.weather = {
  fnFetchForecast : (id) => {
    if (typeof id === 'number' && id !== 0) {
       _forecastRequestTh(id)
    }
  }
}

render(
  <WeatherSaga store={store} />,
  document.getElementById('app')
)
