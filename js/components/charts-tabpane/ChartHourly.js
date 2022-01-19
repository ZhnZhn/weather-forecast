"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _selectors = require("../../flux/selectors");

var _useSeriesFilter2 = _interopRequireDefault(require("./useSeriesFilter"));

var _useSelectorData = _interopRequireDefault(require("./useSelectorData"));

var _ChartType = _interopRequireDefault(require("./ChartType1"));

var _crYAxis = require("./crYAxis");

var _LegendHourly = _interopRequireDefault(require("./LegendHourly"));

var _TooltipHourly = _interopRequireDefault(require("./TooltipHourly"));

var _crListSeries = _interopRequireDefault(require("./crListSeries"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _jsxRuntime = require("react/jsx-runtime");

var Legend = _Chart["default"].Legend,
    INITIAL_FILTERED = {
  temp: false,
  pressure: true,
  rain: true,
  speed: true
},
    _get3h = function _get3h(data) {
  return (data || {})['3h'] || null;
},
    _transformHourly = function _transformHourly(hourlyArr) {
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
},
    _isNumber = function _isNumber(n) {
  return typeof n === 'number';
},
    _isNumberGreaterZero = function _isNumberGreaterZero(value) {
  return _isNumber(value) && value > 0;
},
    _fHasData = function _fHasData(propName, isData) {
  return function (data) {
    for (var i = 0; i < data.length; i++) {
      if (isData(data[i][propName])) {
        return true;
      }
    }

    return false;
  };
},
    _hasRain = _fHasData('rain', _isNumberGreaterZero),
    _hasSnow = _fHasData('snow', _isNumberGreaterZero),
    TEMP_ID = 1,
    PRESSURE_ID = 2,
    RAIN_ID = 3,
    SNOW_ID = 4,
    SPEED_ID = 5,
    SERIA_CONFIGS = [{
  id: 'temp',
  yId: TEMP_ID
}, {
  id: 'pressure',
  yId: PRESSURE_ID,
  style: _Chart2["default"].LinePressure
}, {
  id: 'rain',
  type: 'bar',
  yId: RAIN_ID,
  style: _Chart2["default"].BarRain
}, {
  id: 'snow',
  type: 'bar',
  yId: SNOW_ID,
  style: _Chart2["default"].BarSnow
}, {
  id: 'speed',
  yId: SPEED_ID,
  style: _Chart2["default"].LineSpeed
}];

var ChartHourly = function ChartHourly() {
  var _useSeriesFilter = (0, _useSeriesFilter2["default"])(INITIAL_FILTERED),
      filtered = _useSeriesFilter[0],
      _hFilter = _useSeriesFilter[1],
      data = (0, _useSelectorData["default"])(_selectors.sHourly.forecast, _transformHourly),
      _isRain = (0, _uiApi.useMemo)(function () {
    return _hasRain(data);
  }, [data]),
      _isSnow = (0, _uiApi.useMemo)(function () {
    return _hasSnow(data);
  }, [data]),
      isNot = (0, _uiApi.useMemo)(function () {
    return {
      rain: !_isRain,
      snow: !_isSnow
    };
  }, [_isRain, _isSnow]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType["default"], {
    data: data,
    TooltipComp: _TooltipHourly["default"],
    children: [(0, _crYAxis.crYAxisTemp)(TEMP_ID, filtered), (0, _crYAxis.crYAxisPressure)(PRESSURE_ID, filtered), _isRain && (0, _crYAxis.crYAxisRain)(RAIN_ID, filtered), _isSnow && (0, _crYAxis.crYAxisSnow)(SNOW_ID, filtered), (0, _crYAxis.crYAxisWindSpeed)(SPEED_ID, filtered), /*#__PURE__*/(0, _jsxRuntime.jsx)(Legend, {
      content: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendHourly["default"], {
        isNot: isNot,
        filtered: filtered,
        onFilter: _hFilter
      })
    }), (0, _crListSeries["default"])(SERIA_CONFIGS, filtered, isNot)]
  });
};

var _default = (0, _memoEqual["default"])(ChartHourly);

exports["default"] = _default;
//# sourceMappingURL=ChartHourly.js.map