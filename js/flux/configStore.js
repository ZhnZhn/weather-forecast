'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('regenerator-runtime/runtime');

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _rootReducer = require('./rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _rootSaga = require('./rootSaga');

var _rootSaga2 = _interopRequireDefault(_rootSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sagaMiddleware = (0, _reduxSaga2.default)(_rootSaga2.default); //import 'babel-polyfill';


var configStore = function configStore() {
  var _middlewares = [sagaMiddleware];
  var _composeEnhancer = _redux.compose;
  /*eslint-disable no-undef*/
  if (process.env.NODE_ENV === 'development') {
    _composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

    var logger = function logger(store) {
      return function (next) {
        return function (action) {
          var result = void 0;
          try {
            console.group('dispatching', action);
            console.log('before', store.getState());
            result = next(action);
            console.log('after', store.getState());
            console.groupEnd();
            return result;
          } catch (err) {
            console.log(err);
            return result;
          }
        };
      };
    };
    _middlewares.push(logger);
  }
  /*eslint-enable no-undef*/

  var store = (0, _redux.createStore)(_rootReducer2.default, _composeEnhancer(_redux.applyMiddleware.apply(undefined, _middlewares)));
  sagaMiddleware.run(_rootSaga2.default);
  return store;
};

exports.default = configStore;
//# sourceMappingURL=configStore.js.map