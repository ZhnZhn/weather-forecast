"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _Chart = _interopRequireDefault(require("../charts/Chart"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _selectors = require("../../flux/selectors");

var _LegendHourly = _interopRequireDefault(require("./LegendHourly"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var CartesianGrid = _Chart["default"].CartesianGrid,
    Line = _Chart["default"].Line,
    YAxis = _Chart["default"].YAxis,
    XAxis = _Chart["default"].XAxis,
    ResponsiveContainer = _Chart["default"].ResponsiveContainer,
    Legend = _Chart["default"].Legend,
    LineChart = _Chart["default"].LineChart;
var _data = [{
  day: 'Page A',
  temp: 40
}, {
  day: 'Page B',
  temp: 30
}, {
  day: 'Page C',
  temp: 20
}, {
  day: 'Page D',
  temp: 27
}, {
  day: 'Page E',
  temp: 18
}, {
  day: 'Page F',
  temp: 23
}, {
  day: 'Page G',
  temp: 34
}];

var fnAdapter = function fnAdapter(obj) {
  return obj.list.map(function (item) {
    var timestamp = item.dt,
        _item$dt_txt = item.dt_txt,
        dt_txt = _item$dt_txt === void 0 ? '' : _item$dt_txt,
        _item$main = item.main,
        main = _item$main === void 0 ? {} : _item$main,
        _item$wind = item.wind,
        wind = _item$wind === void 0 ? {} : _item$wind,
        _item$rain = item.rain,
        rain = _item$rain === void 0 ? {} : _item$rain,
        temp = main.temp,
        pressure = main.pressure,
        humidity = main.humidity,
        _wind$speed = wind.speed,
        speed = _wind$speed === void 0 ? null : _wind$speed,
        _rain = rain['3h'] || null;

    return {
      //day : dt.toShortDayOfWeek(timestamp),
      day: _dt["default"].toDayHour(timestamp),
      dt_text: dt_txt,
      temp: temp,
      pressure: pressure,
      humidity: humidity,
      speed: speed,
      rain: _rain
    };
  });
};

var HourlyChart =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(HourlyChart, _Component);

  function HourlyChart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      data: _data,
      filtered: {
        temp: false,
        pressure: true,
        rain: true,
        speed: true
      }
    };

    _this._onStore = function () {
      var state = _this.props.store.getState();

      var recent = _selectors.sHourly.recent(state);

      if (recent !== _this.recent) {
        _this.recent = recent;
        var data = fnAdapter(_selectors.sHourly.byId(state, recent));

        _this.setState({
          data: data
        });
      }
    };

    _this.handleFilter = function (dataKey) {
      _this.setState(function (prev) {
        var filtered = prev.filtered;
        filtered[dataKey] = !filtered[dataKey];
        return {
          filtered: filtered
        };
      });
    };

    return _this;
  }

  var _proto = HourlyChart.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubsribe = this.props.store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubsribe();
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$state = this.state,
        data = _this$state.data,
        filtered = _this$state.filtered;
    return _react["default"].createElement(ResponsiveContainer, {
      width: "100%",
      height: 300
    }, _react["default"].createElement(LineChart, (0, _extends2["default"])({
      data: data
    }, _Chart2["default"].HourlyChart), _react["default"].createElement(XAxis, (0, _extends2["default"])({
      dataKey: "day"
    }, _Chart2["default"].XAxis)), _react["default"].createElement(YAxis, {
      yAxisId: 1,
      orientation: "right",
      width: 45,
      label: "\xB0C",
      dataKey: "temp",
      hide: filtered.temp
    }), _react["default"].createElement(YAxis, (0, _extends2["default"])({
      yAxisId: 2,
      orientation: "right",
      width: 80,
      dataKey: "pressure",
      type: "number",
      domain: ['dataMin', 'dataMax'],
      label: "hPa",
      hide: filtered.pressure
    }, _Chart2["default"].YAxisPressure)), _react["default"].createElement(YAxis, (0, _extends2["default"])({
      yAxisId: 3,
      orientation: "right",
      width: 54,
      label: "mm",
      dataKey: "rain",
      hide: filtered.rain
    }, _Chart2["default"].YAxisRain)), _react["default"].createElement(YAxis, (0, _extends2["default"])({
      yAxisId: 4,
      orientation: "right",
      width: 45,
      label: "m/s",
      dataKey: "speed",
      hide: filtered.speed
    }, _Chart2["default"].YAxisSpeed)), _react["default"].createElement(CartesianGrid, _Chart2["default"].CartesianGrid), _react["default"].createElement(Legend, {
      content: _react["default"].createElement(_LegendHourly["default"], {
        filtered: filtered,
        onFilter: this.handleFilter
      })
    }), _react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineTempNight, {
      connectNulls: true,
      yAxisId: 1,
      dataKey: filtered.temp ? "empty" : "temp"
    })), _react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LinePressure, {
      connectNulls: true,
      strokeDasharray: "5 5",
      yAxisId: 2,
      dataKey: filtered.pressure ? "empty" : "pressure"
    })), _react["default"].createElement(Line, (0, _extends2["default"])({}, _Chart2["default"].LineRain, {
      connectNulls: true,
      strokeDasharray: "5 5" //strokeDasharray="100 5"
      ,
      yAxisId: 3,
      dataKey: filtered.rain ? "empty" : "rain"
    })), _react["default"].createElement(Line, (0, _extends2["default"])({
      connectNulls: true
    }, _Chart2["default"].LineSpeed, {
      strokeDasharray: "5 5" //strokeDasharray={false}
      ,
      yAxisId: 4,
      dataKey: filtered.speed ? "empty" : "speed"
    }))));
  };

  return HourlyChart;
}(Component);

var _default = HourlyChart;
exports["default"] = _default;
//# sourceMappingURL=HourlyChart.js.map