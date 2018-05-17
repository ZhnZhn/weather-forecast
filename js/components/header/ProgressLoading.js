'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../flux/fetching/constants');

var _ProgressLine = require('../zhn-atoms/ProgressLine');

var _ProgressLine2 = _interopRequireDefault(_ProgressLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Colors = {
  LOADING: '#2F7ED8',
  FAILED: 'rgb(237, 88, 19)'
};

var Component = _react2.default.Component;

var ProgressLoading = function (_Component) {
  _inherits(ProgressLoading, _Component);

  function ProgressLoading(props) {
    _classCallCheck(this, ProgressLoading);

    var _this = _possibleConstructorReturn(this, (ProgressLoading.__proto__ || Object.getPrototypeOf(ProgressLoading)).call(this));

    _this._onStore = function () {
      var store = _this.props.store;

      var fetching = store.getState().fetching;
      if (_this.fetching !== fetching) {
        _this.fetching = fetching;
        switch (fetching) {
          case _constants.FETCH.LOADING:
            _this.setState({ completed: 35, color: Colors.LOADING });
            break;
          case _constants.FETCH.SUCCESS:
            _this.setState({ completed: 100, color: Colors.LOADING });
            break;
          case _constants.FETCH.FAILED:
            _this.setState({ completed: 100, color: Colors.FAILED });
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

  _createClass(ProgressLoading, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          completed = _state.completed,
          color = _state.color;

      return _react2.default.createElement(_ProgressLine2.default, {
        height: 3,
        color: color,
        completed: completed
      });
    }
  }]);

  return ProgressLoading;
}(Component);

exports.default = ProgressLoading;
//# sourceMappingURL=ProgressLoading.js.map