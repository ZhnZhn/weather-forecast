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

var _TooltipTemperature = require('./TooltipTemperature');

var _TooltipTemperature2 = _interopRequireDefault(_TooltipTemperature);

var _LegendTemperature = require('./LegendTemperature');

var _LegendTemperature2 = _interopRequireDefault(_LegendTemperature);

var _Chart3 = require('./Chart.Style');

var _Chart4 = _interopRequireDefault(_Chart3);

var _Label = require('./Label.Style');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React , { Component } from 'react';

//import PropTypes from 'prop-types';

var Component = _react2.default.Component;
var CartesianGrid = _Chart2.default.CartesianGrid,
    Bar = _Chart2.default.Bar,
    Line = _Chart2.default.Line,
    YAxis = _Chart2.default.YAxis,
    XAxis = _Chart2.default.XAxis,
    ResponsiveContainer = _Chart2.default.ResponsiveContainer,
    Tooltip = _Chart2.default.Tooltip,
    Legend = _Chart2.default.Legend,
    ComposedChart = _Chart2.default.ComposedChart;


var _data = [{ day: 'Page A', tempDay: 40, tempNight: 30 }, { day: 'Page B', tempDay: 30, tempNight: 30 }, { day: 'Page C', tempDay: 20, tempNight: 30 }, { day: 'Page D', tempDay: 27, tempNight: 30 }, { day: 'Page E', tempDay: 18, tempNight: 30 }, { day: 'Page F', tempDay: 23, tempNight: 30 }, { day: 'Page G', tempDay: 34, tempNight: 30 }];

var _fnAdapter = function _fnAdapter() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var data = arr.map(function (item, index) {
    var timestamp = item.dt,
        _item$rain = item.rain,
        rain = _item$rain === undefined ? 0 : _item$rain,
        speed = item.speed,
        _item$temp = item.temp,
        temp = _item$temp === undefined ? {} : _item$temp,
        _temp$day = temp.day,
        day = _temp$day === undefined ? null : _temp$day,
        _temp$night = temp.night,
        night = _temp$night === undefined ? null : _temp$night,
        _temp$morn = temp.morn,
        morn = _temp$morn === undefined ? null : _temp$morn,
        _temp$eve = temp.eve,
        eve = _temp$eve === undefined ? null : _temp$eve,
        _temp$max = temp.max,
        max = _temp$max === undefined ? null : _temp$max,
        _temp$min = temp.min,
        min = _temp$min === undefined ? null : _temp$min;

    return {
      day: _dt2.default.toShortDayOfWeek(timestamp),
      tempDay: day,
      tempNight: night,
      tempMorn: morn,
      tempEve: eve,
      tempMax: max,
      tempMin: min,
      rain: rain,
      speed: speed
    };
  });
  return data;
};

var fnFilter = function fnFilter() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (filters.length === 0) {
    return data;
  }
  var keys = Object.keys(filters);
  return data.map(function (item) {
    var _item = Object.assign({}, item);
    keys.forEach(function (dataKey) {
      if (!filters[dataKey]) {
        _item[dataKey] = null;
      }
    });
    return _item;
  });
};

var ForecastChart = function (_Component) {
  _inherits(ForecastChart, _Component);

  function ForecastChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ForecastChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ForecastChart.__proto__ || Object.getPrototypeOf(ForecastChart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: _data,
      filters: {
        tempDay: true,
        tempNight: true,
        tempMorn: false,
        tempEve: false,
        tempMax: false,
        tempMin: false,
        rain: true,
        speed: true
      }
    }, _this._onStore = function () {
      var store = _this.props.store,
          state = store.getState(),
          recent = _selectors.sForecast.recent(state);

      if (recent && _this.recent !== recent) {
        _this.recent = recent;
        _this.setState(function (prev) {
          return {
            data: _fnAdapter(_selectors.sForecast.listById(state, recent))
          };
        });
      }
    }, _this.handleFilter = function (dataKey) {
      var filters = _this.state.filters;

      var _filters = Object.assign({}, filters);
      if (!filters[dataKey]) {
        _filters[dataKey] = true;
      } else {
        _filters[dataKey] = false;
      }
      _this.setState({ filters: _filters });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /*
  static propTypes = {
    store : PropTypes.object.isRequired
  }
  */

  _createClass(ForecastChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var store = this.props.store;

      this.unsubsribe = store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubsribe();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
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
          filters = _state.filters,
          _data = fnFilter(data, filters);

      return _react2.default.createElement(
        ResponsiveContainer,
        { width: '100%', height: 300 },
        _react2.default.createElement(
          ComposedChart,
          _extends({ data: _data }, _Chart4.default.ComposedChart),
          _react2.default.createElement(XAxis, _extends({ dataKey: 'day' }, _Chart4.default.XAxis)),
          _react2.default.createElement(YAxis, { label: {
              value: "°C"
              //offset: -18,
              //position: 'insideTop'
              //angle: -90,
              //position: 'insideLeft'
              //offset: 10,
              //position: "insideTopRight",
              //position: "insideStart"
            } }),
          _react2.default.createElement(YAxis, _extends({
            yAxisId: 1, dataKey: 'rain', orientation: 'right', label: 'mm'
          }, _Chart4.default.YAxisRain)),
          _react2.default.createElement(YAxis, _extends({
            hide: !filters.speed,
            yAxisId: 2, dataKey: 'speed', orientation: 'right', label: 'm/s'
          }, _Chart4.default.YAxisSpeed)),
          _react2.default.createElement(CartesianGrid, _Chart4.default.CartesianGrid),
          _react2.default.createElement(Tooltip, {
            offset: 24,
            content: _react2.default.createElement(_TooltipTemperature2.default, { data: data })
          }),
          _react2.default.createElement(Legend, {
            content: _react2.default.createElement(_LegendTemperature2.default, {
              styles: _Label2.default.fnLegendLabel(filters),
              onFilter: this.handleFilter
            })
          }),
          _react2.default.createElement(Bar, {
            dataKey: 'rain',
            yAxisId: 1, barSize: 20, fill: '#0922a5'
          }),
          _react2.default.createElement(Line, _extends({ dataKey: 'speed', yAxisId: 2 }, _Chart4.default.LineSpeed)),
          _react2.default.createElement(Line, _extends({ dataKey: 'tempMin' }, _Chart4.default.LineTempMin)),
          _react2.default.createElement(Line, _extends({ dataKey: 'tempMax' }, _Chart4.default.LineTempMax)),
          _react2.default.createElement(Line, _extends({ dataKey: 'tempEve' }, _Chart4.default.LineTempEve)),
          _react2.default.createElement(Line, _extends({ dataKey: 'tempMorn' }, _Chart4.default.LineTempMorn)),
          _react2.default.createElement(Line, _extends({ dataKey: 'tempNight' }, _Chart4.default.LineTempNight)),
          _react2.default.createElement(Line, _extends({ dataKey: 'tempDay' }, _Chart4.default.LineTempDay))
        )
      );
    }
  }]);

  return ForecastChart;
}(Component);

exports.default = ForecastChart;
//# sourceMappingURL=ForecastChart.js.map