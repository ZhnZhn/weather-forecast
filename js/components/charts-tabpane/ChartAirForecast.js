"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));
var _Chart = require("../charts/Chart");
var _selectors = require("../../flux/selectors");
var _dt = _interopRequireDefault(require("../../utils/dt"));
var _useSeriesFilter = _interopRequireDefault(require("./useSeriesFilter"));
var _useSelectorData = _interopRequireDefault(require("./useSelectorData"));
var _ChartType = _interopRequireDefault(require("./ChartType1"));
var _TooltipAirForecast = _interopRequireDefault(require("./TooltipAirForecast"));
var _LegendAirForecast = _interopRequireDefault(require("./LegendAirForecast"));
var _crListSeries = _interopRequireDefault(require("./crListSeries"));
var _Chart2 = require("./Chart.Style");
var _YAxisLabel = require("./YAxisLabel.Style");
var _SeriesColor = require("./SeriesColor");
var _jsxRuntime = require("react/jsx-runtime");
const _crLabelColor = color => ({
    stroke: color,
    fill: color
  }),
  LABEL_M3 = {
    ..._YAxisLabel.YAXIS_LABEL_POSITION,
    value: "μg/m3"
  },
  LABEL_CO = {
    ...LABEL_M3,
    ..._crLabelColor(_SeriesColor.PRESSURE_COLOR)
  },
  LABEL_AQI = {
    ..._YAxisLabel.YAXIS_LABEL_POSITION,
    ..._crLabelColor(_SeriesColor.SPEED_COLOR),
    value: "AQI"
  };
const INITIAL_FILTERED = {
  aqi: false,
  co: false,
  no2: true,
  o3: true,
  pm2_5: true,
  pm10: true,
  no: true,
  nh3: true,
  so2: true
};

/*
co: 283.72
nh3: 0.39
no: 7.38
no2: 17.65
o3: 26.82
pm2_5: 19.57
pm10: 21.37
so2: 2.12
*/

const _transformAirForecast = arr => (arr || []).map(_ref => {
  let {
    dt: timestamp,
    components,
    main
  } = _ref;
  const _dh = _dt.default.toDayHour(timestamp),
    {
      aqi
    } = main || {};
  return {
    ...components,
    day: _dh,
    dt_text: `${_dh}:00`,
    aqi
  };
});
const LINE_CONFIGS = [{
  id: 'aqi',
  yId: 2,
  style: _Chart2.S_LINE_SPEED
}, {
  id: 'no2'
}, {
  id: 'o3'
}, {
  id: 'pm2_5'
}, {
  id: 'pm10'
}, {
  id: 'co',
  yId: 3,
  style: _Chart2.S_LINE_PRESSURE
}, {
  id: 'no'
}, {
  id: 'nh3'
}, {
  id: 'so2'
}];
const ChartAirForecast = () => {
  const [filtered, _hFilter] = (0, _useSeriesFilter.default)(INITIAL_FILTERED),
    data = (0, _useSelectorData.default)(_selectors.sAir.forecast, _transformAirForecast),
    _isHideYAxis1 = filtered.no2 && filtered.o3 && filtered.pm10 && filtered.pm2_5 && filtered.no && filtered.nh3 && filtered.so2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType.default, {
    data: data,
    TooltipComp: _TooltipAirForecast.default,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, {
      yAxisId: 1,
      orientation: "right",
      width: 45,
      label: LABEL_M3,
      hide: _isHideYAxis1
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, {
      yAxisId: 2,
      orientation: "right",
      width: 45,
      label: LABEL_AQI,
      dataKey: "aqi",
      hide: filtered.aqi,
      ..._Chart2.S_YAXIS_SPEED
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.YAxis, {
      yAxisId: 3,
      orientation: "right",
      width: 45,
      label: LABEL_CO,
      dataKey: "co",
      hide: filtered.co,
      ..._Chart2.S_YAXIS_PRESSURE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chart.Legend, {
      content: _LegendAirForecast.default,
      filtered: filtered,
      onFilter: _hFilter
    }), (0, _crListSeries.default)(LINE_CONFIGS, filtered)]
  });
};
var _default = exports.default = (0, _memoEqual.default)(ChartAirForecast);
//# sourceMappingURL=ChartAirForecast.js.map