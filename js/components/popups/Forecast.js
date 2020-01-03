"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _selectors = require("../../flux/selectors");

var _FlyPopup = _interopRequireDefault(require("../containers/FlyPopup"));

var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));

var _Forecast = _interopRequireDefault(require("./Forecast.Style"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

//import React, { Component } from 'react';
//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
var S = {
  CAPTION: {
    marginRight: '40px'
  }
};
var NOT_FOUND_MSG = 'Forecast for place not found';
var OK_CODE = '200';
var INIT_STATE = {
  forecast: {
    cod: 200,
    list: []
  }
};

var Forecast =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Forecast, _Component);

  function Forecast() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = INIT_STATE;

    _this._onStore = function () {
      var store = _this.props.store,
          state = store.getState(),
          recent = _selectors.sForecast.recent(state);

      if (recent && _this.recent !== recent) {
        _this.setState({
          forecast: _selectors.sForecast.byId(state, recent)
        });
      }
    };

    _this._renderMsg = function () {
      return _react["default"].createElement("div", null, _react["default"].createElement("span", null, NOT_FOUND_MSG));
    };

    return _this;
  }

  var _proto = Forecast.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubscribe = store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        rootStyle = _this$props.rootStyle,
        store = _this$props.store,
        theme = _this$props.theme,
        forecast = this.state.forecast,
        cod = forecast.cod,
        _style = theme.createStyle(_Forecast["default"]);

    return _react["default"].createElement(_FlyPopup["default"], {
      rootStyle: (0, _extends2["default"])({}, rootStyle, {}, _style.ROOT_DIV),
      store: store,
      storeKey: "isPopupForecast",
      isShow: true
    }, _react["default"].createElement(_PeriodForecast["default"], {
      forecast: forecast,
      captionStyle: S.CAPTION
    }), '' + cod !== OK_CODE && this._renderMsg());
  };

  return Forecast;
}(Component);

var _default = (0, _withTheme["default"])(Forecast);

exports["default"] = _default;
//# sourceMappingURL=Forecast.js.map