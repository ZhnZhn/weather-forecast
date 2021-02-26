"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _selectors = require("../../flux/selectors");

var _TooltipForecast = _interopRequireDefault(require("./TooltipForecast"));

var _LegendForecast = _interopRequireDefault(require("./LegendForecast"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));

//import PropTypes from 'prop-types';
var useState = _react["default"].useState,
    useCallback = _react["default"].useCallback,
    useMemo = _react["default"].useMemo,
    memo = _react["default"].memo;
var CartesianGrid = _Chart["default"].CartesianGrid,
    Bar = _Chart["default"].Bar,
    Line = _Chart["default"].Line,
    YAxis = _Chart["default"].YAxis,
    XAxis = _Chart["default"].XAxis,
    ResponsiveContainer = _Chart["default"].ResponsiveContainer,
    Tooltip = _Chart["default"].Tooltip,
    Legend = _Chart["default"].Legend,
    ComposedChart = _Chart["default"].ComposedChart;
var INITIAL_FILTERS = {
  tempDay: true,
  tempNight: false,
  tempMorn: false,
  tempEve: false,
  tempMax: false,
  tempMin: false,
  rain: false,
  speed: false,
  pressure: false,
  humidity: false
};
var INITIAL_DATA = [{
  day: '01 SU',
  tempDay: 35
}, {
  day: '02 MO',
  tempDay: 30
}, {
  day: '03 TU',
  tempDay: 20
}, {
  day: '04 WE',
  tempDay: 27
}, {
  day: '05 TH',
  tempDay: 18
}, {
  day: '06 FR',
  tempDay: 23
}, {
  day: '07 SA',
  tempDay: 34
}];

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

var _filterData = function _filterData(data, filters) {
  if (data === void 0) {
    data = [];
  }

  if (filters === void 0) {
    filters = {};
  }

  var keys = Object.keys(filters);
  return data.map(function (item) {
    var _item = (0, _extends2["default"])({}, item);

    keys.forEach(function (dataKey) {
      if (!filters[dataKey]) {
        _item[dataKey] = null;
      }
    });
    return _item;
  });
};

var areEqual = function areEqual() {
  return true;
};

var ForecastChart = function ForecastChart() {
  var _useState = useState(INITIAL_FILTERS),
      filters = _useState[0],
      setFilters = _useState[1],
      _hFilter = useCallback(function (dataKey) {
    setFilters(function (prevFilters) {
      prevFilters[dataKey] = !prevFilters[dataKey];
      return (0, _extends2["default"])({}, prevFilters);
    });
  }, []),
      forecastArr = (0, _reactRedux.useSelector)(function (state) {
    var recent = _selectors.sForecast.recent(state);

    return recent ? _selectors.sForecast.listById(state, recent) : void 0;
  }),
      data = useMemo(function () {
    return forecastArr ? _transformForecast(forecastArr) : INITIAL_DATA;
  }, [forecastArr]),
      _data = useMemo(function () {
    return _filterData(data, filters);
  }, [data, filters]);

  return /*#__PURE__*/_react["default"].createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/_react["default"].createElement(ComposedChart, (0, _extends2["default"])({}, _Chart2["default"].ComposedChart, {
    data: _data
  }), /*#__PURE__*/_react["default"].createElement(XAxis, (0, _extends2["default"])({
    dataKey: "day"
  }, _Chart2["default"].XAxis)), /*#__PURE__*/_react["default"].createElement(YAxis, {
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
  }), /*#__PURE__*/_react["default"].createElement(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisRain, {
    yAxisId: 2,
    hide: !filters.rain,
    dataKey: "rain",
    orientation: "right",
    label: "mm"
  })), /*#__PURE__*/_react["default"].createElement(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisSpeed, {
    hide: !filters.speed,
    yAxisId: 3,
    dataKey: "speed",
    orientation: "right",
    label: "m/s"
  })), /*#__PURE__*/_react["default"].createElement(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisPressure, {
    hide: !filters.pressure,
    yAxisId: 4,
    dataKey: "pressure",
    width: 80,
    orientation: "right",
    label: "hPa",
    type: "number",
    domain: ['dataMin', 'dataMax']
  })), /*#__PURE__*/_react["default"].createElement(YAxis, (0, _extends2["default"])({}, _Chart2["default"].YAxisSpeed, {
    hide: !filters.humidity,
    yAxisId: 5,
    dataKey: "humidity",
    orientation: "right",
    label: "%"
  })), /*#__PURE__*/_react["default"].createElement(CartesianGrid, _Chart2["default"].CartesianGrid), /*#__PURE__*/_react["default"].createElement(Tooltip, {
    offset: 24,
    content: /*#__PURE__*/_react["default"].createElement(_TooltipForecast["default"], {
      data: data
    })
  }), /*#__PURE__*/_react["default"].createElement(Legend, {
    content: /*#__PURE__*/_react["default"].createElement(_LegendForecast["default"], {
      filters: filters,
      onFilter: _hFilter
    })
  }), /*#__PURE__*/_react["default"].createElement(Bar, {
    yAxisId: 2,
    dataKey: "rain",
    barSize: 20,
    fill: _SeriesColor["default"].RAIN
  }), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineSpeed, {
    yAxisId: 3,
    dataKey: "speed"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LinePressure, {
    yAxisId: 4,
    dataKey: "pressure"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineHumidity, {
    yAxisId: 5,
    dataKey: "humidity"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempMin, {
    yAxisId: 1,
    dataKey: "tempMin"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempMax, {
    yAxisId: 1,
    dataKey: "tempMax"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempEve, {
    yAxisId: 1,
    dataKey: "tempEve"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempMorn, {
    yAxisId: 1,
    dataKey: "tempMorn"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
    yAxisId: 1,
    dataKey: "tempNight"
  })), /*#__PURE__*/_react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempDay, {
    yAxisId: 1,
    dataKey: "tempDay"
  }))));
};

var _default = memo(ForecastChart, areEqual);

exports["default"] = _default;
//# sourceMappingURL=ForecastChart.js.map