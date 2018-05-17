'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _Interact = require('../../utils/Interact');

var _Interact2 = _interopRequireDefault(_Interact);

var _Caption = require('./Caption');

var _Caption2 = _interopRequireDefault(_Caption);

var _DayItem = require('./DayItem');

var _DayItem2 = _interopRequireDefault(_DayItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var NOT_FOUND_MSG = 'Forecast for place not found';
var OK_CODE = '200';

var Component = _react2.default.Component;

var ForecastView = function (_Component) {
  _inherits(ForecastView, _Component);

  function ForecastView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ForecastView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ForecastView.__proto__ || Object.getPrototypeOf(ForecastView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      forecast: {
        cod: 200,
        list: []
      }
    }, _this._onStore = function () {
      var store = _this.props.store,
          _store$getState = store.getState(),
          _store$getState$forec = _store$getState.forecast,
          forecast = _store$getState$forec === undefined ? {} : _store$getState$forec,
          recent = forecast.recent;

      if (recent && _this.recent !== recent) {
        _this.setState({
          forecast: forecast[recent]
        });
      }
    }, _this._renderForecast = function () {
      var forecast = _this.state.forecast,
          _forecast$list = forecast.list,
          list = _forecast$list === undefined ? [] : _forecast$list;

      return list.map(function (item, index) {
        return _react2.default.createElement(_DayItem2.default, { key: index, item: item });
      });
    }, _this._renderMsg = function () {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          null,
          NOT_FOUND_MSG
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ForecastView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          store = _props.store,
          isFixed = _props.isFixed;

      if (!isFixed) {
        _Interact2.default.makeDragable(this.domRootDiv);
      }
      this.unsubscribe = store.subscribe(this._onStore);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          isShow = _props2.isShow,
          rootStyle = _props2.rootStyle,
          _styleShow = isShow ? { display: 'block' } : { display: 'none' },
          _classShow = isShow ? 'show-popup' : undefined,
          forecast = this.state.forecast,
          cod = forecast.cod;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(c) {
            return _this2.domRootDiv = c;
          },
          className: _classShow,
          style: Object.assign({}, rootStyle, _styleShow)
        },
        _react2.default.createElement(_Caption2.default, { forecast: forecast }),
        _react2.default.createElement(
          'div',
          null,
          this._renderForecast()
        ),
        '' + cod !== OK_CODE && this._renderMsg()
      );
    }
  }]);

  return ForecastView;
}(Component);

exports.default = ForecastView;
//# sourceMappingURL=ForecastView.js.map