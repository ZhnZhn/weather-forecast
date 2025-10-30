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
var _crListSeries = _interopRequireDefault(require("./crListSeries"));
var _TooltipForecast = _interopRequireDefault(require("./TooltipForecast"));
var _LegendForecast = _interopRequireDefault(require("./LegendForecast"));
var _Chart2 = require("./Chart.Style");
var _jsxRuntime = require("react/jsx-runtime");
const YAXIS_LABEL_TEMP = {
  value: "°C",
  position: "top",
  offset: 8,
  xTopOffset: 28
};
const INITIAL_FILTERED = {
  tempDay: false,
  tempNight: true,
  tempMorn: true,
  tempEve: true,
  tempMax: true,
  tempMin: true,
  rain: true,
  speed: true,
  pressure: true,
  humidity: true,
  snow: true
};
const _transformForecast = arr => (arr || []).map(_ref => {
  let {
    dt: timestamp,
    rain = 0,
    speed,
    temp,
    pressure,
    humidity,
    snow = 0
  } = _ref;
  const {
    day = null,
    night = null,
    morn = null,
    eve = null,
    max = null,
    min = null
  } = temp || {};
  return {
    day: _dt.default.toShortDayOfWeek(timestamp),
    tempDay: day,
    tempNight: night,
    tempMorn: morn,
    tempEve: eve,
    tempMax: max,
    tempMin: min,
    rain,
    speed,
    pressure,
    humidity,
    snow
  };
});
const T_Y_ID = 1,
  WIND_SPEED_Y_ID = 2,
  PRESSURE_Y_ID = 3,
  HUMIDITY_Y_ID = 4,
  RAIN_Y_ID = 5,
  SNOW_Y_ID = 6,
  SERIA_CONFIGS = [{
    id: 'rain',
    type: 'bar',
    yId: RAIN_Y_ID,
    style: _Chart2.S_BAR_RAIN
  }, {
    id: 'speed',
    yId: WIND_SPEED_Y_ID,
    style: _Chart2.S_LINE_SPEED
  }, {
    id: 'pressure',
    yId: PRESSURE_Y_ID,
    style: _Chart2.S_LINE_PRESSURE
  }, {
    id: 'humidity',
    yId: HUMIDITY_Y_ID,
    style: _Chart2.S_LINE_HUMIDITY
  }, {
    id: 'snow',
    type: 'bar',
    yId: SNOW_Y_ID,
    style: _Chart2.S_BAR_SNOW
  }, {
    id: 'tempMin',
    style: _Chart2.S_LINE_TEMP_MIN
  }, {
    id: 'tempMax',
    style: _Chart2.S_LINE_TEMP_MAX
  }, {
    id: 'tempEve',
    style: _Chart2.S_LINE_TEMP_EVE
  }, {
    id: 'tempMorn',
    style: _Chart2.S_LINE_TEMP_MORNING
  }, {
    id: 'tempNight',
    style: _Chart2.S_LINE_TEMP_NIGHT
  }, {
    id: 'tempDay',
    style: _Chart2.S_LINE_TEMP_DAY
  }];
const _selectRecentById = state => {
  const recent = _selectors.sForecast.recent(state);
  return recent ? _selectors.sForecast.listById(state, recent) : void 0;
};
const ChartForecast = () => {
  const [filtered, _hFilter] = (0, _useSeriesFilter.default)(INITIAL_FILTERED),
    data = (0, _useSelectorData.default)(_selectRecentById, _transformForecast),
    isNot = (0, _useIsNoData.default)(data);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType.default, {
    chartStyle: _Chart2.S_COMPOSED_CHART,
    data: data,
    TooltipComp: _TooltipForecast.default,
    tooltipTrigger: "click",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, {
      yAxisId: T_Y_ID,
      label: YAXIS_LABEL_TEMP
    }), (0, _crYAxis.crYAxisWindSpeed)(WIND_SPEED_Y_ID, filtered), (0, _crYAxis.crYAxisPressure)(PRESSURE_Y_ID, filtered), (0, _crYAxis.crYAxisWindSpeed)(HUMIDITY_Y_ID, filtered, 'humidity', '%'), !isNot.rain && (0, _crYAxis.crYAxisRain)(RAIN_Y_ID, filtered), !isNot.snow && (0, _crYAxis.crYAxisSnow)(SNOW_Y_ID, filtered), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.Legend, {
      content: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendForecast.default, {
        isNot: isNot,
        filtered: filtered,
        onFilter: _hFilter
      })
    }), (0, _crListSeries.default)(SERIA_CONFIGS, filtered, isNot)]
  });
};
var _default = exports.default = (0, _memoEqual.default)(ChartForecast);
//# sourceMappingURL=ChartForecast.js.map