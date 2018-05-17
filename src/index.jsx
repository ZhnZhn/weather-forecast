import _React from 'react';
import _ReactDOM from 'react-dom';


import configStore from './flux/configStore'
import WeatherSaga from './components/WeatherSaga';
import { forecastRequested } from './flux/forecast/actions';

const React = _React || window.React
const ReactDOM = _ReactDOM || window.ReactDOM
const { render } = ReactDOM;

const store = configStore();

window.weather = {
  fnFetchForecast : (id) => {
    if (typeof id === 'number' && id !== 0) {
       store.dispatch(forecastRequested(id))
    }
  }
}

render(
  <WeatherSaga store={store} />,
  document.getElementById('app')
)
