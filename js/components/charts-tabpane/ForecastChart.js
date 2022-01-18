"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _useSeriesFilter2 = _interopRequireDefault(require("./useSeriesFilter"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _ChartType = _interopRequireDefault(require("./ChartType1"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _selectors = require("../../flux/selectors");

var _crListSeries = _interopRequireDefault(require("./crListSeries"));

var _TooltipForecast = _interopRequireDefault(require("./TooltipForecast"));

var _LegendForecast = _interopRequireDefault(require("./LegendForecast"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types';
var YAxis = _Chart["default"].YAxis,
    Legend = _Chart["default"].Legend;
var INITIAL_FILTERED = {
  tempDay: false,
  tempNight: true,
  tempMorn: true,
  tempEve: true,
  tempMax: true,
  tempMin: true,
  rain: true,
  speed: true,
  pressure: true,
  humidity: true
};
var INITIAL_DATA = [];

var _transformForecast = function _transformForecast(arr) {
  if (arr === void 0) {
    arr = [];
  }

  return arr.map(function (_ref) {
    var timestamp = _ref.dt,
        _ref$rain = _ref.rain,
        rain = _ref$rain === void 0 ? 0 : _ref$rain,
        speed = _ref.speed,
        temp = _ref.temp,
        pressure = _ref.pressure,
        humidity = _ref.humidity;

    var _ref2 = temp || {},
        _ref2$day = _ref2.day,
        day = _ref2$day === void 0 ? null : _ref2$day,
        _ref2$night = _ref2.night,
        night = _ref2$night === void 0 ? null : _ref2$night,
        _ref2$morn = _ref2.morn,
        morn = _ref2$morn === void 0 ? null : _ref2$morn,
        _ref2$eve = _ref2.eve,
        eve = _ref2$eve === void 0 ? null : _ref2$eve,
        _ref2$max = _ref2.max,
        max = _ref2$max === void 0 ? null : _ref2$max,
        _ref2$min = _ref2.min,
        min = _ref2$min === void 0 ? null : _ref2$min;

    return {
      day: _dt["default"].toShortDayOfWeek(timestamp),
      tempDay: day,
      tempNight: night,
      tempMorn: morn,
      tempEve: eve,
      tempMax: max,
      tempMin: min,
      rain: rain,
      speed: speed,
      pressure: pressure,
      humidity: humidity
    };
  });
};

var areEqual = function areEqual() {
  return true;
};

var SERIA_CONFIGS = [{
  id: 'rain',
  type: 'bar',
  yId: 2,
  style: _Chart2["default"].BarRain
}, {
  id: 'speed',
  yId: 3,
  style: _Chart2["default"].LineSpeed
}, {
  id: 'pressure',
  yId: 4,
  style: _Chart2["default"].LinePressure
}, {
  id: 'humidity',
  yId: 5,
  style: _Chart2["default"].LineHumidity
}, {
  id: 'tempMin',
  style: _Chart2["default"].LineTempMin
}, {
  id: 'tempMax',
  style: _Chart2["default"].LineTempMax
}, {
  id: 'tempEve',
  style: _Chart2["default"].LineTempEve
}, {
  id: 'tempMorn',
  style: _Chart2["default"].LineTempMorn
}, {
  id: 'tempNight',
  style: _Chart2["default"].LineTempNight
}, {
  id: 'tempDay',
  style: _Chart2["default"].LineTempDay
}];

var ForecastChart = function ForecastChart() {
  var _useSeriesFilter = (0, _useSeriesFilter2["default"])(INITIAL_FILTERED),
      filtered = _useSeriesFilter[0],
      _hFilter = _useSeriesFilter[1],
      forecastArr = (0, _reactRedux.useSelector)(function (state) {
    var recent = _selectors.sForecast.recent(state);

    return recent ? _selectors.sForecast.listById(state, recent) : void 0;
  }),
      data = (0, _uiApi.useMemo)(function () {
    return forecastArr ? _transformForecast(forecastArr) : INITIAL_DATA;
  }, [forecastArr]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType["default"], {
    chartStyle: _Chart2["default"].ComposedChart,
    data: data,
    TooltipComp: _TooltipForecast["default"],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, {
      yAxisId: 1,
      label: {
        value: "°C" //offset: -18,
        //position: 'insideTop'
        //angle: -90,
        //position: 'insideLeft'
        //offset: 10,
        //position: "insideTopRight",
        //position: "insideStart"

      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisRain, {
      yAxisId: 2,
      hide: filtered.rain,
      dataKey: "rain",
      orientation: "right",
      label: "mm"
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisSpeed, {
      yAxisId: 3,
      hide: filtered.speed,
      dataKey: "speed",
      orientation: "right",
      label: "m/s"
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisPressure, {
      yAxisId: 4,
      hide: filtered.pressure,
      dataKey: "pressure",
      width: 80,
      orientation: "right",
      label: "hPa",
      type: "number",
      domain: ['dataMin', 'dataMax']
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisSpeed, {
      yAxisId: 5,
      hide: filtered.humidity,
      dataKey: "humidity",
      orientation: "right",
      label: "%"
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Legend, {
      content: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendForecast["default"], {
        filtered: filtered,
        onFilter: _hFilter
      })
    }), (0, _crListSeries["default"])(SERIA_CONFIGS, filtered)]
  });
};

var _default = (0, _uiApi.memo)(ForecastChart, areEqual);

exports["default"] = _default;
//# sourceMappingURL=ForecastChart.js.map