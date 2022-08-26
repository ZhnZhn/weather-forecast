"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _selectors = require("../../flux/selectors");

var _DragablePopup = _interopRequireDefault(require("../containers/DragablePopup"));

var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));

var _Forecast = _interopRequireDefault(require("./Forecast.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var S_CAPTION = {
  marginRight: 40
},
    NOT_FOUND_MSG = 'Forecast for place not found',
    OK_CODE = '200';

var NotFoundMsg = function NotFoundMsg() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: NOT_FOUND_MSG
    })
  });
};

var Forecast = function Forecast(_ref) {
  var style = _ref.style;

  var forecast = (0, _uiApi.useSelector)(_selectors.sForecast.forecast),
      _style = (0, _useTheme["default"])(_Forecast["default"]),
      _ref2 = forecast || {},
      cod = _ref2.cod,
      _isNotFoundMsg = cod && '' + cod !== OK_CODE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DragablePopup["default"], {
    style: (0, _extends2["default"])({}, style, _style.ROOT_DIV),
    storeKey: "isPopupForecast",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PeriodForecast["default"], {
      forecast: forecast,
      captionStyle: S_CAPTION
    }), _isNotFoundMsg && /*#__PURE__*/(0, _jsxRuntime.jsx)(NotFoundMsg, {})]
  });
};

var _default = Forecast;
exports["default"] = _default;
//# sourceMappingURL=Forecast.js.map