"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _selectors = require("../../flux/selectors");
var _DraggablePopup = _interopRequireDefault(require("../containers/DraggablePopup"));
var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));
var _Color = require("../styles/Color");
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
    {
      cod
    } = forecast || {},
    _isNotFoundMsg = cod && '' + cod !== OK_CODE;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DraggablePopup.default, {
    style: style,
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