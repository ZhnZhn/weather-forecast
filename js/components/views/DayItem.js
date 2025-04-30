"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _dt = _interopRequireDefault(require("../../utils/dt"));
var _IconVane = _interopRequireDefault(require("./IconVane"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_DAY_ITEM = 'day-item',
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
const roundProp = function (obj, prop) {
  if (obj === void 0) {
    obj = {};
  }
  return Math.round(obj[prop]);
};
const DayItem = _ref => {
  let {
    style,
    item,
    onClick
  } = _ref;
  const {
      weather,
      deg,
      speed,
      temp,
      dt: timestamp
    } = item || {},
    _speed = (0, _isTypeFn.isNumber)(speed) ? speed.toFixed(2) : '',
    day = _dt.default.toShortDayOfWeek(timestamp),
    pressure = roundProp(item, 'pressure'),
    icon = weather[0].icon,
    _srcIcon = icon.length === 3 ? `./img/${icon}.png` : void 0,
    tempDay = roundProp(temp, 'day'),
    tempNight = roundProp(temp, 'night'),
    _focusableAttr = (0, _isTypeFn.isFn)(onClick) ? {
      tabIndex: "-1",
      className: CL_DAY_ITEM,
      onClick: () => onClick(item)
    } : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ..._focusableAttr,
    style: {
      ...S_ROOT_DIV,
      ...style
    },
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
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconVane.default, {
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
  });
};
var _default = exports.default = DayItem;
//# sourceMappingURL=DayItem.js.map