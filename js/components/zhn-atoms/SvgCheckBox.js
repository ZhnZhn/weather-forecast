"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _Color = _interopRequireDefault(require("../styles/Color"));

//import React, { Component } from 'react';
//import PropTypes from "prop-types";
var Component = _react["default"].Component;
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

var EL_CHECKED = _react["default"].createElement("path", {
  d: "M 2,3 L 8,14 14,3",
  strokeWidth: "2",
  stroke: _Color["default"].YELLOW,
  fill: _Color["default"].BLANK
});

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SvgCheckBox =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(SvgCheckBox, _Component);

  /*
  static propTypes = {
    value: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */
  function SvgCheckBox(_props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._hClick = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          _isOnCheck = _assertThisInitialize._isOnCheck,
          _isOnUnCheck = _assertThisInitialize._isOnUnCheck,
          state = _assertThisInitialize.state,
          props = _assertThisInitialize.props,
          onCheck = props.onCheck,
          onUnCheck = props.onUnCheck,
          isChecked = state.isChecked;

      if (!isChecked && _isOnCheck) {
        onCheck((0, _assertThisInitialized2["default"])(_this));
      } else if (_isOnUnCheck) {
        onUnCheck((0, _assertThisInitialized2["default"])(_this));
      }

      _this.setState({
        isChecked: !isChecked
      });
    };

    _this.setUnchecked = function () {
      _this.setState({
        isChecked: false
      });
    };

    var value = _props.value,
        _onCheck = _props.onCheck,
        _onUnCheck = _props.onUnCheck;
    _this._isOnCheck = _isFn(_onCheck);
    _this._isOnUnCheck = _isFn(_onUnCheck);
    _this.state = {
      isChecked: !!value
    };
    return _this;
  }

  var _proto = SvgCheckBox.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && typeof nextProps.value !== 'undefined') {
      this.setState({
        isChecked: !!nextProps.value
      });
    }
  };

  _proto.render = function render() {
    var rootStyle = this.props.rootStyle,
        isChecked = this.state.isChecked,
        _elChecked = isChecked ? EL_CHECKED : null;

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.DIV, {}, rootStyle),
      onClick: this._hClick
    }, _react["default"].createElement("svg", {
      viewBox: "0 0 16 16",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: S.SVG
    }, _react["default"].createElement("rect", {
      x: "1",
      y: "1",
      height: "14",
      width: "14",
      strokeWidth: "2",
      rx: "3",
      stroke: _Color["default"].GREY,
      fill: _Color["default"].BLANK
    }), _elChecked));
  };

  return SvgCheckBox;
}(Component);

var _default = SvgCheckBox;
exports["default"] = _default;
//# sourceMappingURL=SvgCheckBox.js.map