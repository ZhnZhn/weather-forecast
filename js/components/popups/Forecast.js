'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _selectors = require('../../flux/selectors');

var _FlyPopup = require('../containers/FlyPopup');

var _FlyPopup2 = _interopRequireDefault(_FlyPopup);

var _PeriodForecast = require('../views/PeriodForecast');

var _PeriodForecast2 = _interopRequireDefault(_PeriodForecast);

var _Forecast = require('./Forecast.Style');

var _Forecast2 = _interopRequireDefault(_Forecast);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';

//import PropTypes from 'prop-types';

var Component = _react2.default.Component;


var NOT_FOUND_MSG = 'Forecast for place not found';
var OK_CODE = '200';

var INIT_STATE = {
  forecast: {
    cod: 200,
    list: []
  }
};

var Forecast = function (_Component) {
  _inherits(Forecast, _Component);

  function Forecast() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Forecast);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Forecast.__proto__ || Object.getPrototypeOf(Forecast)).call.apply(_ref, [this].concat(args))), _this), _this.state = INIT_STATE, _this._onStore = function () {
      var store = _this.props.store,
          state = store.getState(),
          recent = _selectors.sForecast.recent(state);

      if (recent && _this.recent !== recent) {
        _this.setState({
          forecast: _selectors.sForecast.byId(state, recent)
        });
      }
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
  /*
  static propTypes = {
    store: PropTypes.object
  }
  */

  _createClass(Forecast, [{
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
      var _props = this.props,
          rootStyle = _props.rootStyle,
          store = _props.store,
          theme = _props.theme,
          forecast = this.state.forecast,
          cod = forecast.cod,
          _style = theme.createStyle(_Forecast2.default);

      return _react2.default.createElement(
        _FlyPopup2.default,
        {
          rootStyle: Object.assign(rootStyle, _style.ROOT_DIV),
          store: store,
          storeKey: 'isPopupForecast',
          isShow: true
        },
        _react2.default.createElement(_PeriodForecast2.default, {
          forecast: forecast,
          captionStyle: { marginRight: '30px' }
        }),
        '' + cod !== OK_CODE && this._renderMsg()
      );
    }
  }]);

  return Forecast;
}(Component);

exports.default = (0, _withTheme2.default)(Forecast);
//# sourceMappingURL=Forecast.js.map