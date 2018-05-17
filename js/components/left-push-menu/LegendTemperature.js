'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _SvgCircle = require('./SvgCircle');

var _SvgCircle2 = _interopRequireDefault(_SvgCircle);

var _SvgRect = require('./SvgRect');

var _SvgRect2 = _interopRequireDefault(_SvgRect);

var _Label = require('./Label.Style');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Component = _react2.default.Component;


var K = {
  T_DAY: 'tempDay',
  T_NIGHT: 'tempNight',
  T_MORN: 'tempMorn',
  T_EVE: 'tempEve',
  T_MAX: 'tempMax',
  T_MIN: 'tempMin',
  RAIN: 'rain',
  SPEED: 'speed'
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
  }
};

var LegendTemperature = function (_Component) {
  _inherits(LegendTemperature, _Component);

  function LegendTemperature() {
    _classCallCheck(this, LegendTemperature);

    return _possibleConstructorReturn(this, (LegendTemperature.__proto__ || Object.getPrototypeOf(LegendTemperature)).apply(this, arguments));
  }

  _createClass(LegendTemperature, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props !== nextProps && this.props.styles === nextProps.styles) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          onFilter = _props.onFilter;


      return _react2.default.createElement(
        'div',
        { style: L.ROOT_DIV },
        _react2.default.createElement(
          'div',
          { style: L.COL_1 },
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.T_MORN) },
            _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_TEMP_MORN),
            _react2.default.createElement(
              'span',
              { style: styles.tempMorn },
              'T Morn'
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.T_DAY) },
            _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_TEMP_DAY),
            _react2.default.createElement(
              'span',
              { style: styles.tempDay },
              'T Day'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: L.COL_2 },
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.T_EVE) },
            _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_TEMP_EVE),
            _react2.default.createElement(
              'span',
              { style: styles.tempEve },
              'T Eve'
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.T_NIGHT) },
            _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_TEMP_NIGHT),
            _react2.default.createElement(
              'span',
              { style: styles.tempNight },
              'T Night'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: Object.assign({}, L.COL_2, { marginLeft: '1rem' }) },
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.T_MAX) },
            _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_TEMP_MAX),
            _react2.default.createElement(
              'span',
              { style: styles.tempMax },
              'T Max'
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.T_MIN) },
            _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_TEMP_MIN),
            _react2.default.createElement(
              'span',
              { style: styles.tempMin },
              'T Min'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: Object.assign({}, L.COL_2, { marginLeft: '1rem' }) },
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.RAIN) },
            _react2.default.createElement(_SvgRect2.default, _Label2.default.RECT_RAIN),
            _react2.default.createElement(
              'span',
              { style: styles.rain },
              'Rain'
            )
          ),
          _react2.default.createElement(
            'div',
            { onClick: onFilter.bind(null, K.SPEED) },
            _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_SPEED),
            _react2.default.createElement(
              'span',
              { style: styles.speed },
              'Speed'
            )
          )
        )
      );
    }
  }]);

  return LegendTemperature;
}(Component);

exports.default = LegendTemperature;
//# sourceMappingURL=LegendTemperature.js.map