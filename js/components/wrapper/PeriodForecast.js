"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _PeriodForecast = _interopRequireDefault(require("../views/PeriodForecast"));

var _selectors = require("../../flux/selectors");

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var S = {
  DAY: {
    cursor: 'pointer'
  }
};
var INIT_STATE = {
  forecast: {
    cod: 200,
    list: []
  }
};

var Wrapper =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Wrapper, _Component);

  function Wrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = INIT_STATE;

    _this._onStore = function () {
      var _this$props = _this.props,
          store = _this$props.store,
          onUpdate = _this$props.onUpdate,
          state = store.getState(),
          recent = _selectors.sForecast.recent(state);

      if (recent && _this.recent !== recent) {
        _this.recent = recent;

        _this.setState({
          forecast: _selectors.sForecast.byId(state, recent)
        }, onUpdate);
      }
    };

    return _this;
  }

  var _proto = Wrapper.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubscribe = store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var onClickItem = this.props.onClickItem;
    var forecast = this.state.forecast;
    return _react["default"].createElement(_PeriodForecast["default"], {
      dayStyle: S.DAY,
      forecast: forecast,
      onClickItem: onClickItem
    });
  };

  return Wrapper;
}(Component);

var _default = Wrapper;
exports["default"] = _default;
//# sourceMappingURL=PeriodForecast.js.map