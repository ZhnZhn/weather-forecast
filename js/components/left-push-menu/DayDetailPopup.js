"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _theme = require("../styles/theme");

var _jsxRuntime = require("react/jsx-runtime");

var CL_DATE = 'marker__caption__date',
    CL_DESCR = 'marker__description',
    CL_LABEL = 'marker__label',
    CL_V_RAIN = 'marker__v-rain',
    CL_V_WATER = 'marker__v-water',
    CL_V_PRESSURE = 'marker__v-pressure',
    CL_V_DAY = 'marker__v-day',
    CL_V_NIGHT = 'marker__v-night',
    S_ROOT_DIV = {
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
    S_BLOCK = {
  display: 'block'
},
    S_NONE = {
  display: 'none'
},
    S_BT_CLOSE = {
  position: 'absolute',
  top: 7,
  right: 4
},
    S_DAY = {
  borderBottom: '2px solid #8bc34a'
};

var TitleValue = function TitleValue(_ref) {
  var title = _ref.title,
      valueCn = _ref.valueCn,
      value = _ref.value;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: CL_LABEL,
      children: [title, "\xA0"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: valueCn,
      children: [value, "\xA0"]
    })]
  });
};

var DayDetailPopup = (0, _uiApi.forwardRef)(function (_ref2, ref) {
  var onClose = _ref2.onClose;

  var _useState = (0, _uiApi.useState)({}),
      state = _useState[0],
      setState = _useState[1],
      isOpen = state.isOpen,
      item = state.item;

  (0, _uiApi.useImperativeHandle)(ref, function () {
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
      rain = _ref3.rain,
      snow = _ref3.snow,
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
      _isRain = !!rain,
      _isSnow = snow > 0.02,
      _pressureTitle = _isRain && _isSnow ? 'Press.:' : 'Pressure:',
      _style = isOpen ? S_BLOCK : S_NONE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, _theme.POPUP.CHART, S_ROOT_DIV, _style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose["default"], {
      style: S_BT_CLOSE,
      onClose: onClose
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: CL_DATE,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_DAY,
        children: _dateTitle
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_DESCR,
        children: description
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [_isRain && /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Rain:",
        valueCn: CL_V_RAIN,
        value: rain + "mm"
      }), _isSnow && /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Snow:",
        valueCn: CL_V_WATER,
        value: snow + "mm"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: _pressureTitle,
        valueCn: CL_V_PRESSURE,
        value: pressure + "hPa"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Clouds:",
        valueCn: CL_V_WATER,
        value: clouds + "%"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Humidity:",
        valueCn: CL_V_WATER,
        value: humidity + "%"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Morn:",
        valueCn: CL_V_DAY,
        value: morn
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Day:",
        valueCn: CL_V_DAY,
        value: day
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Max:",
        valueCn: CL_V_DAY,
        value: max
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Eve:",
        valueCn: CL_V_NIGHT,
        value: eve
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Night:",
        valueCn: CL_V_NIGHT,
        value: night
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Min:",
        valueCn: CL_V_NIGHT,
        value: min
      })]
    })]
  });
});
var _default = DayDetailPopup;
exports["default"] = _default;
//# sourceMappingURL=DayDetailPopup.js.map