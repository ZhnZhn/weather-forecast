"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _constants = require("../../flux/fetching/constants");

var _ProgressLine = _interopRequireDefault(require("../zhn-atoms/ProgressLine"));

//import React, { Component } from 'react';
var Colors = {
  LOADING: '#2F7ED8',
  FAILED: 'rgb(237, 88, 19)'
};
var Component = _react["default"].Component;

var ProgressLoading =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ProgressLoading, _Component);

  function ProgressLoading(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function () {
      var store = _this.props.store;
      var fetching = store.getState().fetching;

      if (_this.fetching !== fetching) {
        _this.fetching = fetching;

        switch (fetching) {
          case _constants.FETCH.LOADING:
            _this.setState({
              completed: 35,
              color: Colors.LOADING
            });

            break;

          case _constants.FETCH.SUCCESS:
            _this.setState({
              completed: 100,
              color: Colors.LOADING
            });

            break;

          case _constants.FETCH.FAILED:
            _this.setState({
              completed: 100,
              color: Colors.FAILED
            });

            break;

          default:
            break;
        }
      }
    };

    _this.fetching = props.store.getState().fetching;
    _this.state = {
      completed: 0,
      color: Colors.LOADING
    };
    return _this;
  }

  var _proto = ProgressLoading.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$state = this.state,
        completed = _this$state.completed,
        color = _this$state.color;
    return _react["default"].createElement(_ProgressLine["default"], {
      height: 3,
      color: color,
      completed: completed
    });
  };

  return ProgressLoading;
}(Component);

var _default = ProgressLoading;
exports["default"] = _default;
//# sourceMappingURL=ProgressLoading.js.map