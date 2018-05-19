'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _PeriodForecast = require('../wrapper/PeriodForecast');

var _PeriodForecast2 = _interopRequireDefault(_PeriodForecast);

var _DayDetailPopup = require('./DayDetailPopup');

var _DayDetailPopup2 = _interopRequireDefault(_DayDetailPopup);

var _TabPane = require('../zhn-atoms/TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _Tab = require('../zhn-atoms/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _ForecastChart = require('./ForecastChart');

var _ForecastChart2 = _interopRequireDefault(_ForecastChart);

var _HourlyChart = require('./HourlyChart');

var _HourlyChart2 = _interopRequireDefault(_HourlyChart);

var _UvCard = require('./UvCard');

var _UvCard2 = _interopRequireDefault(_UvCard);

var _LeftPushMenu = require('./LeftPushMenu.Style');

var _LeftPushMenu2 = _interopRequireDefault(_LeftPushMenu);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _actions = require('../../flux/hourly/actions');

var _actions2 = require('../../flux/uv/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Component = _react2.default.Component;

//const BG_MARK = '#646464';
//const BG_UNMARK = '#808080';

var LeftPushMenu = function (_Component) {
  _inherits(LeftPushMenu, _Component);

  function LeftPushMenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LeftPushMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LeftPushMenu.__proto__ || Object.getPrototypeOf(LeftPushMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._markDay = function (currentTarget) {
      var _style = _this.props.theme.createStyle(_LeftPushMenu2.default);
      _this.detailEl = currentTarget;
      _this.detailEl.style.backgroundColor = _style.C_BG_MARK;
    }, _this._unmarkDay = function () {
      if (_this.detailEl) {
        var _style = _this.props.theme.createStyle(_LeftPushMenu2.default);
        _this.detailEl.style.backgroundColor = _style.C_BG_UNMARK;
      }
    }, _this.handleClickItem = function (item, evn) {
      evn.persist();
      _this._unmarkDay();
      _this._markDay(evn.currentTarget);
      _this.detailComp.setItem(item);
    }, _this.handleRequestHourly = function () {
      var store = _this.props.store;

      store.dispatch((0, _actions.hourlyRequested)());
    }, _this.handleRequestUV = function () {
      var store = _this.props.store;

      store.dispatch((0, _actions2.uvRequested)());
    }, _this.handleCloseDetail = function () {
      _this._unmarkDay();
      _this.detailComp.close();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LeftPushMenu, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          store = _props.store,
          theme = _props.theme,
          STYLE = theme.createStyle(_LeftPushMenu2.default);

      return _react2.default.createElement(
        'div',
        { id: id, style: STYLE.ROOT_DIV },
        _react2.default.createElement(_PeriodForecast2.default, {
          store: store,
          onUpdate: this.handleCloseDetail,
          onClickItem: this.handleClickItem
        }),
        _react2.default.createElement(_DayDetailPopup2.default, {
          ref: function ref(comp) {
            return _this2.detailComp = comp;
          },
          onClose: this.handleCloseDetail
        }),
        _react2.default.createElement(
          _TabPane2.default,
          { key: '1', width: '100%' },
          _react2.default.createElement(
            _Tab2.default,
            { title: '7 Days' },
            _react2.default.createElement(_ForecastChart2.default, { store: store })
          ),
          _react2.default.createElement(
            _Tab2.default,
            {
              title: '5 Days/3 Hours',
              onClick: this.handleRequestHourly
            },
            _react2.default.createElement(_HourlyChart2.default, { store: store })
          ),
          _react2.default.createElement(
            _Tab2.default,
            {
              title: 'UV',
              onClick: this.handleRequestUV
            },
            _react2.default.createElement(_UvCard2.default, { store: store })
          )
        )
      );
    }
  }]);

  return LeftPushMenu;
}(Component);

exports.default = (0, _withTheme2.default)(LeftPushMenu);
//# sourceMappingURL=LeftPushMenu.js.map