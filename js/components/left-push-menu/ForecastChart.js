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

var _TooltipTemperature = _interopRequireDefault(require("./TooltipTemperature"));

var _LegendTemperature = _interopRequireDefault(require("./LegendTemperature"));

var _Chart2 = _interopRequireDefault(require("./Chart.Style"));

var _Label = _interopRequireDefault(require("./Label.Style"));

//import React , { Component } from 'react';
//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
var CartesianGrid = _Chart["default"].CartesianGrid,
    Bar = _Chart["default"].Bar,
    Line = _Chart["default"].Line,
    YAxis = _Chart["default"].YAxis,
    XAxis = _Chart["default"].XAxis,
    ResponsiveContainer = _Chart["default"].ResponsiveContainer,
    Tooltip = _Chart["default"].Tooltip,
    Legend = _Chart["default"].Legend,
    ComposedChart = _Chart["default"].ComposedChart;
var _data = [{
  day: 'Page A',
  tempDay: 40,
  tempNight: 30
}, {
  day: 'Page B',
  tempDay: 30,
  tempNight: 30
}, {
  day: 'Page C',
  tempDay: 20,
  tempNight: 30
}, {
  day: 'Page D',
  tempDay: 27,
  tempNight: 30
}, {
  day: 'Page E',
  tempDay: 18,
  tempNight: 30
}, {
  day: 'Page F',
  tempDay: 23,
  tempNight: 30
}, {
  day: 'Page G',
  tempDay: 34,
  tempNight: 30
}];

var _fnAdapter = function _fnAdapter(arr) {
  if (arr === void 0) {
    arr = [];
  }

  var data = arr.map(function (item, index) {
    var timestamp = item.dt,
        _item$rain = item.rain,
        rain = _item$rain === void 0 ? 0 : _item$rain,
        speed = item.speed,
        _item$temp = item.temp,
        temp = _item$temp === void 0 ? {} : _item$temp,
        _temp$day = temp.day,
        day = _temp$day === void 0 ? null : _temp$day,
        _temp$night = temp.night,
        night = _temp$night === void 0 ? null : _temp$night,
        _temp$morn = temp.morn,
        morn = _temp$morn === void 0 ? null : _temp$morn,
        _temp$eve = temp.eve,
        eve = _temp$eve === void 0 ? null : _temp$eve,
        _temp$max = temp.max,
        max = _temp$max === void 0 ? null : _temp$max,
        _temp$min = temp.min,
        min = _temp$min === void 0 ? null : _temp$min;
    return {
      day: _dt["default"].toShortDayOfWeek(timestamp),
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

var fnFilter = function fnFilter(data, filters) {
  if (data === void 0) {
    data = [];
  }

  if (filters === void 0) {
    filters = {};
  }

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

var ForecastChart =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ForecastChart, _Component);

  function ForecastChart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
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
    };

    _this._onStore = function () {
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
    };

    _this.handleFilter = function (dataKey) {
      var filters = _this.state.filters;

      var _filters = Object.assign({}, filters);

      if (!filters[dataKey]) {
        _filters[dataKey] = true;
      } else {
        _filters[dataKey] = false;
      }

      _this.setState({
        filters: _filters
      });
    };

    return _this;
  }

  var _proto = ForecastChart.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubsribe = store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubsribe();
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$state = this.state,
        data = _this$state.data,
        filters = _this$state.filters,
        _data = fnFilter(data, filters);

    return _react["default"].createElement(ResponsiveContainer, {
      width: "100%",
      height: 300
    }, _react["default"].createElement(ComposedChart, (0, _extends2["default"])({
      data: _data
    }, _Chart2["default"].ComposedChart), _react["default"].createElement(XAxis, (0, _extends2["default"])({
      dataKey: "day"
    }, _Chart2["default"].XAxis)), _react["default"].createElement(YAxis, {
      label: {
        value: "°C" //offset: -18,
        //position: 'insideTop'
        //angle: -90,
        //position: 'insideLeft'
        //offset: 10,
        //position: "insideTopRight",
        //position: "insideStart"

      }
    }), _react["default"].createElement(YAxis, (0, _extends2["default"])({
      yAxisId: 1,
      dataKey: "rain",
      orientation: "right",
      label: "mm"
    }, _Chart2["default"].YAxisRain)), _react["default"].createElement(YAxis, (0, _extends2["default"])({
      hide: !filters.speed,
      yAxisId: 2,
      dataKey: "speed",
      orientation: "right",
      label: "m/s"
    }, _Chart2["default"].YAxisSpeed)), _react["default"].createElement(CartesianGrid, _Chart2["default"].CartesianGrid), _react["default"].createElement(Tooltip, {
      offset: 24,
      content: _react["default"].createElement(_TooltipTemperature["default"], {
        data: data
      })
    }), _react["default"].createElement(Legend, {
      content: _react["default"].createElement(_LegendTemperature["default"], {
        styles: _Label["default"].fnLegendLabel(filters),
        onFilter: this.handleFilter
      })
    }), _react["default"].createElement(Bar, {
      dataKey: "rain",
      yAxisId: 1,
      barSize: 20,
      fill: "#0922a5"
    }), _react["default"].createElement(Line, (0, _extends2["default"])({
      dataKey: "speed",
      yAxisId: 2
    }, _Chart2["default"].LineSpeed)), _react["default"].createElement(Line, (0, _extends2["default"])({
      dataKey: "tempMin"
    }, _Chart2["default"].LineTempMin)), _react["default"].createElement(Line, (0, _extends2["default"])({
      dataKey: "tempMax"
    }, _Chart2["default"].LineTempMax)), _react["default"].createElement(Line, (0, _extends2["default"])({
      dataKey: "tempEve"
    }, _Chart2["default"].LineTempEve)), _react["default"].createElement(Line, (0, _extends2["default"])({
      dataKey: "tempMorn"
    }, _Chart2["default"].LineTempMorn)), _react["default"].createElement(Line, (0, _extends2["default"])({
      dataKey: "tempNight"
    }, _Chart2["default"].LineTempNight)), _react["default"].createElement(Line, (0, _extends2["default"])({
      dataKey: "tempDay"
    }, _Chart2["default"].LineTempDay))));
  };

  return ForecastChart;
}(Component);

var _default = ForecastChart;
exports["default"] = _default;
//# sourceMappingURL=ForecastChart.js.map