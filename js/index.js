"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _client = _interopRequireDefault(require("react-dom/client"));
var _reactRedux = require("react-redux");
var _store = _interopRequireDefault(require("./flux/store"));
var _WeatherSaga = _interopRequireDefault(require("./components/WeatherSaga"));
var _jsxRuntime = require("react/jsx-runtime");
var _ref = _client["default"] || window.ReactDOM,
  createRoot = _ref.createRoot;
createRoot(document.getElementById('app')).render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRedux.Provider, {
  store: _store["default"],
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WeatherSaga["default"], {})
}));
//# sourceMappingURL=index.js.map