"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _SvgCheckBox = _interopRequireDefault(require("../zhn-atoms/SvgCheckBox"));

//import React, { Component } from 'react';
//import PropTypes from "prop-types";
var Component = _react["default"].Component;
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

var RowCheckBox =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(RowCheckBox, _Component);

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
    var _this;

    _this = _Component.call(this) || this;

    _this._handleCheck = function () {
      var onCheck = _this.props.onCheck;

      if (typeof onCheck == 'function') {
        onCheck();
      }

      _this.setState({
        isChecked: true
      });
    };

    _this._handleUnCheck = function () {
      var onUnCheck = _this.props.onUnCheck;

      if (typeof onUnCheck == 'function') {
        onUnCheck();
      }

      _this.setState({
        isChecked: false
      });
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

  var _proto = RowCheckBox.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rootStyle = _this$props.rootStyle,
        caption = _this$props.caption,
        captionStyle = _this$props.captionStyle,
        isChecked = this.state.isChecked,
        _style = isChecked ? STYLE.CHECKED : null;

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, STYLE.ROOT, {}, rootStyle)
    }, _react["default"].createElement(_SvgCheckBox["default"], {
      value: isChecked,
      onCheck: this._handleCheck,
      onUnCheck: this._handleUnCheck
    }), caption && _react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, STYLE.CAPTION, {}, captionStyle, {}, _style),
      onClick: this._handleToggle
    }, caption));
  };

  return RowCheckBox;
}(Component);

var _default = RowCheckBox;
exports["default"] = _default;
//# sourceMappingURL=RowCheckBox.js.map