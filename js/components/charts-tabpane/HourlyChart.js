"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _useSeriesFilter2 = _interopRequireDefault(require("./useSeriesFilter"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _selectors = require("../../flux/selectors");

var _LegendHourly = _interopRequireDefault(require("./LegendHourly"));

var _TooltipHourly = _interopRequireDefault(require("./TooltipHourly"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));

var _jsxRuntime = require("react/jsx-runtime");

var CartesianGrid = _Chart["default"].CartesianGrid,
    Line = _Chart["default"].Line,
    Bar = _Chart["default"].Bar,
    YAxis = _Chart["default"].YAxis,
    XAxis = _Chart["default"].XAxis,
    ResponsiveContainer = _Chart["default"].ResponsiveContainer,
    Legend = _Chart["default"].Legend,
    ComposedChart = _Chart["default"].ComposedChart,
    Tooltip = _Chart["default"].Tooltip;
var _isArr = Array.isArray;
var INITIAL_FILTERED = {
  temp: false,
  pressure: true,
  rain: true,
  speed: true
};
var INITIAL_DATA = [{
  day: '01 08',
  temp: 35
}, {
  day: '02 20',
  temp: 30
}, {
  day: '03 08',
  temp: 20
}, {
  day: '04 20',
  temp: 27
}, {
  day: '05 08',
  temp: 18
}, {
  day: '06 20',
  temp: 23
}, {
  day: '07 08',
  temp: 34
}];

var _crLabelColor = function _crLabelColor(color) {
  return {
    stroke: color,
    fill: color
  };
};

var LABEL_POSITION = {
  position: "top",
  offset: 10
},
    LABEL_TEMPERATURE = (0, _extends2["default"])({}, LABEL_POSITION, {
  value: "°C"
}),
    LABEL_PRESSURE = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].PRESSURE), {
  value: "hPa"
}),
    LABEL_RAIN = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].RAIN), {
  value: "mm"
}),
    LABEL_SNOW = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].SNOW), {
  value: "mm"
}),
    LABEL_WIND_SPEED = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].SPEED), {
  value: "m/s"
});

var _get3h = function _get3h(data) {
  return (data || {})['3h'] || null;
};

var _transformHourly = function _transformHourly(hourlyArr) {
  return hourlyArr.map(function (_ref) {
    var timestamp = _ref.dt,
        main = _ref.main,
        wind = _ref.wind,
        rain = _ref.rain,
        snow = _ref.snow;

    var _ref2 = main || {},
        temp = _ref2.temp,
        pressure = _ref2.pressure,
        humidity = _ref2.humidity,
        _ref3 = wind || {},
        _ref3$speed = _ref3.speed,
        speed = _ref3$speed === void 0 ? null : _ref3$speed,
        _dh = _dt["default"].toDayHour(timestamp);

    return {
      day: _dh,
      dt_text: _dh + ":00",
      temp: temp,
      pressure: pressure,
      humidity: humidity,
      speed: speed,
      rain: _get3h(rain),
      snow: _get3h(snow)
    };
  });
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _fHasData = function _fHasData(propName, isData) {
  return function (data) {
    for (var i = 0; i < data.length; i++) {
      if (isData(data[i][propName])) {
        return true;
      }
    }

    return false;
  };
};

var _isNumberGreaterZero = function _isNumberGreaterZero(value) {
  return _isNumber(value) && value > 0;
};

var _hasRain = _fHasData('rain', _isNumberGreaterZero);

var _hasSnow = _fHasData('snow', _isNumberGreaterZero);

var _crYAxisIds = function _crYAxisIds(isRain, isSnow) {
  var rain = isRain ? 3 : void 0,
      snow = rain ? isSnow ? 4 : 3 : void 0,
      speed = rain ? snow ? 5 : 4 : 3;
  return [rain, snow, speed];
};

var _crDataKey = function _crDataKey(filtered, propName) {
  return filtered[propName] ? 'empty' : propName;
};

var areEqual = function areEqual() {
  return true;
};

var HourlyChart = (0, _uiApi.memo)(function () {
  var _useSeriesFilter = (0, _useSeriesFilter2["default"])(INITIAL_FILTERED),
      filtered = _useSeriesFilter[0],
      _hFilter = _useSeriesFilter[1],
      hourlyArr = (0, _reactRedux.useSelector)(function (state) {
    return _selectors.sHourly.forecast(state);
  }),
      data = (0, _uiApi.useMemo)(function () {
    return _isArr(hourlyArr) ? _transformHourly(hourlyArr) : INITIAL_DATA;
  }, [hourlyArr]),
      _isRain = (0, _uiApi.useMemo)(function () {
    return _hasRain(data);
  }, [data]),
      _isSnow = (0, _uiApi.useMemo)(function () {
    return _hasSnow(data);
  }, [data]),
      _crYAxisIds2 = _crYAxisIds(_isRain, _isSnow),
      rainId = _crYAxisIds2[0],
      snowId = _crYAxisIds2[1],
      speedId = _crYAxisIds2[2];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ResponsiveContainer, {
    width: "100%",
    height: 300,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(ComposedChart, (0, _extends2["default"])({
      data: data
    }, _Chart2["default"].HourlyChart, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(XAxis, (0, _extends2["default"])({
        dataKey: "day"
      }, _Chart2["default"].XAxis)), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, {
        yAxisId: 1,
        orientation: "right",
        width: 45,
        label: LABEL_TEMPERATURE,
        dataKey: "temp",
        hide: filtered.temp
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({
        yAxisId: 2,
        orientation: "right",
        width: 80,
        dataKey: "pressure",
        type: "number",
        domain: ['dataMin', 'dataMax'],
        label: LABEL_PRESSURE,
        hide: filtered.pressure
      }, _Chart2["default"].YAxisPressure)), _isRain && /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({
        yAxisId: rainId,
        orientation: "right",
        width: 54,
        label: LABEL_RAIN,
        dataKey: "rain",
        hide: filtered.rain
      }, _Chart2["default"].YAxisRain)), _isSnow && /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({
        yAxisId: snowId,
        orientation: "right",
        width: 54,
        label: LABEL_SNOW,
        dataKey: "snow",
        hide: filtered.snow
      }, _Chart2["default"].YAxisSnow)), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({
        yAxisId: speedId,
        orientation: "right",
        width: 45,
        label: LABEL_WIND_SPEED,
        dataKey: "speed",
        hide: filtered.speed
      }, _Chart2["default"].YAxisSpeed)), /*#__PURE__*/(0, _jsxRuntime.jsx)(CartesianGrid, (0, _extends2["default"])({}, _Chart2["default"].CartesianGrid)), /*#__PURE__*/(0, _jsxRuntime.jsx)(Tooltip, {
        offset: 24,
        content: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipHourly["default"], {
          data: data
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Legend, {
        content: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendHourly["default"], {
          isRain: _isRain,
          isSnow: _isSnow,
          filtered: filtered,
          onFilter: _hFilter
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
        connectNulls: true,
        yAxisId: 1,
        dataKey: _crDataKey(filtered, 'temp')
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LinePressure, {
        connectNulls: true,
        strokeDasharray: "5 5",
        yAxisId: 2,
        dataKey: _crDataKey(filtered, 'pressure')
      })), _isRain && /*#__PURE__*/(0, _jsxRuntime.jsx)(Bar, {
        dataKey: _crDataKey(filtered, 'rain'),
        yAxisId: rainId,
        barSize: 20,
        fill: "#0922a5"
      }), _isSnow && /*#__PURE__*/(0, _jsxRuntime.jsx)(Bar, {
        dataKey: _crDataKey(filtered, 'snow'),
        yAxisId: snowId,
        barSize: 20,
        fill: _SeriesColor["default"].SNOW
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({
        connectNulls: true
      }, _Chart2["default"].LineSpeed, {
        strokeDasharray: "5 5" //strokeDasharray={false}
        ,
        yAxisId: speedId,
        dataKey: _crDataKey(filtered, 'speed')
      }))]
    }))
  });
}, areEqual);
var _default = HourlyChart;
exports["default"] = _default;
//# sourceMappingURL=HourlyChart.js.map