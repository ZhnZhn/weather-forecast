"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _IconVane = _interopRequireDefault(require("./IconVane"));

var _jsxRuntime = require("react/jsx-runtime");

var CL_DAY_ITEM = 'day-item',
    S_ROOT_DIV = {
  display: 'inline-block',
  padding: '0 12px',
  borderRadius: 10,
  transition: 'background-color 0.3s'
},
    S_DAY = {
  color: '#8bc34a',
  marginBottom: 4,
  borderBottom: '2px solid #8bc34a',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold'
},
    S_PRESSURE = {
  display: 'block',
  marginBottom: -15,
  color: '#0d2339',
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold'
},
    S_ICON = {
  display: 'block',
  width: 60,
  height: 60,
  margin: '0 auto'
},
    S_CELL_WIND = {
  marginTop: -10
},
    S_WIND_SPEED = {
  color: '#3f51b5',
  fontSize: '20px',
  fontWeight: 'bold'
},
    S_CELL_TEMP = {
  padding: '4px 0',
  textAlign: 'center'
},
    S_TEMP_DAY = {
  color: '#ff9800',
  paddingLeft: 4,
  fontSize: '20px',
  fontWeight: 'bold'
},
    S_TEMP_NIGHT = {
  color: '#434348',
  paddingLeft: 8,
  fontSize: '20px',
  fontWeight: 'bold'
};

var roundProp = function roundProp(obj, prop) {
  if (obj === void 0) {
    obj = {};
  }

  return Math.round(obj[prop]);
},
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
},
    _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var DayItem = function DayItem(_ref) {
  var style = _ref.style,
      item = _ref.item,
      _onClick = _ref.onClick;

  var _ref2 = item || {},
      weather = _ref2.weather,
      deg = _ref2.deg,
      speed = _ref2.speed,
      temp = _ref2.temp,
      timestamp = _ref2.dt,
      _speed = _isNumber(speed) ? speed.toFixed(2) : '',
      day = _dt["default"].toShortDayOfWeek(timestamp),
      pressure = roundProp(item, 'pressure'),
      icon = weather[0].icon,
      _srcIcon = icon.length === 3 ? "./img/" + icon + ".png" : void 0,
      tempDay = roundProp(temp, 'day'),
      tempNight = roundProp(temp, 'night'),
      _focusableAttr = _isFn(_onClick) ? {
    tabIndex: "-1",
    className: CL_DAY_ITEM,
    onClick: function onClick() {
      return _onClick(item);
    }
  } : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2["default"])({}, _focusableAttr, {
    style: (0, _extends2["default"])({}, S_ROOT_DIV, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_DAY,
      children: day
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_PRESSURE,
      children: pressure
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: _srcIcon,
      style: S_ICON
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_CELL_WIND,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconVane["default"], {
        deg: deg
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_WIND_SPEED,
        children: _speed
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_CELL_TEMP,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_TEMP_DAY,
        children: tempDay
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_TEMP_NIGHT,
        children: tempNight
      })]
    })]
  }));
};

var _default = DayItem;
exports["default"] = _default;
//# sourceMappingURL=DayItem.js.map