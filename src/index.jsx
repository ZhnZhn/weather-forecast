import _ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './flux/store';
import WeatherSaga from './components/WeatherSaga';

const {
  createRoot
} = _ReactDOM || window.ReactDOM;

createRoot(document.getElementById('app'))
 .render((
   <Provider store={store}>
     <WeatherSaga/>
   </Provider>
))
