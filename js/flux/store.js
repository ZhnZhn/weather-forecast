"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _redux = require("redux");
var _reduxSaga = _interopRequireDefault(require("redux-saga"));
var _rootReducer = _interopRequireDefault(require("./rootReducer"));
var _rootSaga = _interopRequireDefault(require("./rootSaga"));
const sagaMiddleware = (0, _reduxSaga.default)(_rootSaga.default);
const _configStore = () => {
  const _middlewares = [sagaMiddleware];
  let _composeEnhancer = _redux.compose;
  /*eslint-disable no-undef*/
  if (process.env.NODE_ENV === 'development') {
    _composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
    const logger = store => next => action => {
      let result;
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
    _middlewares.push(logger);
  }
  /*eslint-enable no-undef*/

  const store = (0, _redux.legacy_createStore)(_rootReducer.default, _composeEnhancer((0, _redux.applyMiddleware)(..._middlewares)));
  sagaMiddleware.run(_rootSaga.default);
  return store;
};
const store = _configStore();
var _default = exports.default = store;
//# sourceMappingURL=store.js.map