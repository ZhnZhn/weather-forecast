"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _selectors = require("../../flux/selectors");

var _useSeriesFilter2 = _interopRequireDefault(require("./useSeriesFilter"));

var _ChartType = _interopRequireDefault(require("./ChartType1"));

var _crYAxis = require("./crYAxis");

var _LegendHourly = _interopRequireDefault(require("./LegendHourly"));

var _TooltipHourly = _interopRequireDefault(require("./TooltipHourly"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var Line = _Chart["default"].Line,
    Bar = _Chart["default"].Bar,
    Legend = _Chart["default"].Legend;
var _isArr = Array.isArray;
var INITIAL_FILTERED = {
  temp: false,
  pressure: true,
  rain: true,
  speed: true
};
var INITIAL_DATA = [];

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

var _isNumberGreaterZero = function _isNumberGreaterZero(value) {
  return _isNumber(value) && value > 0;
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

var ChartHourly = function ChartHourly() {
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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType["default"], {
    data: data,
    TooltipComp: _TooltipHourly["default"],
    children: [(0, _crYAxis.crYAxisTemp)(1, filtered), (0, _crYAxis.crYAxisPressure)(2, filtered), _isRain && (0, _crYAxis.crYAxisRain)(rainId, filtered), _isSnow && (0, _crYAxis.crYAxisSnow)(snowId, filtered), (0, _crYAxis.crYAxisWindSpeed)(speedId, filtered), /*#__PURE__*/(0, _jsxRuntime.jsx)(Legend, {
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
      yAxisId: 2,
      dataKey: _crDataKey(filtered, 'pressure')
    })), _isRain && /*#__PURE__*/(0, _jsxRuntime.jsx)(Bar, (0, _extends2["default"])({}, _Chart2["default"].BarRain, {
      yAxisId: rainId,
      dataKey: _crDataKey(filtered, 'rain')
    })), _isSnow && /*#__PURE__*/(0, _jsxRuntime.jsx)(Bar, (0, _extends2["default"])({}, _Chart2["default"].BarSnow, {
      yAxisId: snowId,
      dataKey: _crDataKey(filtered, 'snow')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineSpeed, {
      connectNulls: true,
      yAxisId: speedId,
      dataKey: _crDataKey(filtered, 'speed')
    }))]
  });
};

var _default = (0, _memoEqual["default"])(ChartHourly);

exports["default"] = _default;
//# sourceMappingURL=ChartHourly.js.map