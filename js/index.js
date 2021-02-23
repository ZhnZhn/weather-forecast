"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("./flux/store"));

var _WeatherSaga = _interopRequireDefault(require("./components/WeatherSaga"));

var React = _react["default"] || window.React;
var ReactDOM = _reactDom["default"] || window.ReactDOM;
var render = ReactDOM.render;
render( /*#__PURE__*/React.createElement(_reactRedux.Provider, {
  store: _store["default"]
}, /*#__PURE__*/React.createElement(_WeatherSaga["default"], null)), document.getElementById('app'));
//# sourceMappingURL=index.js.map