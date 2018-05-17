'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _SvgCircle = require('./SvgCircle');

var _SvgCircle2 = _interopRequireDefault(_SvgCircle);

var _Label = require('./Label.Style');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Component = _react2.default.Component;


var L_S = {
  ROOT: {
    marginTop: '1rem'
    //marginLeft : '1rem'
  },
  ITEM: {
    display: 'inline-block',
    marginRight: '1rem',
    cursor: 'pointer'
  }
};

var _fnLabelStyle = function _fnLabelStyle(is) {
  return is ? L_S.LABEL : Object.assign({}, L_S.LABEL, _Label2.default.FILTERED);
};

var LegendHourly = function (_Component) {
  _inherits(LegendHourly, _Component);

  function LegendHourly() {
    _classCallCheck(this, LegendHourly);

    return _possibleConstructorReturn(this, (LegendHourly.__proto__ || Object.getPrototypeOf(LegendHourly)).apply(this, arguments));
  }

  _createClass(LegendHourly, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          filtered = _props.filtered,
          onFilter = _props.onFilter,
          _tempStyle = _fnLabelStyle(!filtered.temp),
          _pressureStyle = _fnLabelStyle(!filtered.pressure),
          _rainStyle = _fnLabelStyle(!filtered.rain),
          _speedStyle = _fnLabelStyle(!filtered.speed);

      return _react2.default.createElement(
        'div',
        { style: L_S.ROOT },
        _react2.default.createElement(
          'span',
          { style: L_S.ITEM, onClick: onFilter.bind(null, 'temp') },
          _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_TEMP_NIGHT),
          _react2.default.createElement(
            'span',
            { style: _tempStyle },
            'T'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: L_S.ITEM, onClick: onFilter.bind(null, 'pressure') },
          _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_PRESSURE),
          _react2.default.createElement(
            'span',
            { style: _pressureStyle },
            'Pressure'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: L_S.ITEM, onClick: onFilter.bind(null, 'rain') },
          _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_RAIN),
          _react2.default.createElement(
            'span',
            { style: _rainStyle },
            'Rain'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: L_S.ITEM, onClick: onFilter.bind(null, 'speed') },
          _react2.default.createElement(_SvgCircle2.default, _Label2.default.CIRCLE_SPEED),
          _react2.default.createElement(
            'span',
            { style: _speedStyle },
            'Speed'
          )
        )
      );
    }
  }]);

  return LegendHourly;
}(Component);

exports.default = LegendHourly;
//# sourceMappingURL=LegendHourly.js.map