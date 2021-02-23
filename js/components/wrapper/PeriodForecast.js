"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));

var _selectors = require("../../flux/selectors");

var useEffect = _react["default"].useEffect;
var S = {
  DAY: {
    cursor: 'pointer'
  }
};

var PeriodForecastWrapper = function PeriodForecastWrapper(_ref) {
  var onClickItem = _ref.onClickItem,
      onUpdate = _ref.onUpdate;
  var forecast = (0, _reactRedux.useSelector)(_selectors.sForecast.forecast);
  useEffect(function () {
    if (forecast) {
      onUpdate();
    }
  }, [forecast]);
  return /*#__PURE__*/_react["default"].createElement(_PeriodForecast["default"], {
    dayStyle: S.DAY,
    forecast: forecast,
    onClickItem: onClickItem
  });
};

var _default = PeriodForecastWrapper;
exports["default"] = _default;
//# sourceMappingURL=PeriodForecast.js.map