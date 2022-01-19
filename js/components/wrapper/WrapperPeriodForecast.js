"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));

var _selectors = require("../../flux/selectors");

var _jsxRuntime = require("react/jsx-runtime");

var S_DAY = {
  cursor: 'pointer'
};

var WrapperPeriodForecast = function WrapperPeriodForecast(_ref) {
  var onClickItem = _ref.onClickItem,
      onUpdate = _ref.onUpdate;
  var forecast = (0, _reactRedux.useSelector)(_selectors.sForecast.forecast);
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(function () {
    if (forecast) {
      onUpdate();
    }
  }, [forecast]); // onUpdate

  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PeriodForecast["default"], {
    dayStyle: S_DAY,
    forecast: forecast,
    onClickItem: onClickItem
  });
};

var _default = WrapperPeriodForecast;
exports["default"] = _default;
//# sourceMappingURL=WrapperPeriodForecast.js.map