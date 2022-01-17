"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _useSeriesFilter2 = _interopRequireDefault(require("./useSeriesFilter"));

var _selectors = require("../../flux/selectors");

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _ChartType = _interopRequireDefault(require("./ChartType1"));

var _TooltipAirForecast = _interopRequireDefault(require("./TooltipAirForecast"));

var _LegendAirForecast = _interopRequireDefault(require("./LegendAirForecast"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _SeriesColor = _interopRequireDefault(require("./SeriesColor"));

var _jsxRuntime = require("react/jsx-runtime");

var Line = _Chart["default"].Line,
    YAxis = _Chart["default"].YAxis,
    Legend = _Chart["default"].Legend;
var _isArr = Array.isArray;
var INITIAL_DATA = [];

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
    LABEL_M3 = (0, _extends2["default"])({}, LABEL_POSITION, {
  value: "μg/m3"
}),
    LABEL_CO = (0, _extends2["default"])({}, LABEL_M3, _crLabelColor(_SeriesColor["default"].PRESSURE)),
    LABEL_AQI = (0, _extends2["default"])({}, LABEL_POSITION, _crLabelColor(_SeriesColor["default"].SPEED), {
  value: "AQI"
});
var INITIAL_FILTERED = {
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

var _crDataKey = function _crDataKey(filtered, propName) {
  return filtered[propName] ? 'empty' : propName;
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


var _transformAirForecast = function _transformAirForecast(arr) {
  return arr.map(function (_ref) {
    var timestamp = _ref.dt,
        components = _ref.components,
        main = _ref.main;

    var _dh = _dt["default"].toDayHour(timestamp),
        _ref2 = main || {},
        aqi = _ref2.aqi;

    return (0, _extends2["default"])({}, components, {
      day: _dh,
      dt_text: _dh + ":00",
      aqi: aqi
    });
  });
};

var AirForecastChart = function AirForecastChart() {
  var _useSeriesFilter = (0, _useSeriesFilter2["default"])(INITIAL_FILTERED),
      filtered = _useSeriesFilter[0],
      _hFilter = _useSeriesFilter[1],
      airForecastArr = (0, _reactRedux.useSelector)(function (state) {
    return _selectors.sAir.forecast(state);
  }),
      data = (0, _uiApi.useMemo)(function () {
    return _isArr(airForecastArr) ? _transformAirForecast(airForecastArr) : INITIAL_DATA;
  }, [airForecastArr]),
      _isHideYAxis1 = filtered.no2 && filtered.o3 && filtered.pm10 && filtered.pm2_5 && filtered.no && filtered.nh3 && filtered.so2;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartType["default"], {
    data: data,
    TooltipComp: _TooltipAirForecast["default"],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, {
      yAxisId: 1,
      orientation: "right",
      width: 45,
      label: LABEL_M3,
      hide: _isHideYAxis1
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({
      yAxisId: 2,
      orientation: "right",
      width: 45,
      label: LABEL_AQI,
      dataKey: "aqi",
      hide: filtered.aqi
    }, _Chart2["default"].YAxisSpeed)), /*#__PURE__*/(0, _jsxRuntime.jsx)(YAxis, (0, _extends2["default"])({
      yAxisId: 3,
      orientation: "right",
      width: 45,
      label: LABEL_CO,
      dataKey: "co",
      hide: filtered.co
    }, _Chart2["default"].YAxisPressure)), /*#__PURE__*/(0, _jsxRuntime.jsx)(Legend, {
      content: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendAirForecast["default"], {
        filtered: filtered,
        onFilter: _hFilter
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 2,
      dataKey: _crDataKey(filtered, 'aqi')
    }, _Chart2["default"].LineSpeed, {
      strokeDasharray: "5 5"
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: _crDataKey(filtered, 'no2')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: _crDataKey(filtered, 'o3')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: _crDataKey(filtered, 'pm2_5')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: _crDataKey(filtered, 'pm10')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LinePressure, {
      strokeDasharray: "5 5",
      connectNulls: true,
      yAxisId: 3,
      dataKey: _crDataKey(filtered, 'co')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: _crDataKey(filtered, 'no')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: _crDataKey(filtered, 'nh3')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: _crDataKey(filtered, 'so2')
    }))]
  });
};

var _default = AirForecastChart;
exports["default"] = _default;
//# sourceMappingURL=AirForecastChart.js.map