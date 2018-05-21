'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; //import React, { Component } from 'react';

//import PropTypes from "prop-types";

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


var S = {
  DIV: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  SVG: {
    display: 'inline-block'
  }
};

var EL_CHECKED = _react2.default.createElement('path', {
  d: 'M 2,3 L 8,14 14,3',
  strokeWidth: '2',
  stroke: _Color2.default.YELLOW,
  fill: _Color2.default.BLANK
});

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SvgCheckBox = (_temp = _class = function (_Component) {
  _inherits(SvgCheckBox, _Component);

  /*
  static propTypes = {
    value: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */

  function SvgCheckBox(props) {
    _classCallCheck(this, SvgCheckBox);

    var _this = _possibleConstructorReturn(this, (SvgCheckBox.__proto__ || Object.getPrototypeOf(SvgCheckBox)).call(this));

    _initialiseProps.call(_this);

    var value = props.value,
        onCheck = props.onCheck,
        onUnCheck = props.onUnCheck;

    _this._isOnCheck = _isFn(onCheck);
    _this._isOnUnCheck = _isFn(onUnCheck);

    _this.state = {
      isChecked: !!value
    };
    return _this;
  }

  _createClass(SvgCheckBox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps && typeof nextProps.value !== 'undefined') {
        this.setState({ isChecked: !!nextProps.value });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var rootStyle = this.props.rootStyle,
          isChecked = this.state.isChecked,
          _elChecked = isChecked ? EL_CHECKED : null;

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, S.DIV, rootStyle),
          onClick: this._hClick
        },
        _react2.default.createElement(
          'svg',
          {
            viewBox: '0 0 16 16', width: '100%', height: '100%',
            preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg',
            style: S.SVG
          },
          _react2.default.createElement('rect', {
            x: '1', y: '1',
            height: '14', width: '14',
            strokeWidth: '2', rx: '3',
            stroke: _Color2.default.GREY, fill: _Color2.default.BLANK
          }),
          _elChecked
        )
      );
    }
  }]);

  return SvgCheckBox;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._hClick = function () {
    var _isOnCheck = _this2._isOnCheck,
        _isOnUnCheck = _this2._isOnUnCheck,
        state = _this2.state,
        props = _this2.props,
        onCheck = props.onCheck,
        onUnCheck = props.onUnCheck,
        isChecked = state.isChecked;

    if (!isChecked && _isOnCheck) {
      onCheck(_this2);
    } else if (_isOnUnCheck) {
      onUnCheck(_this2);
    }
    _this2.setState({ isChecked: !isChecked });
  };

  this.setUnchecked = function () {
    _this2.setState({ isChecked: false });
  };
}, _temp);
exports.default = SvgCheckBox;
//# sourceMappingURL=SvgCheckBox.js.map