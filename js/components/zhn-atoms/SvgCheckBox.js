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
    width: 16,
    height: 16,
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

  function SvgCheckBox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._hClick = function () {
      var _this$props = _this.props,
          value = _this$props.value,
          onCheck = _this$props.onCheck,
          onUnCheck = _this$props.onUnCheck;

      if (!value && _isFn(onCheck)) {
        onCheck((0, _assertThisInitialized2["default"])(_this));
      } else if (_isFn(onUnCheck)) {
        onUnCheck((0, _assertThisInitialized2["default"])(_this));
      }
    };

    return _this;
  }

  var _proto = SvgCheckBox.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        style = _this$props2.style,
        value = _this$props2.value,
        _elChecked = value ? EL_CHECKED : null;

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.DIV, {}, style),
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