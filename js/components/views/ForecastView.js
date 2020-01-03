"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _Interact = _interopRequireDefault(require("../../utils/Interact"));

var _Caption = _interopRequireDefault(require("./Caption"));

var _DayItem = _interopRequireDefault(require("./DayItem"));

//import React, { Component } from 'react';
var NOT_FOUND_MSG = 'Forecast for place not found';
var OK_CODE = '200';
var Component = _react["default"].Component;

var ForecastView =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ForecastView, _Component);

  function ForecastView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      forecast: {
        cod: 200,
        list: []
      }
    };

    _this._onStore = function () {
      var store = _this.props.store,
          _store$getState = store.getState(),
          _store$getState$forec = _store$getState.forecast,
          forecast = _store$getState$forec === void 0 ? {} : _store$getState$forec,
          recent = forecast.recent;

      if (recent && _this.recent !== recent) {
        _this.setState({
          forecast: forecast[recent]
        });
      }
    };

    _this._renderForecast = function () {
      var forecast = _this.state.forecast,
          _forecast$list = forecast.list,
          list = _forecast$list === void 0 ? [] : _forecast$list;
      return list.map(function (item, index) {
        return _react["default"].createElement(_DayItem["default"], {
          key: index,
          item: item
        });
      });
    };

    _this._renderMsg = function () {
      return _react["default"].createElement("div", null, _react["default"].createElement("span", null, NOT_FOUND_MSG));
    };

    return _this;
  }

  var _proto = ForecastView.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        store = _this$props.store,
        isFixed = _this$props.isFixed;

    if (!isFixed) {
      _Interact["default"].makeDragable(this.domRootDiv);
    }

    this.unsubscribe = store.subscribe(this._onStore);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        rootStyle = _this$props2.rootStyle,
        _styleShow = isShow ? {
      display: 'block'
    } : {
      display: 'none'
    },
        _classShow = isShow ? 'show-popup' : undefined,
        forecast = this.state.forecast,
        cod = forecast.cod;

    return _react["default"].createElement("div", {
      ref: function ref(c) {
        return _this2.domRootDiv = c;
      },
      className: _classShow,
      style: Object.assign({}, rootStyle, _styleShow)
    }, _react["default"].createElement(_Caption["default"], {
      forecast: forecast
    }), _react["default"].createElement("div", null, this._renderForecast()), '' + cod !== OK_CODE && this._renderMsg());
  };

  return ForecastView;
}(Component);

var _default = ForecastView;
exports["default"] = _default;
//# sourceMappingURL=ForecastView.js.map