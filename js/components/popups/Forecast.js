"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _selectors = require("../../flux/selectors");

var _FlyPopup = _interopRequireDefault(require("../containers/FlyPopup"));

var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));

var _Forecast = _interopRequireDefault(require("./Forecast.Style"));

//import PropTypes from 'prop-types';
var S = {
  CAPTION: {
    marginRight: 40
  }
};
var NOT_FOUND_MSG = 'Forecast for place not found';
var OK_CODE = '200';

var NotFoundMsg = function NotFoundMsg() {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, NOT_FOUND_MSG));
};

var Forecast = function Forecast(_ref) {
  var style = _ref.style;

  var forecast = (0, _reactRedux.useSelector)(function (state) {
    var recent = _selectors.sForecast.recent(state);

    return _selectors.sForecast.byId(state, recent);
  }),
      _style = (0, _useTheme["default"])(_Forecast["default"]);

  var _ref2 = forecast || {},
      cod = _ref2.cod;

  return /*#__PURE__*/_react["default"].createElement(_FlyPopup["default"], {
    style: (0, _extends2["default"])({}, style, _style.ROOT_DIV),
    storeKey: "isPopupForecast"
  }, /*#__PURE__*/_react["default"].createElement(_PeriodForecast["default"], {
    forecast: forecast,
    captionStyle: S.CAPTION
  }), cod && '' + cod !== OK_CODE && /*#__PURE__*/_react["default"].createElement(NotFoundMsg, null));
};
/*
Forecast.propTypes = {
  style: PropTypes.object
}
*/


var _default = Forecast;
exports["default"] = _default;
//# sourceMappingURL=Forecast.js.map