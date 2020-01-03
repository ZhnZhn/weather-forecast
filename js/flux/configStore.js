"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _rootReducer = _interopRequireDefault(require("./rootReducer"));

var _rootSaga = _interopRequireDefault(require("./rootSaga"));

//import 'babel-polyfill';
//import 'regenerator-runtime/runtime'
var sagaMiddleware = (0, _reduxSaga["default"])(_rootSaga["default"]);

var configStore = function configStore() {
  var _middlewares = [sagaMiddleware];
  var _composeEnhancer = _redux.compose;
  /*eslint-disable no-undef*/

  if (process.env.NODE_ENV === 'development') {
    _composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

    var logger = function logger(store) {
      return function (next) {
        return function (action) {
          var result;

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


  var store = (0, _redux.createStore)(_rootReducer["default"], _composeEnhancer(_redux.applyMiddleware.apply(void 0, _middlewares)));
  sagaMiddleware.run(_rootSaga["default"]);
  return store;
};

var _default = configStore;
exports["default"] = _default;
//# sourceMappingURL=configStore.js.map