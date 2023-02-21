import _ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './flux/store';
import WeatherSaga from './components/WeatherSaga';

const {
  createRoot
} = _ReactDOM || window.ReactDOM;

const NON_STANDARD_DEPREACTED_EVENT_GETTER = 'path';
if (!Event.prototype.hasOwnProperty(NON_STANDARD_DEPREACTED_EVENT_GETTER)) {
  Object.defineProperty(Event.prototype, NON_STANDARD_DEPREACTED_EVENT_GETTER, {
    get() { return this.composedPath(); }
  });
}

createRoot(document.getElementById('app'))
 .render((
   <Provider store={store}>
     <WeatherSaga/>
   </Provider>
))
