'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Component = _react2.default.Component;


var S = {
  LI: {
    display: 'inline-block',
    color: '#9E9E9E',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '6px',
    paddingBottom: '6px',
    fontWeight: 'bold',
    borderBottom: '3px solid #9E9E9E',
    cursor: 'pointer'
  },
  SELECTED: {
    color: '#434348',
    borderBottom: '3px solid #2F7ED8'
  }
};

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          isSelected = _props.isSelected,
          selectedStyle = _props.selectedStyle,
          onClick = _props.onClick;

      var _selectedStyle = isSelected ? _extends({}, S.SELECTED, selectedStyle) : null;
      return _react2.default.createElement(
        'li',
        {
          style: _extends({}, S.LI, _selectedStyle),
          onClick: onClick
        },
        _react2.default.createElement(
          'span',
          null,
          title
        )
      );
    }
  }]);

  return Tab;
}(Component);

exports.default = Tab;
//# sourceMappingURL=Tab.js.map