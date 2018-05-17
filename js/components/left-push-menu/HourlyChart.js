'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _Chart = require('../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _dt = require('../../utils/dt');

var _dt2 = _interopRequireDefault(_dt);

var _selectors = require('../../flux/selectors');

var _LegendHourly = require('./LegendHourly');

var _LegendHourly2 = _interopRequireDefault(_LegendHourly);

var _Chart3 = require('./Chart.Style');

var _Chart4 = _interopRequireDefault(_Chart3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Component = _react2.default.Component;
var CartesianGrid = _Chart2.default.CartesianGrid,
    Line = _Chart2.default.Line,
    YAxis = _Chart2.default.YAxis,
    XAxis = _Chart2.default.XAxis,
    ResponsiveContainer = _Chart2.default.ResponsiveContainer,
    Legend = _Chart2.default.Legend,
    LineChart = _Chart2.default.LineChart;


var _data = [{ day: 'Page A', temp: 40 }, { day: 'Page B', temp: 30 }, { day: 'Page C', temp: 20 }, { day: 'Page D', temp: 27 }, { day: 'Page E', temp: 18 }, { day: 'Page F', temp: 23 }, { day: 'Page G', temp: 34 }];

var fnAdapter = function fnAdapter(obj) {
  return obj.list.map(function (item) {
    var timestamp = item.dt,
        _item$dt_txt = item.dt_txt,
        dt_txt = _item$dt_txt === undefined ? '' : _item$dt_txt,
        _item$main = item.main,
        main = _item$main === undefined ? {} : _item$main,
        _item$wind = item.wind,
        wind = _item$wind === undefined ? {} : _item$wind,
        _item$rain = item.rain,
        rain = _item$rain === undefined ? {} : _item$rain,
        temp = main.temp,
        pressure = main.pressure,
        humidity = main.humidity,
        _wind$speed = wind.speed,
        speed = _wind$speed === undefined ? null : _wind$speed,
        _rain = rain['3h'] || null;

    return {
      //day : dt.toShortDayOfWeek(timestamp),
      day: _dt2.default.toDayHour(timestamp),
      dt_text: dt_txt,
      temp: temp,
      pressure: pressure,
      humidity: humidity,
      speed: speed,
      rain: _rain
    };
  });
};

var HourlyChart = function (_Component) {
  _inherits(HourlyChart, _Component);

  function HourlyChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HourlyChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HourlyChart.__proto__ || Object.getPrototypeOf(HourlyChart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: _data,
      filtered: {
        temp: false,
        pressure: true,
        rain: true,
        speed: true
      }
    }, _this._onStore = function () {
      var state = _this.props.store.getState();
      var recent = _selectors.sHourly.recent(state);
      if (recent !== _this.recent) {
        _this.recent = recent;
        var data = fnAdapter(_selectors.sHourly.byId(state, recent));
        _this.setState({ data: data });
      }
    }, _this.handleFilter = function (dataKey) {
      _this.setState(function (prev) {
        var filtered = prev.filtered;

        filtered[dataKey] = !filtered[dataKey];
        return { filtered: filtered };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HourlyChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubsribe = this.props.store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubsribe();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (this.props !== nextProps) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          data = _state.data,
          filtered = _state.filtered;

      return _react2.default.createElement(
        ResponsiveContainer,
        { width: '100%', height: 300 },
        _react2.default.createElement(
          LineChart,
          _extends({ data: data }, _Chart4.default.HourlyChart),
          _react2.default.createElement(XAxis, _extends({ dataKey: 'day' }, _Chart4.default.XAxis)),
          _react2.default.createElement(YAxis, {
            yAxisId: 1,
            orientation: 'right',
            width: 45,
            label: '\xB0C',
            dataKey: 'temp',
            hide: filtered.temp
          }),
          _react2.default.createElement(YAxis, _extends({
            yAxisId: 2,
            orientation: 'right',
            width: 80,
            dataKey: 'pressure',
            type: 'number',
            domain: ['dataMin', 'dataMax'],
            label: 'hPa',
            hide: filtered.pressure
          }, _Chart4.default.YAxisPressure)),
          _react2.default.createElement(YAxis, _extends({
            yAxisId: 3,
            orientation: 'right',
            width: 54,
            label: 'mm',
            dataKey: 'rain',
            hide: filtered.rain
          }, _Chart4.default.YAxisRain)),
          _react2.default.createElement(YAxis, _extends({
            yAxisId: 4,
            orientation: 'right',
            width: 45,
            label: 'm/s',
            dataKey: 'speed',
            hide: filtered.speed
          }, _Chart4.default.YAxisSpeed)),
          _react2.default.createElement(CartesianGrid, _Chart4.default.CartesianGrid),
          _react2.default.createElement(Legend, {
            content: _react2.default.createElement(_LegendHourly2.default, {
              filtered: filtered,
              onFilter: this.handleFilter
            })
          }),
          _react2.default.createElement(Line, _extends({}, _Chart4.default.LineTempNight, {
            connectNulls: true,
            yAxisId: 1,
            dataKey: filtered.temp ? "empty" : "temp"
          })),
          _react2.default.createElement(Line, _extends({}, _Chart4.default.LinePressure, {
            connectNulls: true,
            strokeDasharray: '5 5',
            yAxisId: 2,
            dataKey: filtered.pressure ? "empty" : "pressure"
          })),
          _react2.default.createElement(Line, _extends({}, _Chart4.default.LineRain, {
            connectNulls: true,
            strokeDasharray: '5 5'
            //strokeDasharray="100 5"
            , yAxisId: 3,
            dataKey: filtered.rain ? "empty" : "rain"
          })),
          _react2.default.createElement(Line, _extends({
            connectNulls: true
          }, _Chart4.default.LineSpeed, {
            strokeDasharray: '5 5'
            //strokeDasharray={false}
            , yAxisId: 4,
            dataKey: filtered.speed ? "empty" : "speed"
          }))
        )
      );
    }
  }]);

  return HourlyChart;
}(Component);

exports.default = HourlyChart;
//# sourceMappingURL=HourlyChart.js.map