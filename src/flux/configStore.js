//import 'babel-polyfill';
import 'regenerator-runtime/runtime'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer';
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware(rootSaga);

const configStore = function() {
  const _middlewares = [ sagaMiddleware ];
  let _composeEnhancer = compose;
  /*eslint-disable no-undef*/
  if (process.env.NODE_ENV === 'development'){  
    _composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const logger = store => next => action => {
      let result;
      try {
        console.group('dispatching', action)
        console.log('before', store.getState())
        result = next(action)
        console.log('after', store.getState());
        console.groupEnd();
        return result;
      } catch (err){
        console.log(err);
        return result;
      }
    }
    _middlewares.push(logger)
  }
  /*eslint-enable no-undef*/

  const store = createStore(
    rootReducer,
    _composeEnhancer(
      applyMiddleware(..._middlewares)
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configStore
