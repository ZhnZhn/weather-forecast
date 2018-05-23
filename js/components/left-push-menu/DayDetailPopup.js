'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; //import React, { Component } from 'react';


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _dt = require('../../utils/dt');

var _dt2 = _interopRequireDefault(_dt);

var _SvgClose = require('../zhn-atoms/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _theme = require('../styles/theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


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

var DayDetailPopup = (_temp = _class = function (_Component) {
  _inherits(DayDetailPopup, _Component);

  function DayDetailPopup(props) {
    _classCallCheck(this, DayDetailPopup);

    var _this = _possibleConstructorReturn(this, (DayDetailPopup.__proto__ || Object.getPrototypeOf(DayDetailPopup)).call(this, props));

    _initialiseProps.call(_this);

    var isOpen = props.isOpen,
        style = props.style,
        item = props.item;

    _this.state = {
      isOpen: isOpen, style: style, item: item
    };
    return _this;
  }

  _createClass(DayDetailPopup, [{
    key: 'render',
    value: function render() {
      var onClose = this.props.onClose,
          _state = this.state,
          isOpen = _state.isOpen,
          style = _state.style,
          _state$item = _state.item,
          item = _state$item === undefined ? {} : _state$item,
          timestamp = item.dt,
          _item$rain = item.rain,
          rain = _item$rain === undefined ? 0 : _item$rain,
          _item$snow = item.snow,
          snow = _item$snow === undefined ? 0 : _item$snow,
          _item$clouds = item.clouds,
          clouds = _item$clouds === undefined ? 0 : _item$clouds,
          _item$humidity = item.humidity,
          humidity = _item$humidity === undefined ? '' : _item$humidity,
          _item$pressure = item.pressure,
          pressure = _item$pressure === undefined ? '' : _item$pressure,
          _item$temp = item.temp,
          temp = _item$temp === undefined ? {} : _item$temp,
          _item$weather = item.weather,
          weather = _item$weather === undefined ? [] : _item$weather,
          _temp$morn = temp.morn,
          morn = _temp$morn === undefined ? '' : _temp$morn,
          _temp$day = temp.day,
          day = _temp$day === undefined ? '' : _temp$day,
          _temp$max = temp.max,
          max = _temp$max === undefined ? '' : _temp$max,
          _temp$eve = temp.eve,
          eve = _temp$eve === undefined ? '' : _temp$eve,
          _temp$night = temp.night,
          night = _temp$night === undefined ? '' : _temp$night,
          _temp$min = temp.min,
          min = _temp$min === undefined ? '' : _temp$min,
          _dateTitle = _dt2.default.toDayOfWeek(timestamp) + ' ' + _dt2.default.toTime(timestamp),
          description = weather[0] && weather[0].description ? weather[0].description : 'Without description',
          _style = isOpen ? STYLE.BLOCK : STYLE.NONE;

      return _react2.default.createElement(
        'div',
        { style: _extends({}, _theme.POPUP.CHART, STYLE.ROOT_DIV, style, _style) },
        _react2.default.createElement(_SvgClose2.default, {
          style: STYLE.BT_CLOSE,
          onClose: onClose
        }),
        _react2.default.createElement(
          'div',
          { className: CL.DATE },
          _react2.default.createElement(
            'span',
            { style: STYLE.DAY },
            _dateTitle
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: CL.DESCR },
            description
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Rain:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_WATER },
            rain,
            'mm\xA0'
          ),
          snow > 0.02 && _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              'span',
              { className: CL.LABEL },
              'Snow:\xA0'
            ),
            _react2.default.createElement(
              'span',
              { className: CL.V_WATER },
              snow,
              'mm\xA0'
            )
          ),
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Clouds:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_WATER },
            clouds,
            '%\xA0'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Humidity:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_WATER },
            humidity,
            '%\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Pressure:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_PRESSURE },
            pressure,
            'hPa\xA0'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Morn:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_DAY },
            morn,
            '\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Day:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_DAY },
            day,
            '\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Max:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_DAY },
            max,
            '\xA0'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Eve:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_NIGHT },
            eve,
            '\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Night:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_NIGHT },
            night,
            '\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.LABEL },
            'Min:\xA0'
          ),
          _react2.default.createElement(
            'span',
            { className: CL.V_NIGHT },
            min,
            '\xA0'
          )
        )
      );
    }
  }]);

  return DayDetailPopup;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setItem = function (item) {
    _this2.setState({ item: item, isOpen: true });
  };

  this.close = function () {
    _this2.setState({ isOpen: false });
  };
}, _temp);
exports.default = DayDetailPopup;
//# sourceMappingURL=DayDetailPopup.js.map