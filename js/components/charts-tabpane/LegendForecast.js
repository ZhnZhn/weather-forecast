"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("../_react"));

var _SvgCircle = _interopRequireDefault(require("./SvgCircle"));

var _SvgRect = _interopRequireDefault(require("./SvgRect"));

var _LegendCell = _interopRequireDefault(require("./LegendCell"));

var _crForecastLegendStyle = _interopRequireDefault(require("./crForecastLegendStyle"));

var _Label = _interopRequireDefault(require("./Label.Style"));

var memo = _react["default"].memo;
var K = {
  T_DAY: 'tempDay',
  T_NIGHT: 'tempNight',
  T_MORN: 'tempMorn',
  T_EVE: 'tempEve',
  T_MAX: 'tempMax',
  T_MIN: 'tempMin',
  RAIN: 'rain',
  SPEED: 'speed',
  PRESSURE: 'pressure',
  HUMIDITY: 'humidity'
};
var L = {
  ROOT_DIV: {
    marginLeft: '3rem',
    marginTop: '1rem'
  },
  COL_1: {
    display: 'inline-block',
    marginRight: '1rem'
  },
  COL_2: {
    display: 'inline-block'
  },
  COL_3: {
    display: 'inline-block',
    marginLeft: '1rem'
  }
};

var areEqual = function areEqual(prevProps, nextProps) {
  return prevProps.filters === nextProps.filters;
};

var LegendForecast = function LegendForecast(_ref) {
  var filters = _ref.filters,
      onFilter = _ref.onFilter;
  var styles = (0, _crForecastLegendStyle["default"])(filters);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: L.ROOT_DIV
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: L.COL_1
  }, /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.tempMorn,
    title: "T Morn",
    onClick: function onClick() {
      return onFilter(K.T_MORN);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_MORN)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.tempDay,
    title: "T Day",
    onClick: function onClick() {
      return onFilter(K.T_DAY);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_DAY))), /*#__PURE__*/_react["default"].createElement("div", {
    style: L.COL_2
  }, /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.tempEve,
    title: "T Eve",
    onClick: function onClick() {
      return onFilter(K.T_EVE);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_EVE)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.tempNight,
    title: "T Night",
    onClick: function onClick() {
      return onFilter(K.T_NIGHT);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_NIGHT))), /*#__PURE__*/_react["default"].createElement("div", {
    style: L.COL_3
  }, /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.tempMax,
    title: "T Max",
    onClick: function onClick() {
      return onFilter(K.T_MAX);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_MAX)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.tempMin,
    title: "T Min",
    onClick: function onClick() {
      return onFilter(K.T_MIN);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_TEMP_MIN))), /*#__PURE__*/_react["default"].createElement("div", {
    style: L.COL_3
  }, /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.rain,
    title: "Rain",
    onClick: function onClick() {
      return onFilter(K.RAIN);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgRect["default"], _Label["default"].RECT_RAIN)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.speed,
    title: "Wind",
    onClick: function onClick() {
      return onFilter(K.SPEED);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_SPEED))), /*#__PURE__*/_react["default"].createElement("div", {
    style: L.COL_3
  }, /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.pressure,
    title: "Pressure",
    onClick: function onClick() {
      return onFilter(K.PRESSURE);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_PRESSURE)), /*#__PURE__*/_react["default"].createElement(_LegendCell["default"], {
    titleStyle: styles.humidity,
    title: "Humidity",
    onClick: function onClick() {
      return onFilter(K.HUMIDITY);
    }
  }, /*#__PURE__*/_react["default"].createElement(_SvgCircle["default"], _Label["default"].CIRCLE_HUMIDITY))));
};

var _default = memo(LegendForecast, areEqual);

exports["default"] = _default;
//# sourceMappingURL=LegendForecast.js.map