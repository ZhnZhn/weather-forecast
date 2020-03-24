"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _selectors = require("../../flux/selectors");

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var S = {
  TIME: {
    paddingTop: '1rem',
    paddingLeft: '2.5rem',
    color: '#8bc34a',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  VALUE: {
    paddingTop: '1rem',
    paddingLeft: '2.5rem',
    fontSize: '3rem',
    fontWeight: 'bold'
  }
};

var UvCard =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(UvCard, _Component);

  function UvCard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      data: []
    };

    _this._onStore = function () {
      var store = _this.props.store,
          state = store.getState(),
          recent = _selectors.sUV.recent(state);

      if (recent !== _this.state.recent) {
        _this.setState(function (prev) {
          return {
            data: _selectors.sUV.byId(state, recent)
          };
        });
      }
    };

    return _this;
  }

  var _proto = UvCard.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$state$data = this.state.data,
        data = _this$state$data === void 0 ? [] : _this$state$data,
        _ref = data[0] || {},
        _ref$date_iso = _ref.date_iso,
        date_iso = _ref$date_iso === void 0 ? '' : _ref$date_iso,
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? '' : _ref$value,
        _date = date_iso.replace('Z', '').replace('T', ' ');

    return _react["default"].createElement("div", null, _react["default"].createElement("div", {
      style: S.TIME
    }, _date), _react["default"].createElement("div", {
      style: S.VALUE
    }, value));
  };

  return UvCard;
}(Component);

var _default = UvCard;
exports["default"] = _default;
//# sourceMappingURL=UvCard.js.map