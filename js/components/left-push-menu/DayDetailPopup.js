"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _dt = _interopRequireDefault(require("../../utils/dt"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _theme = require("../styles/theme");

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var CL = {
  DATE: 'marker__caption__date',
  DESCR: 'marker__description',
  LABEL: 'marker__label',
  V_WATER: 'marker__v-water',
  V_PRESSURE: 'marker__v-pressure',
  V_DAY: 'marker__v-day',
  V_NIGHT: 'marker__v-night'
};
var STYLE = {
  ROOT_DIV: {
    position: 'absolute',
    top: '190px',
    left: '200px',
    padding: '8px 8px',
    lineHeight: 1.5,
    borderRadius: '4px',
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
    top: '7px',
    right: '4px'
  },
  DAY: {
    borderBottom: '2px solid #8bc34a'
  }
};

var DayDetailPopup =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(DayDetailPopup, _Component);

  function DayDetailPopup(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.setItem = function (item) {
      _this.setState({
        item: item,
        isOpen: true
      });
    };

    _this.close = function () {
      _this.setState({
        isOpen: false
      });
    };

    var isOpen = props.isOpen,
        style = props.style,
        _item = props.item;
    _this.state = {
      isOpen: isOpen,
      style: style,
      item: _item
    };
    return _this;
  }

  var _proto = DayDetailPopup.prototype;

  _proto.render = function render() {
    var onClose = this.props.onClose,
        _this$state = this.state,
        isOpen = _this$state.isOpen,
        style = _this$state.style,
        _this$state$item = _this$state.item,
        item = _this$state$item === void 0 ? {} : _this$state$item,
        timestamp = item.dt,
        _item$rain = item.rain,
        rain = _item$rain === void 0 ? 0 : _item$rain,
        _item$snow = item.snow,
        snow = _item$snow === void 0 ? 0 : _item$snow,
        _item$clouds = item.clouds,
        clouds = _item$clouds === void 0 ? 0 : _item$clouds,
        _item$humidity = item.humidity,
        humidity = _item$humidity === void 0 ? '' : _item$humidity,
        _item$pressure = item.pressure,
        pressure = _item$pressure === void 0 ? '' : _item$pressure,
        _item$temp = item.temp,
        temp = _item$temp === void 0 ? {} : _item$temp,
        _item$weather = item.weather,
        weather = _item$weather === void 0 ? [] : _item$weather,
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
        description = weather[0] && weather[0].description ? weather[0].description : 'Without description',
        _style = isOpen ? STYLE.BLOCK : STYLE.NONE;

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, _theme.POPUP.CHART, {}, STYLE.ROOT_DIV, {}, style, {}, _style)
    }, _react["default"].createElement(_SvgClose["default"], {
      style: STYLE.BT_CLOSE,
      onClose: onClose
    }), _react["default"].createElement("div", {
      className: CL.DATE
    }, _react["default"].createElement("span", {
      style: STYLE.DAY
    }, _dateTitle)), _react["default"].createElement("div", null, _react["default"].createElement("span", {
      className: CL.DESCR
    }, description)), _react["default"].createElement("div", null, _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Rain:\xA0"), _react["default"].createElement("span", {
      className: CL.V_WATER
    }, rain, "mm\xA0"), snow > 0.02 && _react["default"].createElement("span", null, _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Snow:\xA0"), _react["default"].createElement("span", {
      className: CL.V_WATER
    }, snow, "mm\xA0")), _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Clouds:\xA0"), _react["default"].createElement("span", {
      className: CL.V_WATER
    }, clouds, "%\xA0")), _react["default"].createElement("div", null, _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Humidity:\xA0"), _react["default"].createElement("span", {
      className: CL.V_WATER
    }, humidity, "%\xA0"), _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Pressure:\xA0"), _react["default"].createElement("span", {
      className: CL.V_PRESSURE
    }, pressure, "hPa\xA0")), _react["default"].createElement("div", null, _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Morn:\xA0"), _react["default"].createElement("span", {
      className: CL.V_DAY
    }, morn, "\xA0"), _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Day:\xA0"), _react["default"].createElement("span", {
      className: CL.V_DAY
    }, day, "\xA0"), _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Max:\xA0"), _react["default"].createElement("span", {
      className: CL.V_DAY
    }, max, "\xA0")), _react["default"].createElement("div", null, _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Eve:\xA0"), _react["default"].createElement("span", {
      className: CL.V_NIGHT
    }, eve, "\xA0"), _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Night:\xA0"), _react["default"].createElement("span", {
      className: CL.V_NIGHT
    }, night, "\xA0"), _react["default"].createElement("span", {
      className: CL.LABEL
    }, "Min:\xA0"), _react["default"].createElement("span", {
      className: CL.V_NIGHT
    }, min, "\xA0")));
  };

  return DayDetailPopup;
}(Component);

var _default = DayDetailPopup;
exports["default"] = _default;
//# sourceMappingURL=DayDetailPopup.js.map