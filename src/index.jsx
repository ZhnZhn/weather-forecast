import _React from 'react';
import _ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './flux/store'
import WeatherSaga from './components/WeatherSaga';

const React = _React || window.React
const ReactDOM = _ReactDOM || window.ReactDOM
const { render } = ReactDOM;

render(
  <Provider store={store}>
    <WeatherSaga/>
  </Provider>,
  document.getElementById('app')
)
