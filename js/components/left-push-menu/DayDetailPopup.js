"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _theme = require("../styles/theme");

var forwardRef = _react["default"].forwardRef,
    useState = _react["default"].useState,
    useImperativeHandle = _react["default"].useImperativeHandle;
var CL = {
  DATE: 'marker__caption__date',
  DESCR: 'marker__description',
  LABEL: 'marker__label',
  V_RAIN: 'marker__v-rain',
  V_WATER: 'marker__v-water',
  V_PRESSURE: 'marker__v-pressure',
  V_DAY: 'marker__v-day',
  V_NIGHT: 'marker__v-night'
};
var STYLE = {
  ROOT_DIV: {
    position: 'absolute',
    top: 190,
    left: 200,
    padding: '8px 8px',
    lineHeight: 1.5,
    borderRadius: 4,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 1,
    transition: 'left 0.5s ease-in 0s'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  BT_CLOSE: {
    position: 'absolute',
    top: 7,
    right: 4
  },
  DAY: {
    borderBottom: '2px solid #8bc34a'
  }
};

var TitleValue = function TitleValue(_ref) {
  var title = _ref.title,
      valueCn = _ref.valueCn,
      value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    className: CL.LABEL
  }, title, "\xA0"), /*#__PURE__*/_react["default"].createElement("span", {
    className: valueCn
  }, value, "\xA0"));
};

var DayDetailPopup = forwardRef(function (_ref2, ref) {
  var onClose = _ref2.onClose;

  var _useState = useState({}),
      state = _useState[0],
      setState = _useState[1],
      isOpen = state.isOpen,
      item = state.item;

  useImperativeHandle(ref, function () {
    return {
      setItem: function setItem(item) {
        return setState(function () {
          return {
            item: item,
            isOpen: true
          };
        });
      },
      close: function close() {
        return setState(function (prevState) {
          prevState.isOpen = false;
          return (0, _extends2["default"])({}, prevState);
        });
      }
    };
  });

  var _ref3 = item || {},
      timestamp = _ref3.dt,
      _ref3$rain = _ref3.rain,
      rain = _ref3$rain === void 0 ? 0 : _ref3$rain,
      _ref3$snow = _ref3.snow,
      snow = _ref3$snow === void 0 ? 0 : _ref3$snow,
      _ref3$clouds = _ref3.clouds,
      clouds = _ref3$clouds === void 0 ? 0 : _ref3$clouds,
      _ref3$humidity = _ref3.humidity,
      humidity = _ref3$humidity === void 0 ? '' : _ref3$humidity,
      _ref3$pressure = _ref3.pressure,
      pressure = _ref3$pressure === void 0 ? '' : _ref3$pressure,
      _ref3$temp = _ref3.temp,
      temp = _ref3$temp === void 0 ? {} : _ref3$temp,
      _ref3$weather = _ref3.weather,
      weather = _ref3$weather === void 0 ? [] : _ref3$weather,
      _temp$morn = temp.morn,
      morn = _temp$morn === void 0 ? '' : _temp$morn,
      _temp$day = temp.day,
      day = _temp$day === void 0 ? '' : _temp$day,
      _temp$max = temp.max,
      max = _temp$max === void 0 ? '' : _temp$max,
      _temp$eve = temp.eve,
      eve = _temp$eve === void 0 ? '' : _temp$eve,
      _temp$night = temp.night,
      night = _temp$night === void 0 ? '' : _temp$night,
      _temp$min = temp.min,
      min = _temp$min === void 0 ? '' : _temp$min,
      _dateTitle = _dt["default"].toDayOfWeek(timestamp) + " " + _dt["default"].toTime(timestamp),
      description = weather[0] && weather[0].description || 'Without description',
      _pressureTitle = snow > 0.2 ? 'Press.:' : 'Pressure:',
      _style = isOpen ? STYLE.BLOCK : STYLE.NONE;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, _theme.POPUP.CHART, STYLE.ROOT_DIV, _style)
  }, /*#__PURE__*/_react["default"].createElement(_SvgClose["default"], {
    style: STYLE.BT_CLOSE,
    onClose: onClose
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: CL.DATE
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: STYLE.DAY
  }, _dateTitle)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
    className: CL.DESCR
  }, description)), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Rain:",
    valueCn: CL.V_RAIN,
    value: rain + "mm"
  }), snow > 0.02 && /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Snow:",
    valueCn: CL.V_WATER,
    value: snow + "mm"
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: _pressureTitle,
    valueCn: CL.V_PRESSURE,
    value: pressure + "hPa"
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Clouds:",
    valueCn: CL.V_WATER,
    value: clouds + "%"
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Humidity:",
    valueCn: CL.V_WATER,
    value: humidity + "%"
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Morn:",
    valueCn: CL.V_DAY,
    value: morn
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Day:",
    valueCn: CL.V_DAY,
    value: day
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Max:",
    valueCn: CL.V_DAY,
    value: max
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Eve:",
    valueCn: CL.V_NIGHT,
    value: eve
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Night:",
    valueCn: CL.V_NIGHT,
    value: night
  }), /*#__PURE__*/_react["default"].createElement(TitleValue, {
    title: "Min:",
    valueCn: CL.V_NIGHT,
    value: min
  })));
});
var _default = DayDetailPopup;
exports["default"] = _default;
//# sourceMappingURL=DayDetailPopup.js.map