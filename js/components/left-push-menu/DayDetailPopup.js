"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _dt = _interopRequireDefault(require("../../utils/dt"));
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _BtSvgClose = _interopRequireDefault(require("../zhn-atoms/BtSvgClose"));
var _theme = require("../styles/theme");
var _Color = require("../styles/Color");
var _jsxRuntime = require("react/jsx-runtime");
const CL_DATE = 'marker__caption__date',
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
  S_BT_CLOSE = {
    position: 'absolute',
    top: 7,
    right: 4
  },
  S_DAY = {
    borderBottom: '2px solid #8bc34a'
  };
const TitleValue = _ref => {
  let {
    title,
    valueCn,
    value
  } = _ref;
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
const DayDetailPopup = _ref2 => {
  let {
    refEl,
    onClose
  } = _ref2;
  const [state, setState] = (0, _uiApi.useState)({}),
    {
      isOpen,
      item
    } = state;
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    setItem: item => setState(() => ({
      item,
      isOpen: true
    })),
    close: () => setState(prevState => {
      prevState.isOpen = false;
      return {
        ...prevState
      };
    })
  }));
  const {
      dt: timestamp,
      rain,
      snow,
      clouds = 0,
      humidity = '',
      pressure = '',
      temp = {},
      weather = []
    } = item || {},
    {
      morn = '',
      day = '',
      max = '',
      eve = '',
      night = '',
      min = ''
    } = temp,
    _dateTitle = `${_dt.default.toDayOfWeek(timestamp)} ${_dt.default.toTime(timestamp)}`,
    description = weather[0] && weather[0].description || 'Without description',
    _isRain = !!rain,
    _isSnow = snow > 0.02,
    _pressureTitle = _isRain && _isSnow ? 'Press.:' : 'Pressure:',
    _style = isOpen ? _styleFn.S_BLOCK : _styleFn.S_NONE;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ..._theme.POPUP.CHART,
      ...S_ROOT_DIV,
      ..._style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgClose.default, {
      color: _Color.COLOR_GREEN,
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
        value: `${rain}mm`
      }), _isSnow && /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Snow:",
        valueCn: CL_V_WATER,
        value: `${snow}mm`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: _pressureTitle,
        valueCn: CL_V_PRESSURE,
        value: `${pressure}hPa`
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Clouds:",
        valueCn: CL_V_WATER,
        value: `${clouds}%`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleValue, {
        title: "Humidity:",
        valueCn: CL_V_WATER,
        value: `${humidity}%`
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
};
var _default = exports.default = DayDetailPopup;
//# sourceMappingURL=DayDetailPopup.js.map