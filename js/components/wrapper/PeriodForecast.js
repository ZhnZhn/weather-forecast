'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _PeriodForecast = require('../views/PeriodForecast');

var _PeriodForecast2 = _interopRequireDefault(_PeriodForecast);

var _selectors = require('../../flux/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Component = _react2.default.Component;


var INIT_STATE = {
  forecast: {
    cod: 200,
    list: []
  }
};

var Wrapper = function (_Component) {
  _inherits(Wrapper, _Component);

  function Wrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Wrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call.apply(_ref, [this].concat(args))), _this), _this.state = INIT_STATE, _this._onStore = function () {
      var _this$props = _this.props,
          store = _this$props.store,
          onUpdate = _this$props.onUpdate,
          state = store.getState(),
          recent = _selectors.sForecast.recent(state);
      //, { forecast={} } = store.getState()
      //, { recent } = forecast;


      if (recent && _this.recent !== recent) {
        _this.recent = recent;
        _this.setState({
          // forecast : forecast[recent]
          forecast: _selectors.sForecast.byId(state, recent)
        }, onUpdate);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Wrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var store = this.props.store;

      this.unsubscribe = store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var onClickItem = this.props.onClickItem;
      var forecast = this.state.forecast;

      return _react2.default.createElement(_PeriodForecast2.default, {
        dayStyle: { cursor: 'pointer' },
        forecast: forecast,
        onClickItem: onClickItem
      });
    }
  }]);

  return Wrapper;
}(Component);

exports.default = Wrapper;
//# sourceMappingURL=PeriodForecast.js.map