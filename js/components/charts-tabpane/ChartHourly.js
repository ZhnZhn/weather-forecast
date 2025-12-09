"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));
var _Chart = require("../charts/Chart");
var _dt = _interopRequireDefault(require("../../utils/dt"));
var _selectors = require("../../flux/selectors");
var _useSeriesFilter = _interopRequireDefault(require("./useSeriesFilter"));
var _useSelectorData = _interopRequireDefault(require("./useSelectorData"));
var _useIsNoData = _interopRequireDefault(require("./useIsNoData"));
var _ChartType = _interopRequireDefault(require("./ChartType1"));
var _crYAxis = require("./crYAxis");
var _LegendHourly = _interopRequireDefault(require("./LegendHourly"));
var _TooltipHourly = _interopRequireDefault(require("./TooltipHourly"));
var _crListSeries = _interopRequireDefault(require("./crListSeries"));
var _Chart2 = require("./Chart.Style");
var _jsxRuntime = require("react/jsx-runtime");
const INITIAL_FILTERED = {
    rain: true,
    snow: false,
    speed: true,
    pressure: true,
    temp: false
  },
  _get3h = data => (data || {})['3h'] || null,
  _transformHourly = hourlyArr => hourlyArr.map(_ref => {
    let {
      dt: timestamp,
      main,
      wind,
      rain,
      snow
    } = _ref;
    const {
        temp,
        pressure,
        humidity
      } = main || {},
      {
        speed = null
      } = wind || {},
      _dh = _dt.default.toDayHour(timestamp);
    return {
      day: _dh,
      dt_text: _dh + ":00",
      temp,
      pressure,
      humidity,
      speed,
      rain: _get3h(rain),
      snow: _get3h(snow)
    };
  }),
  RAIN_ID = 1,
  SNOW_ID = 2,
  SPEED_ID = 3,
  PRESSURE_ID = 4,
  TEMP_ID = 5,
  SERIA_CONFIGS = [{
    id: 'rain',
    type: 'bar',
    yId: RAIN_ID,
    style: _Chart2.S_BAR_RAIN
  }, {
    id: 'snow',
    type: 'bar',
    yId: SNOW_ID,
    style: _Chart2.S_BAR_SNOW
  }, {
    id: 'speed',
    yId: SPEED_ID,
    style: _Chart2.S_LINE_SPEED
  }, {
    id: 'pressure',
    yId: PRESSURE_ID,
    style: _Chart2.S_LINE_PRESSURE
  }, {
    id: 'temp',
    yId: TEMP_ID
  }];
const ChartHourly = () => {
  const [filtered, _hFilter] = (0, _useSeriesFilter.default)(INITIAL_FILTERED),
    data = (0, _useSelectorData.default)(_selectors.sHourly.forecast, _transformHourly),
    isNot = (0, _useIsNoData.default)(data);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType.default, {
    data: data,
    TooltipComp: _TooltipHourly.default,
    children: [(0, _crYAxis.crYAxisTemp)(TEMP_ID, filtered), (0, _crYAxis.crYAxisPressure)(PRESSURE_ID, filtered), !isNot.rain && (0, _crYAxis.crYAxisRain)(RAIN_ID, filtered), !isNot.snow && (0, _crYAxis.crYAxisSnow)(SNOW_ID, filtered), (0, _crYAxis.crYAxisWindSpeed)(SPEED_ID, filtered), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.Legend, {
      content: _LegendHourly.default,
      isNot: isNot,
      filtered: filtered,
      onFilter: _hFilter
    }), (0, _crListSeries.default)(SERIA_CONFIGS, filtered, isNot)]
  });
};
var _default = exports.default = (0, _memoEqual.default)(ChartHourly);
//# sourceMappingURL=ChartHourly.js.map