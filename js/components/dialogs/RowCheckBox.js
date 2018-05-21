'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _SvgCheckBox = require('../zhn-atoms/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';
//import PropTypes from "prop-types";


var Component = _react2.default.Component;


var STYLE = {
  ROOT: {
    paddingTop: '6px',
    paddingLeft: '16px'
  },
  CAPTION: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED: {
    color: 'black'
  }
};

var RowCheckBox = function (_Component) {
  _inherits(RowCheckBox, _Component);

  /*
  static propTypes = {
    rootStyle : PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */

  function RowCheckBox(props) {
    _classCallCheck(this, RowCheckBox);

    var _this = _possibleConstructorReturn(this, (RowCheckBox.__proto__ || Object.getPrototypeOf(RowCheckBox)).call(this));

    _this._handleCheck = function () {
      var onCheck = _this.props.onCheck;

      if (typeof onCheck == 'function') {
        onCheck();
      }
      _this.setState({ isChecked: true });
    };

    _this._handleUnCheck = function () {
      var onUnCheck = _this.props.onUnCheck;

      if (typeof onUnCheck == 'function') {
        onUnCheck();
      }
      _this.setState({ isChecked: false });
    };

    _this._handleToggle = function () {
      var isChecked = _this.state.isChecked;

      if (isChecked) {
        _this._handleUnCheck();
      } else {
        _this._handleCheck();
      }
    };

    _this.state = {
      isChecked: !!props.initValue
    };
    return _this;
  }

  _createClass(RowCheckBox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          rootStyle = _props.rootStyle,
          caption = _props.caption,
          captionStyle = _props.captionStyle,
          isChecked = this.state.isChecked,
          _style = isChecked ? STYLE.CHECKED : null;

      return _react2.default.createElement(
        'div',
        { style: _extends({}, STYLE.ROOT, rootStyle) },
        _react2.default.createElement(_SvgCheckBox2.default, {
          value: isChecked,
          onCheck: this._handleCheck,
          onUnCheck: this._handleUnCheck
        }),
        caption && _react2.default.createElement(
          'span',
          {
            style: _extends({}, STYLE.CAPTION, captionStyle, _style),
            onClick: this._handleToggle
          },
          caption
        )
      );
    }
  }]);

  return RowCheckBox;
}(Component);

exports.default = RowCheckBox;
//# sourceMappingURL=RowCheckBox.js.map