"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _selectors = require("../../flux/selectors");
var _DragablePopup = _interopRequireDefault(require("../containers/DragablePopup"));
var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));
var _Color = require("../styles/Color");
var _Forecast = _interopRequireDefault(require("./Forecast.Style"));
var _jsxRuntime = require("react/jsx-runtime");
const S_CAPTION = {
    marginRight: 40
  },
  NOT_FOUND_MSG = 'Forecast for place not found',
  OK_CODE = '200';
const NotFoundMsg = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    children: NOT_FOUND_MSG
  })
});
const Forecast = _ref => {
  let {
    style
  } = _ref;
  const forecast = (0, _uiApi.useSelector)(_selectors.sForecast.forecast),
    _style = (0, _useTheme.default)(_Forecast.default),
    {
      cod
    } = forecast || {},
    _isNotFoundMsg = cod && '' + cod !== OK_CODE;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DragablePopup.default, {
    style: {
      ...style,
      ..._style.ROOT_DIV
    },
    storeKey: "isPopupForecast",
    color: _Color.COLOR_BROWN,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PeriodForecast.default, {
      forecast: forecast,
      captionStyle: S_CAPTION
    }), _isNotFoundMsg && /*#__PURE__*/(0, _jsxRuntime.jsx)(NotFoundMsg, {})]
  });
};
var _default = exports.default = Forecast;
//# sourceMappingURL=Forecast.js.map